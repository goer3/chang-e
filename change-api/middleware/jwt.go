package middleware

import (
	"change-api/common"
	"change-api/dto/request"
	"change-api/dto/response"
	"change-api/model"
	"change-api/pkg/gedis"
	"change-api/pkg/utils"
	"errors"
	"fmt"
	jwt "github.com/appleboy/gin-jwt/v2"
	"github.com/gin-gonic/gin"
	"github.com/golang-module/carbon/v2"
	"strings"
	"time"
)

// JWT 认证中间件
func JWTAuth() (*jwt.GinJWTMiddleware, error) {
	return jwt.New(&jwt.GinJWTMiddleware{
		Realm:           common.Conf.JWT.Realm,                                // JWT 标识
		Key:             []byte(common.Conf.JWT.Key),                          // 签名 Key
		Timeout:         time.Duration(common.Conf.JWT.Timeout) * time.Second, // Token 有效期
		Authenticator:   authenticator,                                        // 用户登录校验
		PayloadFunc:     payloadFunc,                                          // Token 封装
		LoginResponse:   loginResponse,                                        // 登录成功响应
		Unauthorized:    unauthorized,                                         // 登录，认证失败响应
		IdentityHandler: identityHandler,                                      // 解析 Token
		Authorizator:    authorizator,                                         // 验证 Token
		LogoutResponse:  logoutResponse,                                       // 注销登录
		TokenLookup:     "header: Authorization, query: token, cookie: jwt",   // Token 查找的字段
		TokenHeadName:   "Bearer",                                             // Token 请求头名称
	})
}

// 隶属 Login 中间件，当调用 LoginHandler 就会触发
// 通过从 ctx 中检索出数据，进行用户登录认证
// 返回包含用户信息的 Map 或者 Struct
func authenticator(ctx *gin.Context) (interface{}, error) {
	// 获取用户登录数据
	var req request.Login
	err := ctx.ShouldBind(&req)
	if err != nil {
		return nil, errors.New("获取登录信息失败")
	}

	// 数据库查询
	var user model.SystemUser

	// 使用用户查询模板
	DBT := common.DB.Preload("SystemDepartment").
		Preload("SystemRole", "status = ?", 1).
		Preload("OfficeCity").
		Preload("NativeProvince").
		Preload("NativeCity")

	// 校验用户登录使用的的账户类型

	// 用户名登录
	if utils.RegExpString(utils.UsernameRegExp, req.Account) {
		err = DBT.Where("username = ?", req.Account).First(&user).Error
	}

	// 手机号登录
	if utils.RegExpString(utils.MobileRegExp, req.Account) {
		err = DBT.Where("mobile = ?", req.Account).First(&user).Error
	}

	// 邮箱登录
	if utils.RegExpString(utils.EmailRegExp, req.Account) {
		err = DBT.Where("email = ?", req.Account).First(&user).Error
	}

	// 如果没有查询到用户
	if err != nil {
		return nil, fmt.Errorf("没有查询到用户 %s", req.Account)
	}

	// 判断用户状态

	// 处于未激活状态禁止登录
	if *user.Active == 0 {
		return nil, fmt.Errorf("用户 %s 未激活，请联系管理员", req.Account)
	}

	// 处于锁定状态禁止登录
	if *user.Unlocked == 0 {
		return nil, fmt.Errorf("用户 %s 已被锁定，请联系管理员", req.Account)
	}

	// 错误登录次数限制判断
	// 如果开启了错误次数限制：
	//	1. 错误次数小于错误次数限制，继续允许登录
	//  2. 错误次数大于错误次数限制，小于最大错误次数限制，需要间隔等待时间
	//  3. 错误次数大于最大错误次数限制，则锁定用户
	if common.Conf.Login.AllowWrongTimes != 0 {
		// 错误次数大于错误次数限制
		if user.WrongTimes > common.Conf.Login.AllowWrongTimes {
			// 错误次数大于最大错误次数限制
			if user.WrongTimes > common.Conf.Login.AllowMaxWrongTimes {
				// 锁定用户，并且返回错误
				common.DB.Model(&model.SystemUser{}).Where("username = ?", user.Username).Update("unlocked", 0)
				return nil, fmt.Errorf("用户 %s 登录错误次数达到上限 %d 次，账户被锁定", req.Account, common.Conf.Login.AllowMaxWrongTimes)
			} else {
				// 判断是否到冷却时间
				now := carbon.Parse(carbon.Now().Format("Y-m-d H:i:s"))
				if now.DiffAbsInSeconds(user.LastLogin.Carbon) < common.Conf.Login.MaxWrongWaitTime {
					return nil, fmt.Errorf("用户登录错误次数达到阈值，请在 %d 秒后重试", common.Conf.Login.MaxWrongWaitTime-now.DiffAbsInSeconds(user.LastLogin.Carbon))
				}
			}
		}
	}

	// 更新最后一次登录时间
	common.DB.Model(&model.SystemUser{}).Where("username = ?", user.Username).Update("last_login", carbon.Now())

	// 如果查询到用户，则进行密码校验
	if !utils.ComparePassword(user.Password, req.Password) {
		// 如果密码不对，则增加一次登录错误计数
		common.DB.Model(&model.SystemUser{}).Where("username = ?", user.Username).Update("wrong_times", user.WrongTimes+1)
		return nil, errors.New(response.UserLoginErrorMessage)
	}

	// 判断是不是第一次登录，第一次登录要求改密码
	if *user.FirstLogin == 1 {
		return &user, fmt.Errorf("%s:%s", "FirstLoginError", user.Username)
	}

	// 设置 Context，方便后面使用
	ctx.Set("username", user.Username)

	// 以指针的方式将数据传递给 PayloadFunc 函数继续处理
	return &user, nil
}

// 隶属 Login 中间件，接收 Authenticator 验证成功后传递过来的数据，进行封装成 Token
// MapClaims 必须包含 IdentityKey
// MapClaims 会被嵌入 Token 中，后续可以通过 ExtractClaims 对 Token 进行解析获取到
func payloadFunc(data interface{}) jwt.MapClaims {
	// 断言判断获取传递过来数据是不是用户数据
	if v, ok := data.(*model.SystemUser); ok {
		// 登录成功，重置错误次数
		common.DB.Model(&model.SystemUser{}).Where("username = ?", v.Username).Update("wrong_times", 0)
		// 封装一些常用的字段，方便直接使用
		return jwt.MapClaims{
			jwt.IdentityKey: v.Username,           // 用户名
			"userId":        v.Id,                 // 用户 Id
			"name":          v.Name,               // 用户名字
			"roleId":        v.SystemRole.Id,      // 角色 Id
			"roleKeyword":   v.SystemRole.Keyword, // 角色 Keyword 用于 Casbin 验证
		}
	}
	return jwt.MapClaims{}
}

// 隶属 Login 中间件，响应用户请求
// 接收 PayloadFunc 传递过来的 Token 信息，返回登录成功
func loginResponse(ctx *gin.Context, code int, token string, expire time.Time) {
	// 用户响应数据
	var res response.Login
	res.Token = token
	res.Expire = expire.Format(common.SecLocalTimeFormat)

	// 不允许多设备登录配置
	if !common.Conf.Login.AllowMultipleDevices {
		// 组合 Key
		username, _ := ctx.Get("username")
		key := fmt.Sprintf("%s%s%s", common.RedisKeyPrefix.Token, common.RedisKeyPrefixTag, username)

		// 将新的 Token 存到 Redis 中，用户下一次请求的时候就去验证该 Token
		cache := gedis.NewStringOperation()
		cache.Set(key, token, gedis.WithExpire(common.RedisKeyExpireTime.TokenExpireTime))
	}

	// 响应请求
	response.SuccessWithData(res)
}

// 登录失败，验证失败的响应
func unauthorized(ctx *gin.Context, code int, message string) {
	if strings.HasPrefix(message, "FirstLoginError") {
		// 获取用户名
		username := strings.Split(message, ":")[1]

		// 生成随机字符串
		token := utils.RandString(16)

		// 将数据保存到 Redis
		key := fmt.Sprintf("%s%s%s", common.RedisKeyPrefix.ResetPwdToken, common.RedisKeyPrefixTag, token)
		cache := gedis.NewStringOperation()
		cache.Set(key, username, gedis.WithExpire(common.RedisKeyExpireTime.ResetPwdTokenExpireTime))

		// 响应客户端
		response.FailedWithCodeAndMessage(response.FirstLoginError, token)
		return
	}
	response.FailedWithMessage(message)
}

// 用户登录后的中间件，用于解析 Token
func identityHandler(ctx *gin.Context) interface{} {
	username, _ := utils.GetUsernameFromContext(ctx)
	return &model.SystemUser{
		Username: username,
	}
}

// 用户登录后的中间件，用于验证 Token
func authorizator(data interface{}, ctx *gin.Context) bool {
	user, ok := data.(*model.SystemUser)
	if ok && user.Username != "" {
		// 不允许多设备登录配置
		if !common.Conf.Login.AllowMultipleDevices {
			// 组合 Key
			token := jwt.GetToken(ctx)
			key := fmt.Sprintf("%s%s%s", common.RedisKeyPrefix.Token, common.RedisKeyPrefixTag, user.Username)

			// 验证该用户的 Token 和 Redis 中的是否一致
			cache := gedis.NewStringOperation()
			if cache.Get(key).Unwrap() == token {
				return true
			} else {
				return false
			}
		}
		return true
	}
	return false
}

// 注销登录
func logoutResponse(ctx *gin.Context, code int) {
	// 清理 Redis 保存的数据
	// Todo
	response.Success()
}

package api

import (
	"change-api/common"
	"change-api/dto/request"
	"change-api/dto/response"
	"change-api/model"
	"change-api/pkg/gedis"
	"change-api/pkg/utils"
	"fmt"
	"github.com/gin-gonic/gin"
)

// @Summary		ping
// @Description	ping 测试处理函数
// @Tags			Base
// @Success		200	{object}	response.Response	"请求成功"
// @Failure		200	{object}	response.Response	"请求错误"
// @Router			/ping [get]
func PingHandler(ctx *gin.Context) {
	response.SuccessWithData(map[string]interface{}{
		"message": "pong",
	})
}

// 第一次登录重置密码
func FirstLoginResetPassword(ctx *gin.Context) {
	// 获取 URI 参数
	token := ctx.Param("token")
	if token == "" {
		response.FailedWithCode(response.ParamError)
		return
	}

	// 查询缓存该 Token 是否失效
	key := fmt.Sprintf("%s%s%s", common.RedisKeyPrefix.ResetPwdToken, common.RedisKeyPrefixTag, token)
	cache := gedis.NewStringOperation()
	username := cache.Get(key).Unwrap()
	if username == "" {
		response.FailedWithMessage("重置密码 Token 已经过期，请重新获取")
		return
	}

	// 获取重置密码数据
	var req request.ResetPassword
	err := ctx.ShouldBind(&req)

	// 获取参数错误或者两次密码不一致或者密码长度小于固定位数
	if (err != nil) || (req.Password != req.RePassword) || (len(req.Password) < common.Conf.Login.MinPasswordLength) {
		response.FailedWithCode(response.ParamError)
		return
	}

	// 查询数据库用户
	var user model.SystemUser
	err = common.DB.Where("username = ?", username).First(&user).Error
	if err != nil {
		response.FailedWithMessage("获取重置密码的用户失败")
		return
	}

	// 重置密码
	password := utils.CryptoPassword(req.Password)
	firstLogin := uint(0)
	err = common.DB.Model(&user).Updates(model.SystemUser{Password: password, FirstLogin: &firstLogin}).Error
	if err != nil {
		response.FailedWithMessage("重置密码失败")
		return
	}

	// 成功
	response.SuccessWithMessage("密码修改成功")
}

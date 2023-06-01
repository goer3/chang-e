package v1

import (
	"change-api/common"
	"change-api/dto/request"
	"change-api/dto/response"
	"change-api/pkg/ms"
	jwt "github.com/appleboy/gin-jwt/v2"
	"github.com/gin-gonic/gin"
)

// 获取用户列表，可以添加条件筛选
func GetUserListHandler(ctx *gin.Context) {
	// 解析用户传递的数据
	var req request.User
	err := ctx.ShouldBind(&req)
	if err != nil {
		response.FailedWithCode(response.ParamError)
		return
	}

	// 查询数据库
	users, page := ms.FindUsers(&req)

	// 响应
	response.SuccessWithData(response.PageData{
		PageInfo: page,
		List:     users,
	})
}

// 根据 Id 查询用户信息
func GetUserInfoByUsernameHandler(ctx *gin.Context) {
	// 获取 URI 参数
	username := ctx.Param("username")
	if username == "" {
		response.FailedWithCode(response.ParamError)
		return
	}

	// 查询并响应
	ms.GetUserInfoByUsername(username)
}

// 获取用户信息
func GetCurrentUserInfoHandler(ctx *gin.Context) {
	// 获取当前用户 Id
	claims := jwt.ExtractClaims(ctx)
	username, _ := claims["identity"].(string)

	// 查询并响应
	ms.GetUserInfoByUsername(username)
}

// 重置当前用户密码
func ResetPasswordHandler(ctx *gin.Context) {
	// 获取当前用户名
	claims := jwt.ExtractClaims(ctx)
	username, _ := claims["identity"].(string)

	// 重置密码
	ms.ResetPasswordByUsername(ctx, username)
}

// 重置指定用户密码
func ResetPasswordByUsernameHandler(ctx *gin.Context) {
	// 获取 URI 参数
	username := ctx.Param("username")
	if username == "" {
		response.FailedWithMessage("未获取到需要重置密码的用户")
		return
	}

	// 重置密码
	ms.ResetPasswordByUsername(ctx, username)
}

// 更新当前用户信息
func UpdateCurrentUserInfoHandler(ctx *gin.Context) {
	// 获取当前角色 ID
	claims := jwt.ExtractClaims(ctx)
	username, _ := claims["identity"].(string)

	// 更新用户信息
	ms.UpdateUserInfoByUsername(ctx, username)
}

// 更新指定用户用户信息
func UpdateUserInfoByUsernameHandler(ctx *gin.Context) {
	// 获取当前角色 ID
	claims := jwt.ExtractClaims(ctx)
	cusername, _ := claims["identity"].(string)

	// 获取传递的用户名
	username := ctx.Param("username")
	if username == "" {
		response.FailedWithCode(response.ParamError)
		return
	}

	// 如果指定的用户是超级管理用户，那只能超级用户自己更新自己的信息
	if username == common.Conf.Service.AdminUsername && cusername != common.Conf.Service.AdminUsername {
		response.FailedWithMessage("超级管理员用户的信息只能自己修改")
		return
	}

	// 更新用户信息
	ms.UpdateUserInfoByUsername(ctx, username)
}

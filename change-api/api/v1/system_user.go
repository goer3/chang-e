package v1

import (
	"change-api/dto/request"
	"change-api/dto/response"
	"change-api/pkg/ms"
	"change-api/pkg/utils"
	"github.com/gin-gonic/gin"
)

// 获取用户列表，可以添加条件筛选
func GetUserListHandler(ctx *gin.Context) {
	// 解析用户传递的数据
	var req request.User
	if err := ctx.ShouldBindQuery(&req); err != nil {
		response.FailedWithCode(response.ParamError)
		return
	}

	// 查询数据库，根据请求条件获取用户列表
	users, page := ms.FindUsers(&req)

	// 响应
	response.SuccessWithData(response.PageData{
		PageInfo: page,
		List:     users,
	})
}

// 通过用户名获取用户信息的响应方法封装
func ResponseUserInfoByUsername(username string) {
	// 通过用户名查询用户信息
	user, err := ms.GetUserInfoByUsername(username)
	if err != nil {
		response.FailedWithMessageAndErrorLog("查询用户信息失败", err)
		return
	}

	// 查询成功响应
	response.SuccessWithData(map[string]interface{}{
		"user_info": user,
	})
}

// 获取当前用户的用户信息
func GetCurrentUserInfoHandler(ctx *gin.Context) {
	// 获取当前用户用户名
	username, err := utils.GetUsernameFromContext(ctx)
	if err != nil {
		response.FailedWithMessage(err.Error())
		return
	}

	// 查询响应
	ResponseUserInfoByUsername(username)
}

// 根据传递的用户名查询用户信息
func GetUserInfoByUsernameHandler(ctx *gin.Context) {
	// 获取 URI 参数
	username := ctx.Param("username")
	if username == "" {
		response.FailedWithCode(response.ParamError)
	}

	// 查询响应
	ResponseUserInfoByUsername(username)
}

// 重置当前用户密码
func ResetPasswordHandler(ctx *gin.Context) {
	// 获取当前用户用户名
	username, err := utils.GetUsernameFromContext(ctx)
	if err != nil {
		response.FailedWithMessage(err.Error())
		return
	}

	// 重置密码
	err = ms.ResetPasswordByUsername(ctx, username)
	if err != nil {
		response.FailedWithMessage(err.Error())
		return
	}

	// 成功响应
	response.Success()
}

// 重置指定用户密码
func ResetPasswordByUsernameHandler(ctx *gin.Context) {
	// 从 URI 中获取用户名
	username := ctx.Param("username")
	if username == "" {
		response.FailedWithMessage("未获取到需要重置密码的用户")
		return
	}

	// 重置密码
	err := ms.ResetPasswordByUsername(ctx, username)
	if err != nil {
		response.FailedWithMessage(err.Error())
		return
	}

	// 成功响应
	response.Success()
}

// 更新当前用户信息
func UpdateCurrentUserInfoHandler(ctx *gin.Context) {
	// 获取当前角色 ID
	username, err := utils.GetUsernameFromContext(ctx)
	if err != nil {
		response.FailedWithMessage(err.Error())
		return
	}

	// 更新用户信息
	err = ms.UpdateUserInfoByUsername(ctx, username)
	if err != nil {
		response.FailedWithMessage(err.Error())
		return
	}

	// 成功响应
	response.Success()
}

// 更新指定用户用户信息
func UpdateUserInfoByUsernameHandler(ctx *gin.Context) {
	// 获取传递的用户名
	username := ctx.Param("username")
	if username == "" {
		response.FailedWithCode(response.ParamError)
		return
	}

	// 更新用户信息
	err := ms.UpdateUserInfoByUsername(ctx, username)
	if err != nil {
		response.FailedWithMessage(err.Error())
		return
	}

	// 成功响应
	response.Success()
}

// 修改指定用户状态：禁用，启用，锁定，解锁
func ChangeUserStatusByUsernameHandler(ctx *gin.Context) {
	// 获取修改用户名
	username := ctx.Param("username")
	if username == "" {
		response.FailedWithCode(response.ParamError)
		return
	}

	// 通过用户名修改用户状态
	err := ms.ChangeUserStatusByUsername(ctx, username)
	if err != nil {
		response.FailedWithMessage(err.Error())
		return
	}

	// 成功响应
	response.Success()
}

// 删除指定用户
func DeleteUserByUsernameHandler(ctx *gin.Context) {
	// 获取删除用户名
	username := ctx.Param("username")
	if username == "" {
		response.FailedWithCode(response.ParamError)
		return
	}

	// 通过用户名删除用户
	err := ms.DeleteUserByUsername(ctx, username)
	if err != nil {
		response.FailedWithMessage(err.Error())
		return
	}

	// 成功响应
	response.Success()
}

// 创建用户
func CreateUserHandler(ctx *gin.Context) {
	// 创建用户
	err := ms.CreateUser(ctx)
	if err != nil {
		response.FailedWithMessage(err.Error())
		return
	}
	response.Success()
}

package routes

import (
	v1 "change-api/api/v1"
	"github.com/gin-gonic/gin"
)

// 用户路由组
func SystemUser(rg *gin.RouterGroup) gin.IRoutes {
	rs := rg.Group("/user")
	{
		rs.GET("/info", v1.GetCurrentUserInfoHandler)                              // 获取当前用户信息
		rs.PATCH("/info", v1.UpdateCurrentUserInfoHandler)                         // 更新当前用户信息
		rs.GET("/info/:username", v1.GetUserInfoByUsernameHandler)                 // 获取指定用户信息
		rs.PATCH("/info/:username", v1.UpdateUserInfoByUsernameHandler)            // 更新指定用户信息
		rs.GET("/list", v1.GetUserListHandler)                                     // 获取用户列表信息
		rs.PUT("/reset/password", v1.ResetPasswordHandler)                         // 重置当前用户密码
		rs.PUT("/reset/password/:username", v1.ResetPasswordByUsernameHandler)     // 重置指定用户密码
		rs.PATCH("/change/status/:username", v1.ChangeUserStatusByUsernameHandler) // 禁用，启用，锁定，解锁指定用户
		rs.DELETE("/delete/:username", v1.DeleteUserByUsernameHandler)             // 删除指定用户
		rs.POST("/create", v1.CreateUserHandler)                                   // 创建用户
	}
	return rg
}

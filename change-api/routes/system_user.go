package routes

import (
	v1 "change-api/api/v1"
	"github.com/gin-gonic/gin"
)

// 用户路由组
func SystemUser(rg *gin.RouterGroup) gin.IRoutes {
	rs := rg.Group("/user")
	{
		rs.GET("/info", v1.GetCurrentUserInfoHandler)                           // 获取当前用户信息
		rs.GET("/info/:id", v1.GetUserInfoByIdHandler)                          // 获取指定用户信息
		rs.GET("/list", v1.GetUserListHandler)                                  // 获取用户列表信息
		rs.POST("/reset/password", v1.ResetPasswordHandler)                     // 重置当前用户密码
		rs.POST("/reset/password/:username", v1.ResetPasswordByUsernameHandler) // 重置指定用户密码
	}
	return rg
}

package routes

import (
	v1 "change-api/api/v1"
	"github.com/gin-gonic/gin"
)

// 用户路由组
func SystemUser(rg *gin.RouterGroup) gin.IRoutes {
	rs := rg.Group("/user")
	{
		rs.GET("/info", v1.GetCurrentUserInfoHandler)                          // 获取当前用户信息
		rs.PATCH("/info", v1.UpdateCurrentUserInfoHandler)                     // 更新当前用户信息
		rs.GET("/info/:username", v1.GetUserInfoByUsernameHandler)             // 获取指定用户信息
		rs.PATCH("/info/:username", v1.UpdateUserInfoByUsernameHandler)        // 更新指定用户信息
		rs.GET("/list", v1.GetUserListHandler)                                 // 获取用户列表信息
		rs.PUT("/reset/password", v1.ResetPasswordHandler)                     // 重置当前用户密码
		rs.PUT("/reset/password/:username", v1.ResetPasswordByUsernameHandler) // 重置指定用户密码
		rs.PATCH("/change/status")                                             // 禁用，启用，锁定，解锁当前用户，注意清理 Redis
		rs.PATCH("/change/status/:username")                                   // 禁用，启用，锁定，解锁指定用户
		rs.DELETE("/delete/:username")                                         // 删除指定用户
		rs.POST("/create")                                                     // 创建用户
	}
	return rg
}

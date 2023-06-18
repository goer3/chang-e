package routes

import (
	v1 "change-api/api/v1"
	"github.com/gin-gonic/gin"
)

// 角色路由组
func SystemRole(rg *gin.RouterGroup) gin.IRoutes {
	rs := rg.Group("/role")
	{
		rs.GET("/list", v1.GetRoleListHandler) // 获取角色列表
	}
	return rg
}

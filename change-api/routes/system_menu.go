package routes

import (
	v1 "change-api/api/v1"
	"github.com/gin-gonic/gin"
)

// 菜单路由组
func SystemMenu(rg *gin.RouterGroup) gin.IRoutes {
	rs := rg.Group("/menu")
	{
		rs.GET("/tree", v1.GetCurrentUserMenuTreeHandler)            // 获取当前用户菜单数据
		rs.GET("/tree/:keyword", v1.GetMenuTreeByRoleKeywordHandler) // 获取指定角色菜单数据
	}
	return rg
}

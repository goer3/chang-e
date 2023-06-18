package routes

import (
	v1 "change-api/api/v1"
	"github.com/gin-gonic/gin"
)

// 部门路由组
func SystemDepartment(rg *gin.RouterGroup) gin.IRoutes {
	rs := rg.Group("/department")
	{
		rs.GET("/list", v1.GetDepartmentListHandler) // 获取部门列表
	}
	return rg
}

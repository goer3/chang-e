package routes

import (
	v1 "change-api/api/v1"
	"github.com/gin-gonic/gin"
)

// 用户路由组
func SystemRegions(rg *gin.RouterGroup) gin.IRoutes {
	rs := rg.Group("/regions")
	{
		rs.GET("/list", v1.GetAllProvinceHandler)            // 获取省份信息
		rs.GET("/list/:id", v1.GetCitiesByProvinceIdHandler) // 根据省份获取城市信息
	}
	return rg
}

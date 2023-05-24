package routes

import (
	"change-api/api"
	"github.com/gin-gonic/gin"
)

// 基础路由组
func Base(rg *gin.RouterGroup) gin.IRoutes {
	rg.GET("/ping", api.PingHandler) // ping 测试接口
	return rg
}

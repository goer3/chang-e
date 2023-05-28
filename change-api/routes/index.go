package routes

import (
	"change-api/api"
	jwt "github.com/appleboy/gin-jwt/v2"
	"github.com/gin-gonic/gin"
)

// 基础路由组
func Public(rg *gin.RouterGroup, auth *jwt.GinJWTMiddleware) gin.IRoutes {
	rg.GET("/ping", api.PingHandler)     // ping 测试接口
	rg.POST("/login", auth.LoginHandler) // 登录接口
	return rg
}

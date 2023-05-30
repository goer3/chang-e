package routes

import (
	"change-api/api"
	jwt "github.com/appleboy/gin-jwt/v2"
	"github.com/gin-gonic/gin"
)

// 基础路由组
func Public(rg *gin.RouterGroup, auth *jwt.GinJWTMiddleware) gin.IRoutes {
	rg.GET("/ping", api.PingHandler)                                      // ping 测试接口
	rg.POST("/login", auth.LoginHandler)                                  // 登录接口
	rg.POST("/reset/password/:token", api.FirstLoginResetPasswordHandler) // 第一次登录重置密码
	return rg
}

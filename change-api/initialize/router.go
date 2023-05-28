package initialize

import (
	"change-api/common"
	"change-api/middleware"
	"change-api/pkg/log2"
	"change-api/routes"
	"github.com/gin-gonic/gin"
)

// 路由初始化
func Router() *gin.Engine {
	// JWT 中间件
	auth, err := middleware.JWTAuth()
	if err != nil {
		log2.SYSTEM("JWT 认证初始化失败：", err.Error())
		panic(err)
	}
	log2.SYSTEM("JWT 认证初始化完成！")

	// 创建一个没有中间件的路由引擎
	r := gin.New()

	// 中间件
	r.Use(middleware.AccessLog) // 访问日志中间件，用于打印请求日志
	r.Use(middleware.Cors)      // 异常访问中间件，用于允许跨域访问
	r.Use(middleware.Exception) // 异常捕获中间件，用于处理用户响应

	// 基础路由组
	rbg := r.Group(common.Conf.Service.ApiPrefix)
	{
		routes.Base(rbg, auth)
	}

	return r
}

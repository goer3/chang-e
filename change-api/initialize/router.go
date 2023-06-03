package initialize

import (
	"change-api/common"
	"change-api/middleware"
	"change-api/pkg/log2"
	"change-api/routes"
	"github.com/gin-gonic/gin"
	swaggerfiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
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

	// 判断是否开启 Swagger 路由
	if common.Conf.Swagger.Enable {
		r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerfiles.Handler))
	}

	// 开放路由组
	rbg := r.Group(common.Conf.Service.ApiPrefix)
	routes.Public(rbg, auth)

	// 需要认证和授权的路由组
	rag := r.Group(common.Conf.Service.ApiPrefix)
	rag.Use(auth.MiddlewareFunc()) // 认证鉴权中间件
	rag.Use(middleware.Casbin)     // Casbin 中间件
	{
		// system 路由模块
		srag := rag.Group("/system")
		{
			routes.SystemUser(srag) // 用户路由组
			routes.SystemMenu(srag) // 菜单路由组
		}
	}
	return r
}

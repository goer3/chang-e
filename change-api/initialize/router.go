package initialize

import (
	"change-api/common"
	"change-api/routes"
	"github.com/gin-gonic/gin"
)

// 路由初始化
func Router() *gin.Engine {
	// 创建一个没有中间件的路由引擎
	r := gin.New()

	// 基础路由组
	rbg := r.Group(common.Conf.Service.ApiPrefix)
	{
		routes.Base(rbg)
	}

	return r
}

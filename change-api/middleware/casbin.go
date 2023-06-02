package middleware

import (
	"change-api/common"
	"change-api/dto/response"
	"change-api/pkg/utils"
	"github.com/gin-gonic/gin"
	"strings"
)

// Casbin 中间件
func Casbin(ctx *gin.Context) {
	// 获取当前用户角色关键字
	keyword, _ := utils.GetRoleKeywordFromContext(ctx)

	// sub，角色关键字
	sub := keyword
	// obj，除去前缀后的 URI
	obj := strings.TrimPrefix(ctx.Request.RequestURI, common.Conf.Service.ApiPrefix)
	// act，请求方式
	act := ctx.Request.Method

	// 校验数据
	pass, _ := common.CasbinEnforcer.Enforce(sub, obj, act)
	if !pass {
		response.FailedWithCode(response.Forbidden)
		ctx.Abort()
		return
	}
	ctx.Next()
}

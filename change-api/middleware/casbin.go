package middleware

import (
	"change-api/common"
	"change-api/dto/response"
	"fmt"
	jwt "github.com/appleboy/gin-jwt/v2"
	"github.com/gin-gonic/gin"
	"strings"
	"sync"
)

var WkLock sync.RWMutex

// Casbin 中间件
func Casbin(ctx *gin.Context) {
	// 获取当前用户角色关键字
	claims := jwt.ExtractClaims(ctx)
	keyword, _ := claims["roleKeyword"].(string)
	fmt.Println(keyword)

	// sub，角色关键字
	sub := keyword
	// obj，除去前缀后的 URI
	obj := strings.TrimPrefix(ctx.Request.RequestURI, common.Conf.Service.ApiPrefix)
	// act，请求方式
	act := ctx.Request.Method

	// 设置同一时间只允许一个校验，否则可能出现校验失败
	WkLock.Lock()
	defer WkLock.Unlock()

	// 校验数据
	pass, _ := common.CasbinEnforcer.Enforce(sub, obj, act)
	if !pass {
		response.FailedWithCode(response.Forbidden)
		ctx.Abort()
		return
	}
	ctx.Next()
}

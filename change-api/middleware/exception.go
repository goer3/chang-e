package middleware

import (
	"change-api/dto/response"
	"change-api/pkg/log2"
	"github.com/gin-gonic/gin"
	"net/http"
	"runtime/debug"
)

// 异常捕获中间件，主要用于捕获请求处理中的 panic
func Exception(ctx *gin.Context) {
	defer func() {
		// 接收异常
		err := recover()
		if err != nil {
			// 判断异常类型是不是由于请求响应抛出的
			resp, ok := err.(response.Response)
			// 如果不是请求响应，而是系统异常 panic
			if !ok {
				// 打印日志
				log2.ERROR("系统发生异常：", err)
				log2.ERROR("异常堆栈信息：", string(debug.Stack()))

				// 还是需要响应用户请求
				resp = response.Response{
					Code:    response.InternalServerError,
					Message: response.CustomMessage[response.InternalServerError],
					Data:    map[string]interface{}{},
				}
			}
			// 不管是正常还是异常响应，都走该方法
			ctx.JSON(http.StatusOK, resp)
			ctx.Abort()
			return
		}
	}()

	// 继续执行请求
	ctx.Next()
}

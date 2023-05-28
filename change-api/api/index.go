package api

import (
	"change-api/dto/response"
	"github.com/gin-gonic/gin"
)

//	@Summary		ping
//	@Description	ping 测试处理函数
//	@Tags			Base
//	@Success		200	{object}	response.Response	"请求成功"
//	@Failure		200	{object}	response.Response	"请求错误"
//	@Router			/ping [get]
func PingHandler(ctx *gin.Context) {
	response.SuccessWithData(map[string]interface{}{
		"message": "pong",
	})
}

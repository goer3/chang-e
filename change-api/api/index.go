package api

import (
	"change-api/dto/response"
	"github.com/gin-gonic/gin"
)

// Ping 测试
func PingHandler(ctx *gin.Context) {
	response.SuccessWithData(map[string]interface{}{
		"message": "pong",
	})
}

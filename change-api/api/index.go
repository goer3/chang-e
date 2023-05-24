package api

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

// Ping 测试
func PingHandler(ctx *gin.Context) {
	ctx.JSON(http.StatusOK, gin.H{
		"message": "pong",
	})
}

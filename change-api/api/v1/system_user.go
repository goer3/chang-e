package v1

import (
	"change-api/dto/response"
	jwt "github.com/appleboy/gin-jwt/v2"
	"github.com/gin-gonic/gin"
)

// Casbin 测试
func GetUserInfo(ctx *gin.Context) {
	// 获取当前用户角色关键字
	claims := jwt.ExtractClaims(ctx)
	username, _ := claims["identity"].(string)
	keyword, _ := claims["roleKeyword"].(string)
	response.SuccessWithData(map[string]interface{}{
		"username": username,
		"role":     keyword,
	})
}

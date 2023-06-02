package utils

import (
	"errors"
	jwt "github.com/appleboy/gin-jwt/v2"
	"github.com/gin-gonic/gin"
)

// 获取请求用户名
func GetUsernameFromContext(ctx *gin.Context) (username string, err error) {
	claims := jwt.ExtractClaims(ctx)
	username, _ = claims["identity"].(string)
	if username == "" {
		return username, errors.New("获取请求用户名失败")
	}
	return
}

// 获取请求用户 ID
func GetUserIdFromContext(ctx *gin.Context) (id uint, err error) {
	claims := jwt.ExtractClaims(ctx)
	fid, _ := claims["userId"].(float64)
	if fid == 0 {
		return id, errors.New("获取请求用户ID失败")
	}
	id = uint(fid)
	return
}

// 获取请求用户名称
func GetNameFromContext(ctx *gin.Context) (name string, err error) {
	claims := jwt.ExtractClaims(ctx)
	name, _ = claims["name"].(string)
	if name == "" {
		return name, errors.New("获取请求用户名称失败")
	}
	return
}

// 获取请求用户角色 ID
func GetRoleIdFromContext(ctx *gin.Context) (id uint, err error) {
	claims := jwt.ExtractClaims(ctx)
	fid, _ := claims["roleId"].(float64)
	if fid == 0 {
		return id, errors.New("获取请求用户角色ID失败")
	}
	id = uint(fid)
	return
}

// 获取请求用户角色关键字
func GetRoleKeywordFromContext(ctx *gin.Context) (keyword string, err error) {
	claims := jwt.ExtractClaims(ctx)
	keyword, _ = claims["roleKeyword"].(string)
	if keyword == "" {
		return keyword, errors.New("获取请求用户角色关键字失败")
	}
	return
}

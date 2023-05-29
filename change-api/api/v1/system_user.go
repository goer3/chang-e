package v1

import (
	"change-api/dto/request"
	"change-api/dto/response"
	"change-api/pkg/ms"
	"change-api/pkg/utils"
	"fmt"
	jwt "github.com/appleboy/gin-jwt/v2"
	"github.com/gin-gonic/gin"
)

// 获取用户列表，可以添加条件筛选
func GetUserListHandler(ctx *gin.Context) {
	// 解析用户传递的数据
	var req request.User
	err := ctx.ShouldBind(&req)
	if err != nil {
		response.FailedWithCode(response.ParamError)
		return
	}

	// 查询数据库
	users, page := ms.FindUsers(&req)

	// 响应
	response.SuccessWithData(response.PageData{
		PageInfo: page,
		List:     users,
	})
}

// 根据 Id 查询用户信息
func GetUserInfoByIdHandler(ctx *gin.Context) {
	// 获取 URI 参数
	idStr := ctx.Param("id")
	id := utils.String2Uint(idStr)
	if id == 0 {
		response.FailedWithMessage("查询用户的 id 错误")
		return
	}

	// 查询并响应
	ms.GetUserInfoById(id)
}

// 获取用户信息
func GetCurrentUserInfoHandler(ctx *gin.Context) {
	// 获取当前用户 Id
	claims := jwt.ExtractClaims(ctx)
	id, _ := claims["userId"].(float64) // 注意：请求传递过来的类型为 float64
	fmt.Println(uint(id))

	// 查询并响应
	ms.GetUserInfoById(uint(id))
}

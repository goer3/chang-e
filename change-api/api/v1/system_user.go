package v1

import (
	"change-api/dto/request"
	"change-api/dto/response"
	"change-api/pkg/ms"
	"github.com/gin-gonic/gin"
)

// 获取用户列表，可以添加条件筛选
func GetUserList(ctx *gin.Context) {
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

package v1

import (
	"change-api/common"
	"change-api/dto/response"
	"change-api/model"
	"github.com/gin-gonic/gin"
)

// 获取角色列表
func GetRoleListHandler(ctx *gin.Context) {
	// 查询数据库，根据请求条件获取角色列表
	var roles []model.SystemRole
	err := common.DB.Where("status = ?", 1).Find(&roles).Error
	if err != nil {
		response.FailedWithMessageAndErrorLog("查询角色信息失败", err)
	}
	// 响应
	response.SuccessWithData(map[string]interface{}{"list": roles})
}

package v1

import (
	"change-api/common"
	"change-api/dto/response"
	"change-api/model"
	"github.com/gin-gonic/gin"
)

// 获取部门列表
func GetDepartmentListHandler(ctx *gin.Context) {
	// 查询数据库，根据请求条件获取部门列表
	var depts []model.SystemDepartment
	err := common.DB.Find(&depts).Error
	if err != nil {
		response.FailedWithMessageAndErrorLog("查询部门信息失败", err)
	}
	// 响应
	response.SuccessWithData(map[string]interface{}{"list": depts})
}

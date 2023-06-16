package v1

import (
	"change-api/common"
	"change-api/dto/response"
	"change-api/model"
	"change-api/pkg/utils"
	"github.com/gin-gonic/gin"
)

// 查询所有省份
func GetAllProvinceHandler(ctx *gin.Context) {
	var provinces = []model.Regions{}
	err := common.DB.Where("parent_id = ?", 0).Find(&provinces).Error
	if err != nil {
		response.FailedWithMessageAndErrorLog("获取省份信息失败", err)
		return
	}
	response.SuccessWithData(map[string]interface{}{
		"list": provinces,
	})
}

// 根据省份获取城市
func GetCitiesByProvinceIdHandler(ctx *gin.Context) {
	// 获取 URI 参数
	id := ctx.Param("id")
	parent_id := utils.String2Uint(id)
	if parent_id == 0 {
		response.FailedWithCode(response.ParamError)
	}

	// 查询数据
	var cities = []model.Regions{}
	err := common.DB.Where("parent_id = ?", parent_id).Find(&cities).Error
	if err != nil {
		response.FailedWithMessageAndErrorLog("根据省份获取城市信息失败", err)
		return
	}
	response.SuccessWithData(map[string]interface{}{
		"list": cities,
	})
}

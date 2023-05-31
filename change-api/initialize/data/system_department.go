package data

import (
	"change-api/common"
	"change-api/model"
	"errors"
	"gorm.io/gorm"
)

// 初始化部门数据
func SystemDepartmentData() {
	// 部门数据，由于有使用变量，需要放到函数中
	var departments = []model.SystemDepartment{
		{
			Base: model.Base{
				Id: 1,
			},
			Name:     common.Conf.Service.Company,
			ParentId: 0,
		},
		{
			Base: model.Base{
				Id: 10000,
			},
			Name:     "访客",
			ParentId: 1,
		},
	}

	// 初始化数据
	var department model.SystemDepartment
	for _, item := range departments {
		// 查看数据是否存在，如果不存在才执行创建
		err := common.DB.Where("id = ? or name = ?", item.Id, item.Name).First(&department).Error
		if errors.Is(err, gorm.ErrRecordNotFound) {
			common.DB.Create(&item)
		}
	}
}

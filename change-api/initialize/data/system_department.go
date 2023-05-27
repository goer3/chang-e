package data

import (
	"change-api/common"
	"change-api/model"
	"errors"
	"gorm.io/gorm"
)

// 部门数据
var departments = []model.SystemDepartment{
	{
		Base: model.Base{
			Id: 1,
		},
		Name:     "集团总部",
		ParentId: 0,
	},
	{
		Base: model.Base{
			Id: 100,
		},
		Name:     "研发中心",
		ParentId: 1,
	},
	{
		Base: model.Base{
			Id: 101,
		},
		Name:     "后台研发部",
		ParentId: 100,
	},
	{
		Base: model.Base{
			Id: 102,
		},
		Name:     "前端开发部",
		ParentId: 100,
	},
	{
		Base: model.Base{
			Id: 103,
		},
		Name:     "运维部",
		ParentId: 100,
	},
	{
		Base: model.Base{
			Id: 200,
		},
		Name:     "产品中心",
		ParentId: 1,
	},
	{
		Base: model.Base{
			Id: 201,
		},
		Name:     "产品部",
		ParentId: 200,
	},
	{
		Base: model.Base{
			Id: 202,
		},
		Name:     "数据分析部",
		ParentId: 200,
	},
}

// 初始化部门数据
func SystemDepartmentData() {
	var department model.SystemDepartment
	for _, item := range departments {
		// 查看数据是否存在，如果不存在才执行创建
		err := common.DB.Where("id = ? or name = ?", item.Id, item.Name).First(&department).Error
		if errors.Is(err, gorm.ErrRecordNotFound) {
			common.DB.Create(&item)
		}
	}
}

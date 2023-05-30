package data

import (
	"change-api/common"
	"change-api/model"
	"errors"
	"gorm.io/gorm"
)

// 接口数据
var apis = []model.SystemAPI{
	{
		Base: model.Base{
			Id: 1,
		},
		API:      "/",
		Name:     "系统接口",
		ParentId: 0,
	},
	{
		Base: model.Base{
			Id: 1000,
		},
		API:      "/system",
		Name:     "系统管理",
		ParentId: 1,
	},
	{
		Base: model.Base{
			Id: 1100,
		},
		API:      "/system/user",
		Name:     "用户管理",
		ParentId: 1000,
	},
	{
		Base: model.Base{
			Id: 1101,
		},
		API:      "/system/user/info",
		Name:     "获取当前用户信息",
		ParentId: 1100,
	},
	{
		Base: model.Base{
			Id: 1102,
		},
		API:      "/system/user/info/:id",
		Name:     "获取所有用户信息",
		ParentId: 1100,
	},
	{
		Base: model.Base{
			Id: 1103,
		},
		API:      "/system/user/list",
		Name:     "获取用户列表",
		ParentId: 1100,
	},
}

// 初始化接口数据
func SystemAPIData() {
	var api model.SystemAPI
	for _, item := range apis {
		// 查看数据是否存在，如果不存在才执行创建
		err := common.DB.Where("id = ? or name = ?",
			item.Id,
			item.Name).First(&api).Error
		if errors.Is(err, gorm.ErrRecordNotFound) {
			common.DB.Create(&item)
		}
	}
}

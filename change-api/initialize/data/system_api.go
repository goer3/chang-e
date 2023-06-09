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
		Method:   "GET",
		Name:     "系统接口",
		ParentId: 0,
	},
	{
		Base: model.Base{
			Id: 1000,
		},
		API:      "/system",
		Method:   "GET",
		Name:     "系统管理",
		ParentId: 1,
	},
	{
		Base: model.Base{
			Id: 1100,
		},
		API:      "/system/user",
		Method:   "GET",
		Name:     "用户管理",
		ParentId: 1000,
	},
	{
		Base: model.Base{
			Id: 1101,
		},
		API:      "/system/user/info",
		Method:   "GET",
		Name:     "获取当前用户信息",
		ParentId: 1100,
	},
	{
		Base: model.Base{
			Id: 1102,
		},
		API:      "/system/user/info/:id",
		Method:   "GET",
		Name:     "获取指定用户信息",
		ParentId: 1100,
	},
	{
		Base: model.Base{
			Id: 1103,
		},
		API:      "/system/user/list",
		Method:   "GET",
		Name:     "获取所有用户列表",
		ParentId: 1100,
	},
	{
		Base: model.Base{
			Id: 1104,
		},
		API:      "/system/user/reset/password",
		Method:   "POST",
		Name:     "重置当前用户密码",
		ParentId: 1100,
	},
	{
		Base: model.Base{
			Id: 1105,
		},
		API:      "/system/user/reset/password/:username",
		Method:   "POST",
		Name:     "重置指定用户密码",
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

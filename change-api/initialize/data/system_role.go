package data

import (
	"change-api/common"
	"change-api/model"
	"errors"
	"gorm.io/gorm"
)

// 角色数据
var roles = []model.SystemRole{
	{
		Base: model.Base{
			Id: 1,
		},
		Name:    "超级管理员",
		Keyword: "Administrator",
		Desc:    "系统最高权限",
	},
	{
		Base: model.Base{
			Id: 2,
		},
		Name:    "游客",
		Keyword: "Guest",
		Desc:    "系统最低权限",
	},
}

// 初始化角色数据
func SystemRoleData() {
	var role model.SystemRole
	for _, item := range roles {
		// 查看数据是否存在，如果不存在才执行创建
		err := common.DB.Where("id = ? or name = ? or keyword = ?", item.Id, item.Name, item.Keyword).First(&role).Error
		if errors.Is(err, gorm.ErrRecordNotFound) {
			common.DB.Create(&item)
		}
	}
}

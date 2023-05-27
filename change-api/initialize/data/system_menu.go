package data

import (
	"change-api/common"
	"change-api/model"
	"errors"
	"gorm.io/gorm"
)

// 菜单数据
var menus = []model.SystemMenu{
	{
		Base: model.Base{
			Id: 10,
		},
		Name:        "工作台",
		Title:       "Dashboard",
		Icon:        "DesktopOutlined",
		Path:        "/dashboard",
		ParentId:    0,
		SystemRoles: roles,
	},
	{
		Base: model.Base{
			Id: 1000,
		},
		Name:     "系统管理",
		Title:    "System",
		Icon:     "SettingOutlined",
		Path:     "/system",
		ParentId: 0,
		SystemRoles: []model.SystemRole{
			roles[0],
		},
	},
	{
		Base: model.Base{
			Id: 1001,
		},
		Name:     "部门管理",
		Title:    "SystemDepartments",
		Icon:     "",
		Path:     "/system/departments",
		ParentId: 1000,
		SystemRoles: []model.SystemRole{
			roles[0],
		},
	},
	{
		Base: model.Base{
			Id: 1002,
		},
		Name:     "用户管理",
		Title:    "SystemUsers",
		Icon:     "",
		Path:     "/system/users",
		ParentId: 1000,
		SystemRoles: []model.SystemRole{
			roles[0],
		},
	},
	{
		Base: model.Base{
			Id: 1003,
		},
		Name:     "角色管理",
		Title:    "SystemRoles",
		Icon:     "",
		Path:     "/system/roles",
		ParentId: 1000,
		SystemRoles: []model.SystemRole{
			roles[0],
		},
	},
	{
		Base: model.Base{
			Id: 1004,
		},
		Name:     "菜单管理",
		Title:    "SystemMenus",
		Icon:     "",
		Path:     "/system/menus",
		ParentId: 1000,
		SystemRoles: []model.SystemRole{
			roles[0],
		},
	},
	{
		Base: model.Base{
			Id: 2000,
		},
		Name:        "个人中心",
		Title:       "UserCenter",
		Icon:        "UserOutlined",
		Path:        "/info",
		ParentId:    0,
		SystemRoles: roles,
	},
	{
		Base: model.Base{
			Id: 2100,
		},
		Name:        "获取帮助",
		Title:       "Help",
		Icon:        "QuestionCircleOutlined",
		Path:        "/help",
		ParentId:    0,
		SystemRoles: roles,
	},
	{
		Base: model.Base{
			Id: 2200,
		},
		Name:        "关于我们",
		Title:       "About",
		Icon:        "FileOutlined",
		Path:        "/about",
		ParentId:    0,
		SystemRoles: roles,
	},
}

// 初始化菜单数据
func SystemMenuData() {
	var menu model.SystemMenu
	for _, item := range menus {
		// 查看数据是否存在，如果不存在才执行创建
		err := common.DB.Where("id = ? or name = ? or title = ? or path = ?",
			item.Id,
			item.Name,
			item.Title,
			item.Path).First(&menu).Error
		if errors.Is(err, gorm.ErrRecordNotFound) {
			common.DB.Create(&item)
		}
	}
}

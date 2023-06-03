package ms

import (
	"change-api/common"
	"change-api/model"
	"change-api/pkg/utils"
	"errors"
)

// 菜单树生成函数
func GenerateMenuTree(parentId uint, menuIds []uint, menus []model.SystemMenu) (tree []model.SystemMenu) {
	for _, menu := range menus {
		if !utils.ContainsUint(menuIds, menu.Id) {
			continue
		}

		// 递归获取子菜单
		if menu.ParentId == parentId {
			menu.Children = GenerateMenuTree(menu.Id, menuIds, menus)
			tree = append(tree, menu)
		}
	}
	return
}

// 通过角色关键字获取菜单列表
func GetMenuTreeByRoleKeyword(keyword string) (tree []model.SystemMenu, err error) {
	// 查询角色的所有菜单
	var role model.SystemRole
	err = common.DB.Preload("SystemMenus", "status = ?", 1).Where("keyword = ?", keyword).First(&role).Error
	if err != nil {
		common.ServiceLogger.Error(err)
		return tree, errors.New("查询角色信息失败")
	}

	// 获取角色拥有权限的所有菜单 ID
	var menuIds []uint
	for _, menu := range role.SystemMenus {
		menuIds = append(menuIds, menu.Id)
	}

	// 获取所有菜单数据
	var menus []model.SystemMenu
	err = common.DB.Where("status = ?", 1).Find(&menus).Error
	if err != nil {
		common.ServiceLogger.Error(err)
		return tree, errors.New("查询所有菜单信息失败")
	}

	// 生成菜单树
	tree = GenerateMenuTree(0, menuIds, menus)
	return tree, nil
}

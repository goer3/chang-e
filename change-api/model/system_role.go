package model

// 角色模型
type SystemRole struct {
	Base
	Name        string       `gorm:"uniqueIndex:uidx_name;comment:角色名称" json:"name"`
	Keyword     string       `gorm:"uniqueIndex:uidx_keyword;comment:角色关键字" json:"keyword"`
	Desc        string       `gorm:"comment:角色说明" json:"desc"`
	Status      *uint        `gorm:"type:tinyint(1);default:1;comment:状态(0: 禁用, 1: 正常)" json:"status"`
	SystemUsers []SystemUser `gorm:"foreignKey:SystemRoleId;comment:用户" json:"system_users"`
	SystemMenus []SystemMenu `gorm:"many2many:system_role_menu_relation" json:"system_menus"` // 多对多
}

// 表名称，可以自定义，也可以不声明使用系统自动创建
func (SystemRole) TableName() string {
	return "system_role"
}

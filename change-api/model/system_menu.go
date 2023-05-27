package model

// 菜单模型
type SystemMenu struct {
	Base
	Name        string       `gorm:"uniqueIndex:uidx_name;comment:菜单名称" json:"name"`
	Title       string       `gorm:"uniqueIndex:uidx_title;comment:英文名称" json:"title"`
	Icon        string       `gorm:"comment:icon" json:"icon"`
	Path        string       `gorm:"uniqueIndex:uidx_path;comment:访问路径" json:"path"`
	Status      *uint        `gorm:"type:tinyint(1);default:1;comment:状态(0: 禁用, 1: 正常)" json:"status"`
	ParentId    uint         `gorm:"comment:父菜单Id" json:"parent_id"`
	Children    []SystemMenu `gorm:"-" json:"children"`
	SystemRoles []SystemRole `gorm:"many2many:system_role_menu_relation" json:"system_roles"` // 多对多
}

// 表名称，可以自定义，也可以不声明使用系统自动创建
func (SystemMenu) TableName() string {
	return "system_menu"
}

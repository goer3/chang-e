package model

// 部门模型
type SystemDepartment struct {
	Base
	Name     string             `gorm:"uniqueIndex:uidx_name;comment:部门名称" json:"name"`
	ParentId uint               `gorm:"comment:父部门Id" json:"parent_id"`
	Children []SystemDepartment `gorm:"-" json:"children"`
}

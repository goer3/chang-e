package model

// 部门模型
type SystemDepartment struct {
	Base
	Name     string             `gorm:"uniqueIndex:uidx_name;comment:部门名称" json:"name"`
	ParentId uint               `gorm:"comment:父部门Id" json:"parent_id"`
	Children []SystemDepartment `gorm:"-" json:"children"`
}

// 表名称，可以自定义，也可以不声明使用系统自动创建
func (SystemDepartment) TableName() string {
	return "system_department"
}

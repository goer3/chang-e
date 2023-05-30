package model

// 接口模型
type SystemAPI struct {
	Base
	API      string      `gorm:"uniqueIndex:uidx_api;comment:接口URI" json:"api"`
	Name     string      `gorm:"uniqueIndex:uidx_name;comment:接口名称" json:"name"`
	ParentId uint        `gorm:"comment:父接口Id" json:"parent_id"`
	Children []SystemAPI `gorm:"-" json:"children"`
}

// 表名称，可以自定义，也可以不声明使用系统自动创建
func (SystemAPI) TableName() string {
	return "system_api"
}

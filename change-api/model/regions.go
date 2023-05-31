package model

// 城市模型
type Regions struct {
	Id       uint   `gorm:"primaryKey;comment:ID" json:"id"`
	ParentId uint   `gorm:"comment:父ID" json:"parent_id"`
	Name     string `gorm:"comment:省市区名称" json:"name"`
	Level    uint   `gorm:"comment:级别" json:"level"`
}

// 表名称，可以自定义，也可以不声明使用系统自动创建
func (Regions) TableName() string {
	return "regions"
}

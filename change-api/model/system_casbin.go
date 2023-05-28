package model

// 注意现在版本中 PType 在数据库中对应的字段是 ptype，很多文章或者代码是 p_type
// 使用 p_type 在初始化的时候会报错，原因在于他会再在数据库中加入 ptype 字段，导致多了字段，报 slice 错误
type SystemCasbinRuleTable struct {
	Id    uint   `gorm:"primaryKey;autoIncrement"`
	PType string `gorm:"size:100;uniqueIndex:uk_index;column:ptype;comment:策略类型"` // 多个字段联合唯一
	V0    string `gorm:"size:100;uniqueIndex:uk_index;comment:角色关键字"`
	V1    string `gorm:"size:100;uniqueIndex:uk_index;comment:资源名称"`
	V2    string `gorm:"size:100;uniqueIndex:uk_index;comment:请求类型"`
	V3    string `gorm:"size:100;uniqueIndex:uk_index"`
	V4    string `gorm:"size:100;uniqueIndex:uk_index"`
	V5    string `gorm:"size:100;uniqueIndex:uk_index"`
}

// 定义 CasbinRuleTable 表名
func (c *SystemCasbinRuleTable) TableName() string {
	return "system_casbin_rule"
}

// 这个模型用于 CasbinRuleTable 的字段对应，后续操作这个 model 就行了，字段更有意义
type SystemCasbinRule struct {
	PType   string `json:"ptype" gorm:"column:ptype" description:"策略类型"`
	Keyword string `json:"keyword" gorm:"column:v0" description:"角色关键字"`
	Path    string `json:"path" gorm:"column:v1" description:"API路径"`
	Method  string `json:"method" gorm:"column:v2" description:"访问方法"`
}

// 让它表名称和 CasbinRuleTable 一致，便于操作
func (c *SystemCasbinRule) TableName() string {
	return "system_casbin_rule"
}

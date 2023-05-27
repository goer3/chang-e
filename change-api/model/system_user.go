package model

import "github.com/golang-module/carbon/v2"

// 用户模型
type SystemUser struct {
	Base
	Username           string           `gorm:"uniqueIndex:uidx_username;comment:用户名" json:"username"`
	Password           string           `gorm:"not null;comment:密码" json:"password"`
	Name               string           `gorm:"not null;comment:姓名" json:"name"`
	Mobile             string           `gorm:"uniqueIndex:uidx_mobile;comment:手机号" json:"mobile"`
	Email              string           `gorm:"uniqueIndex:uidx_email;comment:邮箱" json:"email"`
	JobNumber          string           `gorm:"uniqueIndex:uidx_number;comment:工号" json:"job_number"`
	JobName            string           `gorm:"not null;comment:岗位名称" json:"job_name"`
	Avatar             string           `gorm:"comment:头像" json:"avatar"`
	Creator            string           `gorm:"default:system;comment:创建者" json:"creator"`
	LastLogin          carbon.DateTime  `gorm:"comment:最后一次登录时间" json:"last_login"`
	LastChangePassword carbon.DateTime  `gorm:"comment:最后一次修改密码时间" json:"last_change_password"`
	Active             *uint            `gorm:"type:tinyint(1);default:1;comment:状态(0: 禁用, 1: 正常)" json:"active"`
	Unlocked           *uint            `gorm:"type:tinyint(1);default:1;comment:状态(0: 锁定, 1: 正常)" json:"unlocked"`
	WrongTimes         uint             `gorm:"comment:密码错误次数" json:"wrong_times"`
	SystemDepartmentId uint             `gorm:"comment:部门Id" json:"system_department_id"`
	SystemDepartment   SystemDepartment `gorm:"foreignKey:SystemDepartmentId" json:"system_department"` // 外键
	SystemRoleId       uint             `gorm:"comment:角色Id" json:"system_role_id"`
	SystemRole         SystemRole       `gorm:"foreignKey:SystemRoleId" json:"system_role"` // 外键
}

// 表名称，可以自定义，也可以不声明使用系统自动创建
func (SystemUser) TableName() string {
	return "system_user"
}

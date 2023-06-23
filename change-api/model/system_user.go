package model

import "github.com/golang-module/carbon/v2"

// 用户模型
type SystemUser struct {
	Base
	Username           string           `gorm:"uniqueIndex:uidx_username;comment:用户名" json:"username"`
	Password           string           `gorm:"not null;comment:密码" json:"-"` // 响应的时候不显示
	Name               string           `gorm:"not null;comment:姓名" json:"name"`
	Mobile             string           `gorm:"uniqueIndex:uidx_mobile;comment:手机号" json:"mobile"`
	Email              string           `gorm:"uniqueIndex:uidx_email;comment:邮箱" json:"email"`
	JobNumber          string           `gorm:"uniqueIndex:uidx_number;comment:工号" json:"job_number"`
	JobName            string           `gorm:"not null;comment:岗位名称" json:"job_name"`
	Leader             *uint            `gorm:"type:tinyint(1);default:0;comment:是不是管理级(0: 否, 1: 是)" json:"leader"`
	OfficeProvinceId   uint             `gorm:"comment:工作省份ID" json:"office_province_id"`
	OfficeProvince     Regions          `gorm:"comment:工作省份信息;foreignKey:OfficeProvinceId" json:"office_province"`
	OfficeCityId       uint             `gorm:"comment:工作城市ID" json:"office_city_id"`
	OfficeCity         Regions          `gorm:"comment:工作城市信息;foreignKey:OfficeCityId" json:"office_city"`
	OfficeAddress      string           `gorm:"comment:办公地址" json:"office_address"`
	EntryTime          carbon.DateTime  `gorm:"comment:入职时间" json:"entry_time"`
	Birthday           carbon.DateTime  `gorm:"comment:生日" json:"birthday"`
	Gender             *uint            `gorm:"type:tinyint(1);default:1;comment:性别(1: 男, 2: 女, 3: 未知)" json:"gender"`
	NativeProvinceId   uint             `gorm:"comment:籍贯省ID" json:"native_province_id"`
	NativeProvince     Regions          `gorm:"comment:籍贯省信息;foreignKey:NativeProvinceId" json:"native_province"`
	NativeCityId       uint             `gorm:"comment:籍贯市ID" json:"native_city_id"`
	NativeCity         Regions          `gorm:"comment:籍贯市信息;foreignKey:NativeCityId" json:"native_city"`
	Avatar             string           `gorm:"comment:头像" json:"avatar"`
	Creator            string           `gorm:"default:system;comment:创建者" json:"creator"`
	FirstLogin         *uint            `gorm:"type:tinyint(1);default:1;comment:第一次登录(0: 否, 1: 是)" json:"first_login"`
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

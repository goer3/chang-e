package request

import (
	"change-api/dto/response"
	"github.com/golang-module/carbon/v2"
)

// 查询获取用户列表的参数（这些字段都是筛选条件）
type User struct {
	Username           string `json:"username" form:"username"`
	Name               string `json:"name" form:"name"`
	Mobile             string `json:"mobile" form:"mobile"`
	Email              string `json:"email" form:"email"`
	JobNumber          string `json:"job_number" form:"job_number"`
	JobName            string `json:"job_name" form:"job_name"`
	Creator            string `json:"creator" form:"creator"`
	Active             *uint  `json:"active" form:"active"`
	Unlocked           *uint  `json:"unlocked" form:"unlocked"`
	SystemDepartmentId uint   `json:"system_department_id" form:"system_department_id"`
	SystemRoleId       uint   `json:"system_role_id" form:"system_role_id"`
	response.Page
}

// 重置密码参数
type ResetPassword struct {
	Password   string `json:"password"`
	RePassword string `json:"re_password"`
}

// 普通用户修改用户信息
type UpdateUserInfoData struct {
	Mobile           string          `json:"mobile" form:"mobile"`
	Email            string          `json:"email" form:"email"`
	OfficeCityId     uint            `json:"office_city_id" form:"office_city_id"`
	OfficeAddress    string          `json:"office_address" form:"office_address"`
	Birthday         carbon.DateTime `json:"birthday" form:"birthday"`
	NativeProvinceId uint            `json:"native_province_id" form:"native_province_id"`
	NativeCityId     uint            `json:"native_city_id" form:"native_city_id"`
}

// 管理员用户修改用户信息
type AdminUpdateUserInfoData struct {
	UpdateUserInfoData
	Username           string          `json:"username" form:"username"`
	Name               string          `json:"name" form:"name"`
	JobNumber          string          `json:"job_number" form:"job_number"`
	JobName            string          `json:"job_name" form:"job_name"`
	EntryTime          carbon.DateTime `json:"entry_time" form:"entry_time"`
	SystemDepartmentId uint            `json:"system_department_id" form:"system_department_id"`
	SystemRoleId       uint            `json:"system_role_id" form:"system_role_id"`
}

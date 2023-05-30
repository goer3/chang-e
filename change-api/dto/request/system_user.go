package request

import "change-api/dto/response"

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

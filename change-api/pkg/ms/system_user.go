package ms

import (
	"change-api/common"
	"change-api/dto/request"
	"change-api/dto/response"
	"change-api/model"
	"strings"
)

// 查询用户列表
func FindUsers(req *request.User) (users []model.SystemUser, page response.Page) {
	DBT := common.DB.Preload("SystemDepartment").Preload("SystemRole", "status = ?", 1)

	// 判断查询条件
	// Username
	username := strings.TrimSpace(req.Username)
	if username != "" {
		DBT = DBT.Where("username LIKE ?", "%"+username+"%")
	}

	// Name
	name := strings.TrimSpace(req.Name)
	if name != "" {
		DBT = DBT.Where("name LIKE ?", "%"+name+"%")
	}

	// Mobile
	mobile := strings.TrimSpace(req.Mobile)
	if mobile != "" {
		DBT = DBT.Where("mobile LIKE ?", "%"+mobile+"%")
	}

	// Email
	email := strings.TrimSpace(req.Email)
	if email != "" {
		DBT = DBT.Where("email LIKE ?", "%"+email+"%")
	}

	// JobNumber
	jobNumber := strings.TrimSpace(req.JobNumber)
	if jobNumber != "" {
		DBT = DBT.Where("job_number LIKE ?", "%"+jobNumber+"%")
	}

	// JobName
	jobName := strings.TrimSpace(req.JobName)
	if jobName != "" {
		DBT = DBT.Where("job_name LIKE ?", "%"+jobName+"%")
	}

	// Creator
	creator := strings.TrimSpace(req.Creator)
	if creator != "" {
		DBT = DBT.Where("creator LIKE ?", "%"+creator+"%")
	}

	// Active
	if req.Active != nil {
		DBT = DBT.Where("active = ?", *req.Active)
	}

	// Unlocked
	if req.Unlocked != nil {
		DBT = DBT.Where("unlocked = ?", *req.Unlocked)
	}

	// SystemDepartmentId
	if req.SystemDepartmentId != 0 {
		DBT = DBT.Where("system_department_id = ?", req.SystemDepartmentId)
	}

	// SystemRoleId
	if req.SystemRoleId != 0 {
		DBT = DBT.Where("system_role_id = ?", req.SystemRoleId)
	}

	// 判断是否分页
	if !req.NoPagination {
		// 统计数量
		DBT.Find(&model.SystemUser{}).Count(&req.Page.TotalCount)
		limit, offset := req.GetLimit()
		DBT.Limit(limit).Offset(offset).Find(&users)
	} else {
		DBT.Find(&users)
		req.Page.TotalCount = int64(len(users))
	}

	return users, req.Page
}

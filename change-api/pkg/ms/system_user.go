package ms

import (
	"change-api/common"
	"change-api/dto/request"
	"change-api/dto/response"
	"change-api/model"
	"change-api/pkg/utils"
	"fmt"
	jwt "github.com/appleboy/gin-jwt/v2"
	"github.com/gin-gonic/gin"
	"github.com/golang-module/carbon/v2"
	"strings"
)

// 查询用户列表
func FindUsers(req *request.User) (users []model.SystemUser, page response.Page) {
	// 使用用户查询模板
	DBT := common.DB.Preload("SystemDepartment").
		Preload("SystemRole", "status = ?", 1).
		Preload("OfficeCity").
		Preload("NativeProvince").
		Preload("NativeCity")

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

// 通过用户名获取用户信息
func GetUserInfoByUsername(username string) {
	// 使用用户查询模板
	DBT := common.DB.Preload("SystemDepartment").
		Preload("SystemRole", "status = ?", 1).
		Preload("OfficeCity").
		Preload("NativeProvince").
		Preload("NativeCity")

	var user model.SystemUser

	err := DBT.Where("username = ?", username).First(&user).Error
	// 查询失败响应
	if err != nil {
		response.FailedWithMessage("查询用户信息失败")
		common.ServiceLogger.Error(err)
		return
	}

	// 查询成功响应
	response.SuccessWithData(map[string]interface{}{
		"user_info": user,
	})
}

// 通过用户名重置密码
func ResetPasswordByUsername(ctx *gin.Context, username string) {
	// 获取重置密码数据
	var req request.ResetPassword
	err := ctx.ShouldBind(&req)
	if err != nil {
		response.FailedWithMessage("未获取到用户提交的密码")
		return
	}

	// 获取参数错误或者两次密码不一致或者密码长度小于固定位数
	if (req.Password != req.RePassword) || (len(req.Password) < common.Conf.Login.MinPasswordLength) {
		response.FailedWithMessage(fmt.Sprintf("两次密码必须一致，且必须不少于%d位", common.Conf.Login.MinPasswordLength))
		return
	}

	// 查询数据库用户
	var user model.SystemUser
	err = common.DB.Where("username = ?", username).First(&user).Error
	if err != nil {
		response.FailedWithMessage("获取重置密码的用户信息失败")
		return
	}

	// 判断重置的用户，如果用户是超级管理员角色，则只能使用超级管理账户重置
	if user.SystemRoleId == 1 {
		// 获取当前用户名
		claims := jwt.ExtractClaims(ctx)
		u, _ := claims["identity"].(string)
		if u != common.Conf.Service.AdminUsername {
			response.FailedWithMessage("权限不足，重置管理员密码需要使用超级管理账户")
			return
		}
	}

	// 重置密码
	password := utils.CryptoPassword(req.Password)
	// 更新密码，最后一次修改密码时间
	err = common.DB.Model(&user).Updates(model.SystemUser{
		Password:           password,
		LastChangePassword: carbon.DateTime{carbon.Now()},
	}).Error
	if err != nil {
		response.FailedWithMessage("重置密码失败")
		return
	}

	// 成功，清理 Redis
	response.SuccessWithMessage("密码修改成功")
}

// 通过用户名更新用户信息
func UpdateUserInfoByUsername(ctx *gin.Context, username string) {
	// 获取当前角色 ID
	claims := jwt.ExtractClaims(ctx)
	rid, _ := claims["roleId"].(float64)
	roleId := uint(rid)

	// 查询更新的用户信息
	var user model.SystemUser
	err := common.DB.Where("username = ?", username).First(&user).Error
	if err != nil {
		response.FailedWithMessage("查询用户信息失败")
		return
	}

	// 超级管理员则获取其它
	if roleId == 1 {
		var req request.AdminUpdateUserInfoData
		err = ctx.ShouldBind(&req)
		if err != nil {
			common.ServiceLogger.Error(err)
			response.FailedWithCode(response.ParamError)
			return
		}
		err = common.DB.Model(&user).Updates(req).Error
	} else {
		var req request.UpdateUserInfoData
		err = ctx.ShouldBind(&req)
		if err != nil {
			common.ServiceLogger.Error(err)
			response.FailedWithCode(response.ParamError)
			return
		}
		err = common.DB.Model(&user).Updates(req).Error
	}

	// 错误处理
	if err != nil {
		common.ServiceLogger.Error(err)
		response.FailedWithMessage("用户信息更新失败")
		return
	}

	// 成功响应
	response.Success()
}

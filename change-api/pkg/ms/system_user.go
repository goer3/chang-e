package ms

import (
	"change-api/common"
	"change-api/dto/request"
	"change-api/dto/response"
	"change-api/model"
	"change-api/pkg/gedis"
	"change-api/pkg/utils"
	"errors"
	"fmt"
	"strings"
	"unicode/utf8"

	"github.com/gin-gonic/gin"
	"github.com/golang-module/carbon/v2"
)

// 查询用户列表，返回用户列表和最新的分页信息（主要是符合条件的用户数量）
func FindUsers(req *request.User) (users []model.SystemUser, page response.Page) {
	// 使用用户查询模板
	DBT := common.DB.Preload("SystemDepartment").
		Preload("SystemRole", "status = ?", 1).
		Preload("OfficeCity").
		Preload("NativeProvince").
		Preload("NativeCity")

	// 判断查询条件
	// Username
	if username := strings.TrimSpace(req.Username); username != "" {
		DBT = DBT.Where("username LIKE ?", "%"+username+"%")
	}

	// Name
	if name := strings.TrimSpace(req.Name); name != "" {
		DBT = DBT.Where("name LIKE ?", "%"+name+"%")
	}

	// Mobile
	if mobile := strings.TrimSpace(req.Mobile); mobile != "" {
		DBT = DBT.Where("mobile LIKE ?", "%"+mobile+"%")
	}

	// Email
	if email := strings.TrimSpace(req.Email); email != "" {
		DBT = DBT.Where("email LIKE ?", "%"+email+"%")
	}

	// JobNumber
	if jobNumber := strings.TrimSpace(req.JobNumber); jobNumber != "" {
		DBT = DBT.Where("job_number LIKE ?", "%"+jobNumber+"%")
	}

	// JobName
	if jobName := strings.TrimSpace(req.JobName); jobName != "" {
		DBT = DBT.Where("job_name LIKE ?", "%"+jobName+"%")
	}

	// Creator
	if creator := strings.TrimSpace(req.Creator); creator != "" {
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

	// 如果需要分页
	if !req.NoPagination {
		// 统计最新的用户数量
		DBT.Find(&model.SystemUser{}).Count(&req.Page.TotalCount)
		// 根据传递过来的页码计算偏移量和单页限制
		limit, offset := req.GetLimit()
		// 根据偏移量和限制查询数据
		DBT.Limit(limit).Offset(offset).Find(&users)
	} else {
		// 查询符合条件的用户，并获取切片长度，也就是用户数量
		DBT.Find(&users)
		req.Page.TotalCount = int64(len(users))
	}

	return users, req.Page
}

// 通过用户名获取用户信息
func GetUserInfoByUsername(username string) (user model.SystemUser, err error) {
	// 使用用户查询模板
	DBT := common.DB.Preload("SystemDepartment").
		Preload("SystemRole", "status = ?", 1).
		Preload("OfficeCity").
		Preload("NativeProvince").
		Preload("NativeCity")

	// 查询用户信息
	err = DBT.Where("username = ?", username).First(&user).Error
	return
}

// 通过用户名重置密码
func ResetPasswordByUsername(ctx *gin.Context, username string) (err error) {
	// 获取重置密码数据
	var req request.ResetPassword
	err = ctx.ShouldBind(&req)
	if err != nil {
		common.ServiceLogger.Error(err)
		return errors.New("获取重置密码表单数据失败")
	}

	// 获取参数错误或者两次密码不一致或者密码长度小于固定位数
	if (req.Password != req.RePassword) || (len(req.Password) < common.Conf.Login.MinPasswordLength) {
		return fmt.Errorf("两次密码必须一致，且必须不少于%d位", common.Conf.Login.MinPasswordLength)
	}

	// 查询数据库中需要修改的用户
	var user model.SystemUser
	err = common.DB.Where("username = ?", username).First(&user).Error
	if err != nil {
		common.ServiceLogger.Error(err)
		return errors.New("查询重置密码的用户信息失败")
	}

	// 超级管理员角色的密码只能自己或者默认超级管理员用户重置
	if user.SystemRoleId == 1 {
		// 获取当前用户用户名
		cusername, err1 := utils.GetUsernameFromContext(ctx)
		if err1 != nil {
			return err1
		}

		// 如果不是修改自己或者修改用户是默认超级管理员管理员
		if cusername != user.Username || cusername != common.Conf.Service.AdminUsername {
			return errors.New("权限不足，重置管理员密码需要使用超级管理账户")
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
		common.ServiceLogger.Error(err)
		return errors.New("密码重置失败，请通过系统日志进行排查")
	}

	// 清理 Redis
	key := fmt.Sprintf("%s%s%s", common.RedisKeyPrefix.Token, common.RedisKeyPrefixTag, username)
	cache := gedis.NewStringOperation()
	_, _ = cache.Del(key)

	// 成功
	return nil
}

// 通过用户名更新用户信息
func UpdateUserInfoByUsername(ctx *gin.Context, username string) {
	// 获取当前角色 ID 和用户名
	roleId, _ := utils.GetRoleIdFromContext(ctx)
	cusername, _ := utils.GetUsernameFromContext(ctx)

	// 查询更新的用户信息
	var user model.SystemUser
	err := common.DB.Where("username = ?", username).First(&user).Error
	if err != nil {
		response.FailedWithMessage("查询用户信息失败")
		return
	}

	// 如果被更新的用户是超级管理员，则只能默认超级管理员能更新
	if (user.SystemRoleId == 1) && (cusername != username) && (cusername != common.Conf.Service.AdminUsername) {
		response.FailedWithMessage("权限不足，除了默认超级管理员之外，管理员只能更新自己和普通用户的信息")
		return
	}

	// 更新数据信息
	var req request.AdminUpdateUserParam

	// 如果执行更新的是超级管理员，则可以更新更多字段
	if roleId == 1 {
		err = ctx.ShouldBind(&req)
		//
	} else {
		var req1 request.UpdateUserParam
		err = ctx.ShouldBind(&req1)
		req.UpdateUserParam = req1
	}

	// 错误处理
	if err != nil {
		response.FailedWithMessageAndErrorLog("获取更新数据失败", err)
		return
	}

	// 验证名字合法性，非空，字符长度必须大于 1
	if req.Name != "" && utf8.RuneCountInString(strings.TrimSpace(req.Name)) > 1 {
		req.Name = strings.TrimSpace(req.Name)
	} else {
		req.Name = ""
	}

	// 验证手机合法性，非空，满足手机格式
	if req.Mobile != "" && utils.RegExpString(utils.MobileRegExp, strings.TrimSpace(req.Mobile)) {
		req.Mobile = strings.TrimSpace(req.Mobile)
	} else {
		req.Mobile = ""
	}

	// 验证邮箱合法性，非空，满足邮箱格式
	if req.Email != "" && utils.RegExpString(utils.EmailRegExp, strings.TrimSpace(req.Email)) {
		req.Email = strings.TrimSpace(req.Email)
	} else {
		req.Email = ""
	}

	// 更新数据
	err = common.DB.Model(&user).Updates(req).Error

	// 错误处理
	if err != nil {
		response.FailedWithMessageAndErrorLog("用户信息更新失败", err)
		return
	}

	// 成功响应
	response.Success()
}

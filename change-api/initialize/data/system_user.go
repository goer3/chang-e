package data

import (
	"change-api/common"
	"change-api/model"
	"errors"
	"gorm.io/gorm"
)

// 用户数据
var users = []model.SystemUser{
	{
		Base: model.Base{
			Id: 1,
		},
		Username:           "admin",
		Password:           password,
		Name:               "超管",
		Mobile:             "18888888888",
		Email:              "admin@ezops.cn",
		SystemDepartmentId: 1,
		JobNumber:          "EZ000001",
		JobName:            "高级运维工程师",
		Avatar:             "http://img.keaiming.com/uploads/allimg/2016102112/fjn4kxnmrzh.jpg",
		SystemRoleId:       1,
	},
	{
		Base: model.Base{
			Id: 2,
		},
		Username:           "guest",
		Password:           password,
		Name:               "游客",
		Mobile:             "19999999999",
		Email:              "guest@ezops.cn",
		SystemDepartmentId: 103,
		JobNumber:          "EZ000002",
		JobName:            "运维工程师",
		Avatar:             "http://img.keaiming.com/uploads/allimg/2016102112/caxuymb1ev2.jpg",
		SystemRoleId:       2,
	},
}

// 初始化用户数据
func SystemUserData() {
	var user model.SystemUser
	for _, item := range users {
		// 查看数据是否存在，如果不存在才执行创建
		err := common.DB.Where("id = ? or username = ? or mobile = ? or email = ? or job_number = ? ",
			item.Id,
			item.Username,
			item.Mobile,
			item.Email,
			item.JobNumber).First(&user).Error
		if errors.Is(err, gorm.ErrRecordNotFound) {
			common.DB.Create(&item)
		}
	}
}

package data

import (
	"change-api/common"
	"change-api/model"
	"errors"
	"github.com/golang-module/carbon/v2"
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
		OfficeCityId:       440300000000,
		OfficeAddress:      "广东省深圳市福田区研发中心",
		EntryTime: carbon.DateTime{
			carbon.Parse("2023-01-11"),
		},
		Birthday: carbon.DateTime{
			carbon.Parse("1993-02-11"),
		},
		NativeProvinceId: 510000000000,
		NativeCityId:     510500000000,
		Avatar:           "http://img.keaiming.com/uploads/allimg/2016102112/fjn4kxnmrzh.jpg",
		SystemRoleId:     1,
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
		SystemDepartmentId: 10000,
		JobNumber:          "EZ000002",
		JobName:            "运维工程师",
		OfficeCityId:       440300000000,
		OfficeAddress:      "广东省深圳市福田区研发中心",
		EntryTime: carbon.DateTime{
			carbon.Parse("2022-03-11"),
		},
		Birthday: carbon.DateTime{
			carbon.Parse("1994-04-11"),
		},
		NativeProvinceId: 510000000000,
		NativeCityId:     511500000000,
		Avatar:           "http://img.keaiming.com/uploads/allimg/2016102112/caxuymb1ev2.jpg",
		SystemRoleId:     2,
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

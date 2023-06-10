package data

import (
	"change-api/common"
	"change-api/model"
	"errors"
	"github.com/golang-module/carbon/v2"
	"gorm.io/gorm"
)

// 初始化用户数据
func SystemUserData() {
	var (
		isLeader uint = 1
		male     uint = 1
		female   uint = 2
		// unknown  uint = 3
	)

	// 用户数据
	var users = []model.SystemUser{
		{
			Base: model.Base{
				Id: 1,
			},
			Username:           common.Conf.User.AdminUsername,
			Password:           password,
			Name:               "超管",
			Mobile:             "18888888888",
			Email:              "admin@ezops.cn",
			SystemDepartmentId: 1,
			JobNumber:          "EZ000001",
			JobName:            "超管",
			Leader:             &isLeader,
			OfficeCityId:       440300000000,
			OfficeAddress:      "广东省深圳市福田区研发中心",
			EntryTime: carbon.DateTime{
				Carbon: carbon.Now(),
			},
			Birthday: carbon.DateTime{
				Carbon: carbon.Now(),
			},
			Gender:           &male,
			NativeProvinceId: 510000000000,
			NativeCityId:     510500000000,
			Avatar:           common.Conf.User.DefaultAvatar,
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
			JobName:            "访客",
			OfficeCityId:       440300000000,
			OfficeAddress:      "广东省深圳市福田区研发中心",
			EntryTime: carbon.DateTime{
				//carbon.Parse("2022-03-11"),
				Carbon: carbon.Now(),
			},
			Birthday: carbon.DateTime{
				Carbon: carbon.Now(),
			},
			Gender:           &female,
			NativeProvinceId: 510000000000,
			NativeCityId:     511500000000,
			Avatar:           common.Conf.User.DefaultAvatar,
			SystemRoleId:     2,
		},
	}

	// 数据初始化
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

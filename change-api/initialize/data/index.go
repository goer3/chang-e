package data

import (
	"change-api/common"
	"change-api/pkg/utils"
)

var (
	// 系统初始密码
	password = utils.CryptoPassword(common.Conf.User.DefaultPassword)
)

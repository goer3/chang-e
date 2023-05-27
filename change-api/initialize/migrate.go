package initialize

import (
	"change-api/common"
	"change-api/model"
	"change-api/pkg/log2"
	"os"
)

// 初始化同步表结构
func Migrate() {
	err := common.DB.AutoMigrate(
		new(model.SystemDepartment),
	)
	if err != nil {
		log2.SYSTEM("数据表初始同步失败：", err.Error())
		panic(err)
	}
	log2.SYSTEM("数据表初始同步完成！")
	os.Exit(0)
}

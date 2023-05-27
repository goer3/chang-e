package initialize

import (
	"change-api/initialize/data"
	"change-api/pkg/log2"
	"log"
	"os"
)

// 初始化基础数据
func Data() {
	log2.SYSTEM("开始基础数据初始化...")
	data.SystemDepartmentData() // 初始化部门数据
	log.Println("基础数据初始化完成！")
	os.Exit(0)
}

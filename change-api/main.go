package main

import (
	"change-api/common"
	"change-api/helper"
	"change-api/initialize"
	"embed"
	"fmt"
	"os"
)

//go:embed config/*
var fs embed.FS // embed 打包配置文件，固定的注释格式，表示读取 config/ 下面所有文件

func main() {
	// 运行参数校验
	helper.ArgsCheck(os.Args)

	// 初始化配置文件
	initialize.Config(fs, common.RunEnv, common.ExternalConfigFile)

	fmt.Println(common.Conf.Service.Name)
}

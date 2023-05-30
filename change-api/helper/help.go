package helper

import (
	"fmt"
	"os"
)

// 打印帮助方法
func Help() {
	info := `
使用方法：
  change [参数1] [参数2...]

参数说明：
  help				查看帮助信息
  migrate			同步数据结构
  init				初始化用户数据
  run [env]			指定运行环境
  -f, config [配置文件名称]	指定配置用户自己的配置文件
`
	fmt.Println(info)
	os.Exit(0)
}

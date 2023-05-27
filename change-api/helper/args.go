package helper

import (
	"change-api/common"
	"change-api/pkg/log2"
	"fmt"
	"os"
)

// 项目标题
var title = `

 ▄████▄   ██░ ██  ▄▄▄       ███▄    █   ▄████ ▓█████ 
▒██▀ ▀█  ▓██░ ██▒▒████▄     ██ ▀█   █  ██▒ ▀█▒▓█   ▀ 
▒▓█    ▄ ▒██▀▀██░▒██  ▀█▄  ▓██  ▀█ ██▒▒██░▄▄▄░▒███   
▒▓▓▄ ▄██▒░▓█ ░██ ░██▄▄▄▄██ ▓██▒  ▐▌██▒░▓█  ██▓▒▓█  ▄ 
▒ ▓███▀ ░░▓█▒░██▓ ▓█   ▓██▒▒██░   ▓██░░▒▓███▀▒░▒████▒
░ ░▒ ▒  ░ ▒ ░░▒░▒ ▒▒   ▓▒█░░ ▒░   ▒ ▒  ░▒   ▒ ░░ ▒░ ░
  ░  ▒    ▒ ░▒░ ░  ▒   ▒▒ ░░ ░░   ░ ▒░  ░   ░  ░ ░  ░
░         ░  ░░ ░  ░   ▒      ░   ░ ░ ░ ░   ░    ░   
░ ░       ░  ░  ░      ░  ░         ░       ░    ░  ░
░                                                    

`

// 检测用户传参，根据参数修改系统默认配置
func ArgsCheck(args []string) {
	// 打印标题
	fmt.Println(title)

	// 判断参数
	switch len(args) {
	case 1:
		// 没有任何参数，则默认直接运行
		log2.SYSTEM("没设置任何启动参数， 将使用默认参数运行程序...")
		return
	case 2:
		// 同步表
		if os.Args[1] == "migrate" {
			common.RunCommand = "migrate"
			return
		}
		// 初始化数据
		if os.Args[1] == "init" {
			common.RunCommand = "init"
			return
		}
	case 3:
		// 使用自带的配置运行
		if os.Args[1] == "run" {
			common.RunEnv = os.Args[2]
			return
		}

		// 使用用户的配置文件运行
		if os.Args[1] == "-f" || os.Args[1] == "config" {
			common.ExternalConfigFile = os.Args[2]
			return
		}
	}
	Help()
}

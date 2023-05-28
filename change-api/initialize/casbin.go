package initialize

import (
	"change-api/common"
	"change-api/pkg/log2"
	"embed"
	"fmt"
	"github.com/casbin/casbin/v2"
	casbinmodel "github.com/casbin/casbin/v2/model"
	gormadapter "github.com/casbin/gorm-adapter/v3"
)

// 初始化 Casbin
func Casbin(fs embed.FS) {
	// 初始化数据库适配器
	adapter, err := gormadapter.NewAdapterByDB(common.DB)
	if err != nil {
		log2.SYSTEM("Casbin适配器初始失败：", err.Error())
		panic(err)
	}

	// 获取 rbac.conf 配置内容
	filename := fmt.Sprintf("%s/%s", common.ConfigFilePath, "rbac.conf")
	bs, err := fs.ReadFile(filename)
	if err != nil {
		log2.SYSTEM("Casbin配置读取失败：", err.Error())
		panic(err)
	}
	config := string(bs[:])

	// 从字符串中加载配置
	m, err := casbinmodel.NewModelFromString(config)
	if err != nil {
		log2.SYSTEM("Casbin配置加载失败：", err.Error())
		panic(err)
	}

	// 读取配置文件
	enforcer, err := casbin.NewEnforcer(m, adapter)
	if err != nil {
		log2.SYSTEM("Casbin Enforcer创建失败：", err.Error())
		panic(err)
	}

	// 加载策略
	err = enforcer.LoadPolicy()
	if err != nil {
		log2.SYSTEM("Casbin策略加载失败：", err.Error())
		panic(err)
	}

	// 配置全局
	common.CasbinEnforcer = enforcer
	log2.SYSTEM("Casbin权限初始完成！")
}

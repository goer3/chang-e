package initialize

import (
	"bytes"
	"change-api/common"
	"change-api/pkg/log2"
	"embed"
	"fmt"
	"github.com/spf13/viper"
	"os"
)

// 配置文件进过 Embed 打包后，为了更方便使用，对其进行简单的封装
type ConfigBox struct {
	FS   embed.FS // 读取多个文件的方式
	Path string   // 文件路径，用于多文件配置的时候，拼接获取完整路径
}

// 配置文件初始化
// fs：Embed 打包的静态文件对象
// runEnv：运行的环境，用于有指定时就没用了
// extFile：用户指定的外部配置文件，可能不指定，则使用系统自带的
func Config(fs embed.FS, runEnv string, extFile string) {
	// 用户运行的配置文件名称
	filename := fmt.Sprintf("%s/%s.%s.%s", common.ConfigFilePath, common.ConfigFilePrefix, runEnv, common.ConfigFileType)

	// 创建 Viper 对应，用于从打包中读取配置
	v := viper.New()

	// 设置配置文件类型
	v.SetConfigType(common.ConfigFileType)

	// 配置数据
	var bs []byte
	var err error

	// 如果用户指定了额外的配置文件，则使用用户定义的配置，否则使用打包的
	if extFile != "" {
		// 覆盖默认文件名称
		filename = extFile
		// 读取用户指定的配置文件
		bs, err = os.ReadFile(filename)
	} else {

		// 读取打包的配置文件
		bs, err = fs.ReadFile(filename)
	}

	// 错误处理
	if err != nil {
		log2.ERROR("读取配置文件失败：", err.Error())
		panic(err.Error())
	}

	// 没有数据也是读取配置失败
	if len(bs) == 0 {
		log2.ERROR("没有读取到配置文件内容！")
		panic(err.Error())
	}

	// Viper 解析配置
	err = v.ReadConfig(bytes.NewReader(bs))
	if err != nil {
		log2.ERROR("Viper解析配置文件失败：", err.Error())
		panic(err.Error())
	}

	// 保存配置到内存中
	settings := v.AllSettings()
	for idx, setting := range settings {
		v.Set(idx, setting)
	}

	// 将配置赋值给全局变量，方便其它地方调用
	err = v.Unmarshal(&common.Conf)
	if err != nil {
		log2.ERROR("配置全局配置失败：", err.Error())
		panic(err.Error())
	}

	// 打印配置初始化完成
	log2.SYSTEM("配置文件初始化完成：", filename)
}

package common

import (
	"github.com/redis/go-redis/v9"
	"go.uber.org/zap"
	"gorm.io/gorm"
)

// 提供给全局直接使用的变量
var (
	Conf          Configuration      // 配置文件类型
	DB            *gorm.DB           // 数据库连接
	Cache         *redis.Client      // Redis 连接
	ServiceLogger *zap.SugaredLogger // 服务日志
	SQLLogger     *zap.SugaredLogger // 服务日志
)

// 默认配置文件相关信息
var (
	ConfigFilePath     = "config"      // 配置文件目录
	ConfigFilePrefix   = "application" // 配置文件前缀
	ConfigFileType     = "yaml"        // 配置文件类型
	RunEnv             = "dev"         // 默认运行环境
	RunCommand         = ""            // 默认运行命令
	ExternalConfigFile = ""            // 外部配置文件
)

// 时间格式化
const (
	MsecLocalTimeFormat = "2006-01-02 15:04:05.000"
	SecLocalTimeFormat  = "2006-01-02 15:04:05"
	DateLocalTimeFormat = "2006-01-02"
)

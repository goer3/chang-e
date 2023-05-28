package common

import "go.uber.org/zap/zapcore"

// 配置解析结构体
type Configuration struct {
	Service ServiceConfiguration `mapstructure:"service" json:"service"`
	MySQL   MySQLConfiguration   `mapstructure:"mysql" json:"mysql"`
	Redis   RedisConfiguration   `mapstructure:"redis" json:"redis"`
	Log     LogConfiguration     `mapstructure:"log" json:"log"`
	JWT     JWTConfiguration     `mapstructure:"jwt" json:"jwt"`
	Login   LoginConfiguration   `mapstructure:"login" json:"login"`
	Swagger SwaggerConfiguration `mapstructure:"swagger" json:"swagger"`
}

// 服务配置解析结构体
type ServiceConfiguration struct {
	Name      string `mapstructure:"name" json:"name"`
	Listen    string `mapstructure:"listen" json:"listen"`
	Port      int    `mapstructure:"port" json:"port"`
	Mode      string `mapstructure:"mode" json:"mode"`
	ApiPrefix string `mapstructure:"api-prefix" json:"api_prefix"`
}

// 数据库连接配置解析结构体
type MySQLConfiguration struct {
	Host          string `mapstructure:"host" json:"host"`
	Port          int    `mapstructure:"port" json:"port"`
	Database      string `mapstructure:"database" json:"database"`
	Username      string `mapstructure:"username" json:"username"`
	Password      string `mapstructure:"password" json:"password"`
	Charset       string `mapstructure:"charset" json:"charset"`
	Collation     string `mapstructure:"collation" json:"collation"`
	Timeout       int    `mapstructure:"timeout" json:"timeout"`
	ExtQuery      string `mapstructure:"ext-query" json:"ext_query"`
	MaxIdleConns  int    `mapstructure:"max-idle-conns" json:"max_idle_conns"`
	MaxOpenConns  int    `mapstructure:"max-open-conns" json:"max_open_conns"`
	MaxIdleTime   int    `mapstructure:"max-idle-time" json:"max_idle_time"`
	SlowThreshold int    `mapstructure:"slow-threshold" json:"slow_threshold"`
}

// Redis 连接配置解析结构体
type RedisConfiguration struct {
	Host     string `mapstructure:"host" json:"host"`
	Port     int    `mapstructure:"port" json:"port"`
	DB       int    `mapstructure:"db" json:"db"`
	Password string `mapstructure:"password" json:"password"`
}

// 日志配置解析结构体
type LogConfiguration struct {
	Enable       bool          `mapstructure:"enable" json:"enable"`
	Path         string        `mapstructure:"path" json:"path"`
	Level        zapcore.Level `mapstructure:"level" json:"level"`
	Color        bool          `mapstructure:"color" json:"color"`
	MaxSize      int           `mapstructure:"max-size" json:"max_size"`
	MaxBackups   int           `mapstructure:"max-backups" json:"max_backups"`
	MaxAge       int           `mapstructure:"max-age" json:"max_age"`
	Compress     bool          `mapstructure:"compress" json:"compress"`
	SQLLogEnable bool          `mapstructure:"sql-log-enable" json:"sql_log_enable"`
	SQLLogLevel  int           `mapstructure:"sql-log-level" json:"sql_log_level"`
}

// JWT 配置解析结构体
type JWTConfiguration struct {
	Realm   string `mapstructure:"realm" json:"realm"`
	Key     string `mapstructure:"key" json:"key"`
	Timeout uint   `mapstructure:"timeout" json:"timeout"`
}

// 登录限制配置解析结构体
type LoginConfiguration struct {
	AllowWrongTimes      uint  `mapstructure:"allow-wrong-times" json:"allow_wrong_times"`
	AllowMaxWrongTimes   uint  `mapstructure:"allow-max-wrong-times" json:"allow_max_wrong_times"`
	MaxWrongWaitTime     int64 `mapstructure:"max-wrong-wait-time" json:"max_wrong_wait_time"`
	AllowMultipleDevices bool  `mapstructure:"allow-multiple-devices" json:"allow_multiple_devices"`
}

// Swagger 配置解析结构体
type SwaggerConfiguration struct {
	Enable      bool     `mapstructure:"enable" json:"enable"`
	Title       string   `mapstructure:"title" json:"title"`
	Description string   `mapstructure:"description" json:"description"`
	Version     string   `mapstructure:"version" json:"version"`
	Listen      string   `mapstructure:"listen" json:"listen"`
	Schemes     []string `mapstructure:"schemes" json:"schemes"`
}

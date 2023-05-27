package common

// 配置解析结构体
type Configuration struct {
	Service ServiceConfiguration `mapstructure:"service" json:"service"`
	MySQL   MySQLConfiguration   `mapstructure:"mysql" json:"mysql"`
	Redis   RedisConfiguration   `mapstructure:"redis" json:"redis"`
	Log     LogConfiguration     `mapstructure:"log" json:"log"`
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
	TablePrefix   string `mapstructure:"table-prefix" json:"table_prefix"`
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
	Enable bool   `mapstructure:"enable" json:"enable"`
	Path   string `mapstructure:"path" json:"path"`
}

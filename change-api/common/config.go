package common

// 配置解析结构体
type Configuration struct {
	Service ServiceConfiguration `mapstructure:"service" json:"service"`
}

// 服务配置解析结构体
type ServiceConfiguration struct {
	Name      string `mapstructure:"name" json:"name"`
	Listen    string `mapstructure:"listen" json:"listen"`
	Port      int    `mapstructure:"port" json:"port"`
	Mode      string `mapstructure:"mode" json:"mode"`
	ApiPrefix string `mapstructure:"api-prefix" json:"api_prefix"`
}

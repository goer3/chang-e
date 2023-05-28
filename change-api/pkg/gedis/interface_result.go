package gedis

import "change-api/common"

// Interface 类型响应格式
type InterfaceResult struct {
	Result interface{}
	Error  error
}

// Interface 类型响应构造函数
func NewInterfaceResult(result interface{}, error error) *InterfaceResult {
	return &InterfaceResult{Result: result, Error: error}
}

// 解析 Interface 类型响应
func (i *InterfaceResult) Unwrap() interface{} {
	if i.Error != nil {
		common.ServiceLogger.Debug("获取缓存失败：", i.Error.Error())
	}
	return i.Result
}

// 解析 Interface 类型响应，如果不存在则返回默认值
func (i *InterfaceResult) UnwrapWithDefault(v interface{}) interface{} {
	if i.Error != nil {
		common.ServiceLogger.Debug("获取缓存失败，将返回默认值：", i.Error.Error())
		return v
	}
	return i.Result
}

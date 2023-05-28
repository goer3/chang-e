package gedis

import "change-api/common"

// 字符串类型响应
type StringResult struct {
	Result string
	Error  error
}

// 字符串类型响应构造函数
func NewStringResult(result string, error error) *StringResult {
	return &StringResult{Result: result, Error: error}
}

// 解析返回结果
func (s *StringResult) Unwrap() string {
	if s.Error != nil {
		common.ServiceLogger.Debug("获取缓存失败：", s.Error.Error())
	}
	return s.Result
}

// 解析返回结果，如果获取缓存失败，则返回默认值
func (s *StringResult) UnwrapWithDefault(v string) string {
	if s.Error != nil {
		common.ServiceLogger.Debug("获取缓存失败，将返回默认值：", s.Error.Error())
		return v
	}
	return s.Result
}

// 解析返回结果，如果获取缓存失败，则执行函数
func (s *StringResult) UnwrapWithFunc(f func() string) string {
	if s.Error != nil {
		common.ServiceLogger.Debug("获取缓存失败，将执行指定方法：", s.Error.Error())
		return f()
	}
	return s.Result
}

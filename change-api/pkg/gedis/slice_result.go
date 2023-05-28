package gedis

import "change-api/common"

// Slice 类型返回
type SliceResult struct {
	Result []interface{}
	Error  error
}

// Slice 类型返回构造函数
func NewSliceResult(result []interface{}, error error) *SliceResult {
	return &SliceResult{Result: result, Error: error}
}

// 解析返回结果
func (s *SliceResult) Unwrap() []interface{} {
	if s.Error != nil {
		common.ServiceLogger.Debug("获取缓存失败：", s.Error.Error())
	}
	return s.Result
}

// 解析返回结果，不存在返回默认值
func (s *SliceResult) UnwrapWithDefault(v []interface{}) []interface{} {
	if s.Error != nil {
		common.ServiceLogger.Debug("获取缓存失败，将返回默认值：", s.Error.Error())
		return v
	}
	return s.Result
}

// Iter 迭代方法，用法：
//
//	func demo() {
//		var conn = NewStringOperation()
//		var res = conn.Mget("name", "age", "gender").Iter()
//		for res.HasNext() {
//			fmt.Println(res.Next())
//		}
//	}
func (this *SliceResult) Iter() *Iterator {
	return NewIterator(this.Result)
}

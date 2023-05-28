package gedis

import (
	"change-api/common"
	"context"
	"github.com/redis/go-redis/v9"
	"time"
)

// 字符串操作
type StringOperation struct {
	Redis *redis.Client
	Ctx   context.Context
}

// 字符串操作构造函数
func NewStringOperation() *StringOperation {
	return &StringOperation{Redis: common.Cache, Ctx: context.Background()}
}

// 设置字符串的 K/V，用法：
// gedis.Set("key", "value", gedis.WithExpire(time.Second * 10), gedis.WithNX())
func (s *StringOperation) Set(key string, value interface{}, attrs ...*OperationAttr) *InterfaceResult {
	// 获取参数列表，生成指定类型
	oas := OperationAttrs(attrs)

	// 解析传入参数，判断是否设置超时时间，如果没有，就设置超时时间为 0，永不过期
	expr := oas.Find("expr").UnwrapWithDefault(time.Second * 0).(time.Duration)

	// 判断是否有 nx 锁
	nx := oas.Find("nx").UnwrapWithDefault(nil)
	if nx != nil {
		return NewInterfaceResult(s.Redis.SetNX(s.Ctx, key, value, expr).Result())
	}

	// 判断是否有 xx 锁，两种锁只能使用一种
	xx := oas.Find("xx").UnwrapWithDefault(nil)
	if xx != nil {
		return NewInterfaceResult(s.Redis.SetXX(s.Ctx, key, value, expr).Result())
	}

	// 如果没设置锁，则使用默认配置
	return NewInterfaceResult(s.Redis.Set(s.Ctx, key, value, expr).Result())
}

// 获取单个值
func (s *StringOperation) Get(key string) *StringResult {
	return NewStringResult(s.Redis.Get(s.Ctx, key).Result())
}

// 获取结构体
func (s *StringOperation) Scan(key string, val interface{}) error {
	return s.Redis.Get(s.Ctx, key).Scan(val)
}

// 获取多个值
func (s *StringOperation) MGet(keys ...string) *SliceResult {
	return NewSliceResult(s.Redis.MGet(s.Ctx, keys...).Result())
}

// 删除单个值
func (s *StringOperation) Del(keys ...string) (result int64, err error) {
	result, err = s.Redis.Del(s.Ctx, keys...).Result()
	return
}

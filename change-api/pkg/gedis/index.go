package gedis

import (
	"fmt"
	"time"
)

// 数据操作参数
type OperationAttr struct {
	Name  string
	Value interface{}
}

// 数据操作参数构造函数
func NewOperationAttr(name string, value interface{}) *OperationAttr {
	return &OperationAttr{Name: name, Value: value}
}

// 设置多个参数的类型
type OperationAttrs []*OperationAttr

// 查找参数
func (o OperationAttrs) Find(name string) *InterfaceResult {
	for _, attr := range o {
		if attr.Name == name {
			return NewInterfaceResult(attr.Value, nil)
		}
	}
	return NewInterfaceResult(nil, fmt.Errorf("参数不存在：%s", name))
}

// 设置过期时间的方法
func WithExpire(t time.Duration) *OperationAttr {
	return &OperationAttr{
		Name:  "expr",
		Value: t,
	}
}

// 设置 NX 锁，当 key 不存在时才能设置 K/V
func WithNX() *OperationAttr {
	return &OperationAttr{
		Name:  "nx",
		Value: struct{}{},
	}
}

// 设置 XX 锁，当 key 存在时才能设置 K/V
func WithXX() *OperationAttr {
	return &OperationAttr{
		Name:  "xx",
		Value: struct{}{},
	}
}

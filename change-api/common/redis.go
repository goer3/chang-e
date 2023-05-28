package common

import "time"

// Redis Key 前缀类型
type RedisKeyPrefixConfiguration struct {
	Token string
}

// Redis Key 过期时间类型
type RedisKeyExpireTimeConfiguration struct {
	TokenExpireTime time.Duration
}

// 设置 Key 前缀
var RedisKeyPrefix = RedisKeyPrefixConfiguration{}

// 设置 Key 过期时间，单位都是秒
var RedisKeyExpireTime = RedisKeyExpireTimeConfiguration{}

// Redis Key 拼接符
var RedisKeyPrefixTag = ":"

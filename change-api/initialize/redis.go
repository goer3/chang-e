package initialize

import (
	"change-api/common"
	"change-api/pkg/log2"
	"context"
	"fmt"
	"github.com/redis/go-redis/v9"
	"time"
)

// 初始化 Redis 连接
func Redis() {
	// 连接串
	dsn := fmt.Sprintf("%s:%d", common.Conf.Redis.Host, common.Conf.Redis.Port)
	// 配置 Redis 连接
	client := redis.NewClient(&redis.Options{
		// 基本连接信息
		Network:  "tcp",
		Addr:     dsn,
		DB:       common.Conf.Redis.DB,
		Password: common.Conf.Redis.Password,
		// 连接优化
		MaxRetries:      0,                      // 最大重试次数，0 为不重试
		MinRetryBackoff: 8 * time.Millisecond,   // 重试时间间隔下限
		MaxRetryBackoff: 512 * time.Millisecond, // 重试时间间隔上限
		DialTimeout:     5 * time.Second,        // 连接超时时间
		ReadTimeout:     3 * time.Second,        // 读超时时间
		WriteTimeout:    3 * time.Second,        // 写超时时间
		PoolSize:        14,                     // 最大连接数，一般比 CPU 核数 4 倍少一点
		PoolTimeout:     4 * time.Second,        // 连接等待超时时间，一般是 read 超时时间 +1
		MinIdleConns:    10,                     // 最小空闲连接
		ConnMaxIdleTime: 5 * time.Minute,        // 最大空闲时间
		ConnMaxLifetime: 0,                      // 连接存活时长
	})

	// 测试连接是否正常
	_, err := client.Ping(context.Background()).Result()
	if err != nil {
		log2.ERROR("缓存初始化连接异常：", err.Error())
		panic(err)
	}

	// 配置全局连接
	common.Cache = client
	log2.SYSTEM("缓存初始化连接完成：", fmt.Sprintf("%s:%d/%d",
		common.Conf.Redis.Host,
		common.Conf.Redis.Port,
		common.Conf.Redis.DB,
	))
}

package main

import (
	"change-api/common"
	docs "change-api/docs/swagger"
	"change-api/helper"
	"change-api/initialize"
	"change-api/pkg/log2"
	"context"
	"embed"
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"os"
	"os/signal"
	"time"
)

//go:embed config/*
var fs embed.FS // embed 打包配置文件，固定的注释格式，表示读取 config/ 下面所有文件

func main() {
	// 运行参数校验，修改默认配置
	helper.ArgsCheck(os.Args)

	// 初始化配置文件
	initialize.Config(fs, common.RunEnv, common.ExternalConfigFile)

	// 设置运行配置
	gin.SetMode(common.Conf.Service.Mode) // 运行模式
	gin.DisableConsoleColor()             // 禁用控制台颜色输出

	// 通过动态配置的方式配置 Swagger 信息，替换注释方式
	if common.Conf.Swagger.Enable {
		docs.SwaggerInfo.Title = common.Conf.Swagger.Title
		docs.SwaggerInfo.Description = common.Conf.Swagger.Description
		docs.SwaggerInfo.Version = common.Conf.Swagger.Version
		docs.SwaggerInfo.Host = fmt.Sprintf("%s:%d", common.Conf.Swagger.Listen, common.Conf.Service.Port)
		docs.SwaggerInfo.BasePath = common.Conf.Service.ApiPrefix
		docs.SwaggerInfo.Schemes = common.Conf.Swagger.Schemes
	}

	// 初始化服务日志器
	initialize.ServiceLogger()

	// 初始化 SQL 日志器
	initialize.SQLLogger()

	// 初始化 MySQL 连接
	initialize.MySQL()

	// 数据表同步操作
	if common.RunCommand == "migrate" {
		initialize.Migrate()
	}

	// 数据初始化操作
	if common.RunCommand == "init" {
		initialize.Data()
	}

	// 初始化 Redis 连接
	initialize.Redis()

	// 初始化 Redis 配置
	initialize.RedisConfig()

	// 初始化 Casbin 配置
	initialize.Casbin(fs)

	// 路由初始化
	r := initialize.Router()

	// 配置服务启动参数
	server := http.Server{
		Addr:    fmt.Sprintf("%s:%d", common.Conf.Service.Listen, common.Conf.Service.Port),
		Handler: r,
	}

	// 启动服务
	go func() {
		err := server.ListenAndServe()
		if err != nil && err != http.ErrServerClosed {
			log2.SYSTEM("服务监听失败：", err.Error())
		}
	}()

	// 等待中断信号，实现优雅的关闭
	quit := make(chan os.Signal)
	signal.Notify(quit, os.Interrupt)
	<-quit
	log2.SYSTEM("开始停止服务...")

	// 等待 5 秒处理，然后停止服务
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	err := server.Shutdown(ctx)
	if err != nil {
		log2.SYSTEM("服务停止异常：", err.Error())
		panic(err)
	}
	log2.SYSTEM("服务停止完成！")
}

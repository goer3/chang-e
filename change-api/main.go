package main

import (
	"change-api/common"
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
	// 运行参数校验
	helper.ArgsCheck(os.Args)

	// 初始化配置文件
	initialize.Config(fs, common.RunEnv, common.ExternalConfigFile)

	// 设置运行配置
	gin.SetMode(common.Conf.Service.Mode) // 运行模式
	gin.DisableConsoleColor()             // 禁用控制台颜色输出

	// 初始化数据库连接
	initialize.MySQL()

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
			log2.ERROR("服务监听失败：", err.Error())
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

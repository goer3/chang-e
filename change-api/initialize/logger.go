package initialize

import (
	"change-api/common"
	"change-api/pkg/log2"
	"fmt"
	"github.com/natefinch/lumberjack"
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
	"os"
	"time"
)

// 日志日期格式
func ZapLocalTimeEncoder(t time.Time, enc zapcore.PrimitiveArrayEncoder) {
	enc.AppendString(t.Format(common.MsecLocalTimeFormat))
}

// 配置 Logger 方法
func SetLogger(filename string, enable bool) (logger *zap.Logger) {
	// 日志切割配置
	hook := &lumberjack.Logger{
		Filename:   filename,
		MaxSize:    common.Conf.Log.MaxSize,
		MaxAge:     common.Conf.Log.MaxAge,
		MaxBackups: common.Conf.Log.MaxBackups,
		Compress:   common.Conf.Log.Compress,
	}

	// 延时关闭
	defer func(hook *lumberjack.Logger) {
		_ = hook.Close()
	}(hook)

	// 新建配置
	enc := zap.NewProductionEncoderConfig()
	// 设置时间格式化样式
	enc.EncodeTime = ZapLocalTimeEncoder
	// 设置日志颜色输出
	if common.Conf.Log.Color {
		enc.EncodeLevel = zapcore.CapitalColorLevelEncoder
	} else {
		enc.EncodeLevel = zapcore.CapitalLevelEncoder
	}

	// 判断是否输出到文件
	var ws zapcore.WriteSyncer
	if enable {
		// 控制台和日志双输出
		ws = zapcore.NewMultiWriteSyncer(zapcore.AddSync(os.Stdout), zapcore.AddSync(hook))
	} else {
		// 仅输出到控制台
		ws = zapcore.NewMultiWriteSyncer(zapcore.AddSync(os.Stdout))
	}

	// 整合配置
	core := zapcore.NewCore(zapcore.NewConsoleEncoder(enc), ws, common.Conf.Log.Level)
	logger = zap.New(core, zap.AddCaller(), zap.AddCallerSkip(1))
	return logger
}

// 初始化服务日志引擎
func ServiceLogger() {
	// 当前时间
	now := time.Now()

	// 日志文件
	filename := fmt.Sprintf("%s/%s.%04d-%02d-%02d.service.log",
		common.Conf.Log.Path,
		common.Conf.Service.Name,
		now.Year(),
		now.Month(),
		now.Day(),
	)

	// 获取 logger
	logger := SetLogger(filename, common.Conf.Log.Enable)

	// 将日志器存到全局，方便使用
	common.ServiceLogger = logger.Sugar()
	log2.SYSTEM("系统日志器初始完成！")
}

// 初始化 SQL 日志引擎
func SQLLogger() {
	// 当前时间
	now := time.Now()

	// 日志文件
	filename := fmt.Sprintf("%s/%s.%04d-%02d-%02d.sql.log",
		common.Conf.Log.Path,
		common.Conf.Service.Name,
		now.Year(),
		now.Month(),
		now.Day(),
	)

	// 获取 logger
	logger := SetLogger(filename, common.Conf.Log.SQLLogEnable)

	// 将日志器存到全局，方便使用
	common.SQLLogger = logger.Sugar()
	log2.SYSTEM("SQL 日志器初始完成！")
}

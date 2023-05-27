package zapgorm

import (
	"change-api/common"
	"context"
	"errors"
	"fmt"
	"go.uber.org/zap"
	"gorm.io/gorm"
	gormlogger "gorm.io/gorm/logger"
	"time"
)

// gorm logger
type Logger struct {
	ZapLogger                 *zap.SugaredLogger
	LogLevel                  gormlogger.LogLevel
	SlowThreshold             time.Duration
	IgnoreRecordNotFoundError bool
}

// New 构造函数
func New(zapLogger *zap.SugaredLogger) Logger {
	// 默认级别
	var level = gormlogger.Info

	// 判断是否开启日志
	if common.Conf.Log.SQLLogEnable {
		// 设置日志级别
		switch common.Conf.Log.SQLLogLevel {
		case 1:
			level = gormlogger.Info
		case 2:
			level = gormlogger.Warn
		case 3:
			level = gormlogger.Error
		case 4:
			level = gormlogger.Silent
		}
	} else {
		level = gormlogger.Silent
	}

	// 慢日志时间阈值
	t := time.Duration(common.Conf.MySQL.SlowThreshold) * time.Millisecond
	return Logger{
		ZapLogger:                 zapLogger,
		LogLevel:                  level,
		SlowThreshold:             t,    // 慢日志时间阈值
		IgnoreRecordNotFoundError: true, // 忽略 RecordNotFoundError 错误
	}
}

// LogMode 日志级别配置
func (l Logger) LogMode(level gormlogger.LogLevel) gormlogger.Interface {
	return Logger{
		ZapLogger:                 l.ZapLogger,
		LogLevel:                  l.LogLevel,
		SlowThreshold:             l.SlowThreshold,
		IgnoreRecordNotFoundError: l.IgnoreRecordNotFoundError,
	}
}

func (l Logger) Info(ctx context.Context, s string, i ...interface{}) {
	if l.LogLevel < gormlogger.Info {
		return
	}
	l.ZapLogger.Infof(s, i...)
}

func (l Logger) Warn(ctx context.Context, s string, i ...interface{}) {
	if l.LogLevel < gormlogger.Warn {
		return
	}
	l.ZapLogger.Warnf(s, i...)
}

func (l Logger) Error(ctx context.Context, s string, i ...interface{}) {
	if l.LogLevel < gormlogger.Error {
		return
	}
	l.ZapLogger.Errorf(s, i...)
}

func (l Logger) Trace(ctx context.Context, begin time.Time, fc func() (sql string, rowsAffected int64), err error) {
	if l.LogLevel <= 0 {
		return
	}

	// 执行耗时
	elapsed := time.Since(begin)

	// 条件判断
	switch {
	case err != nil && l.LogLevel >= gormlogger.Error && (!l.IgnoreRecordNotFoundError || !errors.Is(err, gorm.ErrRecordNotFound)):
		sql, rows := fc()
		l.ZapLogger.Error(fmt.Sprintf("执行耗时：%f\t受影响行数：%d\t执行SQL：%s", elapsed.Seconds(), rows, sql))
	case l.SlowThreshold != 0 && elapsed > l.SlowThreshold && l.LogLevel >= gormlogger.Warn:
		sql, rows := fc()
		l.ZapLogger.Warn(fmt.Sprintf("执行耗时：%f\t受影响行数：%d\t执行SQL：%s", elapsed.Seconds(), rows, sql))
	case l.LogLevel >= gormlogger.Info:
		sql, rows := fc()
		l.ZapLogger.Info(fmt.Sprintf("执行耗时：%f\t受影响行数：%d\t执行SQL：%s", elapsed.Seconds(), rows, sql))
	}
}

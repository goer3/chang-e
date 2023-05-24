package log2

import (
	"change-api/common"
	"fmt"
	"time"
)

// 日志打印
func LogPrint(now string, level string, v ...any) {
	fmt.Print(fmt.Sprintf("%s\t%s\t", now, level), fmt.Sprintln(v...))
}

// 系统日志
func SYSTEM(v ...any) {
	now := time.Now().Format(common.MsecLocalTimeFormat)
	level := "SYSTEM"
	LogPrint(now, level, v...)
}

// DEBUG 日志
func DEBUG(v ...any) {
	now := time.Now().Format(common.MsecLocalTimeFormat)
	level := "DEBUG"
	LogPrint(now, level, v...)
}

// INFO 日志
func INFO(v ...any) {
	now := time.Now().Format(common.MsecLocalTimeFormat)
	level := "INFO"
	LogPrint(now, level, v...)
}

// WARN 日志
func WARN(v ...any) {
	now := time.Now().Format(common.MsecLocalTimeFormat)
	level := "WARN"
	LogPrint(now, level, v...)
}

// ERROR 日志
func ERROR(v ...any) {
	now := time.Now().Format(common.MsecLocalTimeFormat)
	level := "ERROR"
	LogPrint(now, level, v...)
}

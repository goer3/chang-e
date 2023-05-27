package log2

import (
	"change-api/common"
	"fmt"
	"time"
)

// 系统日志打印，注意，系统日志的打印无论如何都会输出到文件中
func LogHandler(now string, level string, v ...any) {
	// 日志内容
	logStr := fmt.Sprintf("%s\t%s\t%v", now, level, fmt.Sprintln(v...))
	// 控制台打印
	fmt.Print(logStr)
}

// 系统日志
func SYSTEM(v ...any) {
	now := time.Now().Format(common.MsecLocalTimeFormat)
	level := "SYSTEM"
	LogHandler(now, level, v...)
}

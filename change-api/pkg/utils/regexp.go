package utils

import "regexp"

// 正则模板
const (
	UsernameRegExp = `^[a-z][a-z0-9]{3,20}$`                                                                            // 用户名正则
	EmailRegExp    = `^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$`                              // 邮箱正则
	MobileRegExp   = `^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$`                                       // 手机号正则
	DateTimeRegExp = `/^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\s+(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$` // 时间日期正则
)

// 正则校验
func RegExpString(reg string, str string) bool {
	rgx := regexp.MustCompile(reg)
	return rgx.MatchString(str)
}

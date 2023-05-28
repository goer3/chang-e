package utils

import "regexp"

// 正则模板
const (
	UsernameRegExp = `^[a-z][a-z0-9]{3,20}$`                                               // 用户名正则
	EmailRegExp    = `^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$` // 邮箱正则
	MobileRegExp   = `^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$`          // 手机号正则
)

// 正则校验
func RegExpString(reg string, str string) bool {
	rgx := regexp.MustCompile(reg)
	return rgx.MatchString(str)
}

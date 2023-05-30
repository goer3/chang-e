package response

// 响应的基础方法
func Result(code int, data interface{}) {
	panic(Response{
		Code:    code,
		Message: CustomMessage[code],
		Data:    data,
	})
}

// 响应的基础方法，使用自定义的 message
func ResultWithMessage(code int, message string, data interface{}) {
	panic(Response{
		Code:    code,
		Message: message,
		Data:    data,
	})
}

// 成功的请求
func Success() {
	Result(OK, map[string]interface{}{})
}

// 成功请求，有消息
func SuccessWithMessage(message string) {
	ResultWithMessage(OK, message, map[string]interface{}{})
}

// 成功请求，有返回数据
func SuccessWithData(data interface{}) {
	Result(OK, data)
}

// 失败请求
func Failed() {
	Result(NotOK, map[string]interface{}{})
}

// 失败请求，有状态码
func FailedWithCode(code int) {
	Result(code, map[string]interface{}{})
}

// 失败请求，有失败信息
func FailedWithMessage(message string) {
	ResultWithMessage(NotOK, message, map[string]interface{}{})
}

// 失败请求，有状态码，有失败信息
func FailedWithCodeAndMessage(code int, message string) {
	ResultWithMessage(code, message, map[string]interface{}{})
}

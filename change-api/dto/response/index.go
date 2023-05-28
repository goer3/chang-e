package response

// 接口响应状态码
const (
	OK                  = 200
	NotOK               = 400
	Unauthorized        = 401
	Forbidden           = 403
	NotFound            = 404
	ParamError          = 406
	InternalServerError = 500
	UserLoginError      = 1001
	UserDisableError    = 1002
	UserLockedError     = 1003
)

// 状态码对应的消息
const (
	OKMessage                  = "请求成功"
	NotOKMessage               = "请求失败"
	UnauthorizedMessage        = "登录过期，请重新登录"
	ForbiddenMessage           = "无权限访问该资源"
	NotFoundMessage            = "资源未找到"
	ParamErrorMessage          = "参数错误"
	InternalServerErrorMessage = "服务器内部错误，请联系管理员"
	UserLoginErrorMessage      = "用户名或密码错误"
	UserDisableErrorMessage    = "用户已经被禁用，请联系管理员"
	UserLockedErrorMessage     = "用户已锁定，请联系管理员"
)

// 状态码和信息绑定
var CustomMessage = map[int]string{
	OK:                  OKMessage,
	NotOK:               NotOKMessage,
	Unauthorized:        UnauthorizedMessage,
	Forbidden:           ForbiddenMessage,
	NotFound:            NotFoundMessage,
	ParamError:          ParamErrorMessage,
	InternalServerError: InternalServerErrorMessage,
	UserLoginError:      UserLoginErrorMessage,
	UserDisableError:    UserDisableErrorMessage,
	UserLockedError:     UserLockedErrorMessage,
}

// 响应数据格式
type Response struct {
	Code    int         `json:"code"`
	Message string      `json:"message"`
	Data    interface{} `json:"data"`
}

// 用户登录响应
type Login struct {
	Token  string `json:"token"`
	Expire string `json:"expire"`
}

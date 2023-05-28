package request

// 用户登录认证结构体
type Login struct {
	Account  string `json:"account"`
	Password string `json:"password"`
}

<h1 align="center">Chang'e（嫦娥） API 手册</h1>
<hr>

### ☀️开放接口

- [x] `/api/v1/ping`：存活性检测接口
- [x] `/api/v1/login`：用户登录接口
  - 支持用户使用用户名，手机号，邮箱 + 密码的方式进行登录
  - 登录成功返回：token + expire（Token 过期时间），如果配置了单一登录限制，Token 会保存到 Redis 中
  - 用户第一次登录会返回错误，前端可以根据错误信息的 code（1004）进行判断，结合 message 提供的 Token（有效期五分钟）进行系统第一次重置密码

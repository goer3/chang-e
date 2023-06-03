<h1 align="center">Chang'e（嫦娥） API 手册</h1> 

> 注意：接口默认统一前缀为 `/api/v1`

### ☀️ 开放接口

- [x] `/ping`，`Method：[GET]`：存活性检测接口
- [x] `/login`，`Method：[POST]`：用户登录接口
  - 支持用户使用用户名，手机号，邮箱 + 密码的方式进行登录
  - 登录成功返回：token + expire（Token 过期时间），如果配置了单一登录限制，Token 会保存到 Redis 中
  - 第一次登录会返回错误，根据返回 code（1004）判断，结合 message 提供的 Token（有效期五分钟）进行系统第一次重置密码
- [x] `/logout`，`Method：[POST]`：注销登录
  - 如果有配置单一登录，会清理 Redis 用户登录数据
- [x] `/reset/password/:token`，`Method：[PUT]`：用户第一次登录重置密码接口
  - 通过接口用户 URI 中的参数，查询 Redis 中对于的 Key 来确认需要重置密码的用户
  - 重置密码完成，会一起更新用户是否第一次登录的状态字段

<br>

### 😆 用户接口


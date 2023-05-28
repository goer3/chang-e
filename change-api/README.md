<h1 align="center">Hi 🥳, Chang'e（嫦娥）</h1>
<h3 align="center">一个通过 Go / Gin / Gorm 实现的运维管理系统后端</h3>
<p align="center">
<a href="https://github.com/goer3/chang-e/fork" target="blank">
<img src="https://img.shields.io/github/forks/goer3/chang-e?style=flat-square" alt="github-profile-readme-generator forks"/>
</a>
<a href="https://github.com/goer3/chang-e/stargazers" target="blank">
<img src="https://img.shields.io/github/stars/goer3/chang-e?style=flat-square" alt="github-profile-readme-generator stars"/>
</a>
<a href="https://github.com/goer3/chang-e/issues" target="blank">
<img src="https://img.shields.io/github/issues/goer3/chang-e?style=flat-square" alt="github-profile-readme-generator issues"/>
</a>
</p>

<hr>


### 🤔 技术栈

- [x] Go：Google 开发的开源编程语言，诞生于 2006 年 1 月 2 日 15 点 4 分 5 秒 [:octocat:](https://github.com/golang/go)
- [x] Gin：用 Go 编写的高性能 HTTP Web 框架 [:octocat:](https://github.com/gin-gonic/gin)
- [x] Gorm：数据库 ORM 管理框架, 可自行扩展多种数据库类型 [:octocat:](https://gorm.io/gorm)
- [x] Redis：Redis 客户端 [:octocat:](https://github.com/redis/go-redis)
- [x] Viper：配置管理工具, 支持多种配置文件类型 [:octocat:](https://github.com/spf13/viper)
- [x] Embed：go 1.16 新增的文件嵌入属性, 轻松将静态文件打包到编译后的二进制应用中
- [x] Zap：快速、结构化、分级的日志记录 [:octocat:](https://go.uber.org/zap)
- [x] Lumberjack：将日志写入滚动文件 [:octocat:](https://github.com/natefinch/lumberjack)
- [x] Jwt：用户认证, 登入登出一键搞定 [:octocat:](https://github.com/appleboy/gin-jwt)
- [x] Carbon：简单、语义化且对开发人员友好的 datetime 包 [:octocat:](https://github.com/golang-module/carbon)
- [x] Casbin：一个强大的、高效的开源访问控制框架 [:octocat:](https://casbin.org/zh/docs/overview)
- [x] Validator：请求参数校验, 版本 V10 [:octocat:](https://github.com/go-playground/validator)


### 🎯 依赖安装

```bash
# Web 框架
go get -u github.com/gin-gonic/gin
# 配置文件读取
go get -u github.com/spf13/viper
# MySQL ORM
go get -u gorm.io/gorm
go get -u gorm.io/driver/mysql
# Redis
go get -u github.com/redis/go-redis/v9
# 日志引擎
go get -u go.uber.org/zap
# 日志切割
go get -u github.com/natefinch/lumberjack
# 时间库
go get -u github.com/golang-module/carbon/v2
# JWT
go get -u github.com/appleboy/gin-jwt/v2
# Swagger
go install github.com/swaggo/swag/cmd/swag@latest
go get -u github.com/swaggo/gin-swagger
go get -u github.com/swaggo/files
# RBAC
go get -u github.com/casbin/casbin/v2
go get -u github.com/casbin/gorm-adapter/v3
# 结构体操作
go get -u github.com/fatih/structs
```


### 📌 特别说明

本文 Swagger 生成文档的命令为：

```bash
# --parseDependency --parseInternal：深度解析外部定义的数据类型，解决提示 cannot find type definition 问题
# -q：忽略告警，目前版本 swag init 存在 strconv.ParseUint: invalid syntax 问题，官方还没有修复
swag init -o ./docs/swagger --parseDependency --parseInternal -q

# 格式化 swagger 注释
swag fmt
```

服务启动后可以在 Web 访问 Swagger：

> http://127.0.0.1:10000/swagger/index.html


### 💬 联系我呗

[![QQmail](https://img.shields.io/badge/-1214966109@qq.com-006bed?style=flat-square&logo=Gmail&logoColor=white&link=mailto:1214966109@qq.com)](mailto:1214966109@qq.com)


### 🎉 感谢

该项目是参考学习以下项目，然后自己再修修改改而来，感谢铁子们 🌹：

- gin-web [:octocat:](https://github.com/piupuer/gin-web)
- go-helper [:octocat:](https://github.com/piupuer/go-helper)
- Go-Vue-Admin [:octocat:](https://github.com/tanxi2019/Go-Vue-Admin)


### 📋 附加文档

- [Github 国内访问慢配置](https://github.com/521xueweihan/GitHub520)
- [Json 在线转换成结构体](https://app.quicktype.io)
- [Json 解析分析文章](https://www.cnblogs.com/luozhiyun/p/14875066.html)
- [Swagger 文档](https://github.com/swaggo/swag/blob/master/README_zh-CN.md)
- [Swagger 配置方法](https://github.com/swaggo/gin-swagger)
- [Swagger 使用方法](https://juejin.cn/post/7015575667236405278)
- [Gorm 文档](https://gorm.io/zh_CN/docs/update.html)
- [Redis 文档](https://redis.uptrace.dev/zh/)
- [Casbin 文档](https://casbin.org/zh/docs/overview)

### 📝 附录

- 🐒 &nbsp; README 生成工具：<a href="https://rahuldkjain.github.io/gh-profile-readme-generator/">README 工具</a>
- 🍁 &nbsp; README 模板项目：<a href="https://github.com/iuricode/readme-template">README 模板</a>
- 😊 &nbsp; README 表情图标：<a href="https://github.com/guodongxiaren/README/blob/master/emoji.md?tdsourcetag=s_pcqq_aiomsg">README EMOJI 表情</a>

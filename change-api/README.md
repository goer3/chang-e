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


### 😽 项目部署

* 数据库初始化

```bash
# 同步数据表结构
chang-e migrate

# 同步数据表数据
chang-e init
```

* 手动执行 sql 目录下的脚本

```bash
# 省市区表
regions.sql 
```

* 其它待定

### 💬 联系我呗

[![QQmail](https://img.shields.io/badge/-1214966109@qq.com-006bed?style=flat-square&logo=Gmail&logoColor=white&link=mailto:1214966109@qq.com)](mailto:1214966109@qq.com)


### 🎉 感谢

该项目是参考学习以下项目，然后自己再修修改改而来，感谢铁子们 🌹：

- gin-web [:octocat:](https://github.com/piupuer/gin-web)
- go-helper [:octocat:](https://github.com/piupuer/go-helper)
- Go-Vue-Admin [:octocat:](https://github.com/tanxi2019/Go-Vue-Admin)

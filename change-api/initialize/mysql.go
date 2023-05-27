package initialize

import (
	"change-api/common"
	"change-api/pkg/log2"
	"change-api/pkg/zapgorm"
	"fmt"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/schema"
	"time"
)

// 数据库连接初始化
func MySQL() {
	// 数据库连接串
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s?charset=%s&collation=%s&timeout=%dms&%s",
		common.Conf.MySQL.Username,
		common.Conf.MySQL.Password,
		common.Conf.MySQL.Host,
		common.Conf.MySQL.Port,
		common.Conf.MySQL.Database,
		common.Conf.MySQL.Charset,
		common.Conf.MySQL.Collation,
		common.Conf.MySQL.Timeout,
		common.Conf.MySQL.ExtQuery,
	)

	// 连接数据库
	db, err := gorm.Open(mysql.New(mysql.Config{
		DSN:               dsn, // 数据库连接串
		DefaultStringSize: 170, // varchar 类型字段默认长度，影响查询
	}), &gorm.Config{
		NamingStrategy: schema.NamingStrategy{
			TablePrefix:   common.Conf.MySQL.TablePrefix, // 表名前缀
			SingularTable: true,                          // 单数表名
		},
		Logger:                                   zapgorm.New(common.SQLLogger), // 自定义的日志器
		DisableForeignKeyConstraintWhenMigrating: true,                          // 禁用外键约束
		IgnoreRelationshipsWhenMigrating:         true,                          // 创建时忽略表关系
		QueryFields:                              true,                          // 解决查询索引失效问题
	})

	// 错误处理
	if err != nil {
		log2.SYSTEM("数据库初始连接失败：", err.Error())
		panic(err)
	}

	// 设置连接池
	sqlDB, _ := db.DB()
	sqlDB.SetMaxIdleConns(common.Conf.MySQL.MaxIdleConns)
	sqlDB.SetMaxOpenConns(common.Conf.MySQL.MaxOpenConns)
	sqlDB.SetConnMaxIdleTime(time.Duration(common.Conf.MySQL.MaxIdleTime) * time.Minute)

	// 设置全局连接
	common.DB = db
	log2.SYSTEM("数据库初始连接完成：", fmt.Sprintf("%s@%s:%d/%s",
		common.Conf.MySQL.Username,
		common.Conf.MySQL.Host,
		common.Conf.MySQL.Port,
		common.Conf.MySQL.Database))
}

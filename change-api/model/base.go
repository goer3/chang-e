package model

import (
	"github.com/golang-module/carbon/v2"
)

// 基础字段
type Base struct {
	Id        uint            `gorm:"primaryKey;comment:自增编号" json:"id"`
	CreatedAt carbon.DateTime `gorm:"comment:创建时间" json:"created_at"`
	UpdatedAt carbon.DateTime `gorm:"comment:更新时间" json:"updated_at"`
	DeletedAt DeletedAt       `gorm:"index:idx_deleted_at;comment:删除时间" json:"deleted_at"`
}

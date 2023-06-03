package utils

import (
	"change-api/common"
	"encoding/json"
)

// map[string]interface -> Struct
// 第二个参数需要传递结构体指针
func MapStringInterface2Struct(data map[string]interface{}, obj interface{}) error {
	jsonStr, _ := json.Marshal(data)
	err := json.Unmarshal(jsonStr, obj)
	if err != nil {
		common.ServiceLogger.Error("map[string]interface 转换 Struct 失败：", err.Error())
		return err
	}
	return nil
}

// Struct -> Json
func Struct2Json(obj interface{}) (string, error) {
	str, err := json.Marshal(obj)
	if err != nil {
		common.ServiceLogger.Error("Struct 转换 Json 失败：", err.Error())
		return "", err
	}
	return string(str), nil
}

// Json -> Struct
func Json2Struct(str string, obj interface{}) error {
	err := json.Unmarshal([]byte(str), obj)
	if err != nil {
		common.ServiceLogger.Error("Json 转换 Struct 失败：", err.Error())
		return err
	}
	return nil
}

// Struct1 -> Struct2
// 通过 Json 作为中间结构，第二个结构体必须是指针
func Struct2Struct(obj1 interface{}, obj2 interface{}) error {
	str, err := Struct2Json(obj1)
	if err != nil {
		return err
	}

	err = Json2Struct(str, obj2)
	if err != nil {
		return err
	}
	return nil
}

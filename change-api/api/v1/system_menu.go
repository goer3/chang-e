package v1

import (
	"change-api/dto/response"
	"change-api/pkg/ms"
	"change-api/pkg/utils"
	"github.com/gin-gonic/gin"
)

// 获取当前用户菜单树
func GetCurrentUserMenuTreeHandler(ctx *gin.Context) {
	// 获取当前用户角色关键字
	keyword, err := utils.GetRoleKeywordFromContext(ctx)
	if err != nil {
		response.FailedWithMessage("获取当前用户角色关键字失败")
		return
	}

	// 获取菜单树
	tree, err := ms.GetMenuTreeByRoleKeyword(keyword)
	if err != nil {
		response.FailedWithMessage(err.Error())
		return
	}

	// 成功响应
	response.SuccessWithData(map[string]interface{}{
		"tree": tree,
	})
}

// 获取指定角色的菜单树
func GetMenuTreeByRoleKeywordHandler(ctx *gin.Context) {
	// 获取角色关键字参数
	keyword := ctx.Param("keyword")
	if keyword == "" {
		response.FailedWithCode(response.ParamError)
		return
	}

	// 获取菜单树
	tree, err := ms.GetMenuTreeByRoleKeyword(keyword)
	if err != nil {
		response.FailedWithMessage(err.Error())
		return
	}

	// 成功响应
	response.SuccessWithData(map[string]interface{}{
		"tree": tree,
	})
}

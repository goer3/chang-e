package response

import (
	"change-api/common"
)

// 数据分页响应
type Page struct {
	PageNumber   uint  `json:"page_number" form:"page_number"`
	PageSize     uint  `json:"page_size" form:"page_size"`
	TotalCount   int64 `json:"total_count" form:"total_count"`
	NoPagination bool  `json:"no_pagination" form:"no_pagination"`
}

// 分页数据格式
type PageData struct {
	PageInfo Page        `json:"page_info"`
	List     interface{} `json:"list"`
}

// 获取 limit 和 offset
func (s *Page) GetLimit() (int, int) {
	var pageSize int64
	var pageNumber int64

	// 如果请求每页数量小于 1，或者大于最大限制数量
	// 那么请求都不合法，将会使用默认的数量
	if s.PageSize < 1 || s.PageSize > common.MaxPageSize {
		pageSize = common.DefaultPageSize
	} else {
		pageSize = int64(s.PageSize)
	}

	// 如果页码小于 1
	// 那么请求将不合法，将会把页码设置为 1
	if s.PageNumber < 1 {
		pageNumber = 1
	} else {
		pageNumber = int64(s.PageNumber)
	}

	// 统计最大页码
	maxPageNumber := s.TotalCount/pageSize + 1
	// 如果刚好整除，则最大页码不用 + 1
	if s.TotalCount%pageSize == 0 {
		maxPageNumber = s.TotalCount / pageSize
	}

	// 如果没数据或者刚好整除，则显示第一页
	if maxPageNumber < 1 {
		pageNumber = 1
	}

	// 页码数大于数据总数，则设置为最后一页
	if s.TotalCount > 0 && pageNumber > s.TotalCount {
		pageNumber = maxPageNumber
	}

	// 限制和偏移
	limit := pageSize
	offset := pageSize * (pageNumber - 1)

	// 数据处理
	s.PageNumber = uint(pageNumber)
	s.PageSize = uint(pageSize)
	if s.NoPagination {
		s.PageSize = uint(s.TotalCount)
	}
	return int(limit), int(offset)
}

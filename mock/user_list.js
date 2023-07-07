/**
 * 用户管理模块的mock数据
 */
const Mock = require('mockjs')

const data = Mock.mock({
  'items|30': [{
    id: '@id',
    name: '@word(3, 8)',
    'status|1': ['正常', '停用'],
    role: '普通用户',
    add_time: '@datetime',
    update_time: '@datetime',
  }]
})


module.exports = [
  {
    url: '/planform/list',
    type: 'get',
    response: config => {
      const query = config.query
      // 转换为整数
      const page = parseInt(query.page)
      const pageSize = parseInt(query.pageSize)
      const items = data.items
      const total = items.length
      return {
        code: 1000,
        data: {
          total, items, page
        }
      }
    }
  }
]

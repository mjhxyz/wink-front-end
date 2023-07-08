/**
 * 用户管理模块的mock数据
 */
const Mock = require('mockjs')

const data = Mock.mock({
  'items|120': [{
    id: '@id',
    name: '@word(3, 8)',
    'status|1': [0, 1],
    'role|1': [0, 1, 2],
    add_time: '@datetime',
    update_time: '@datetime'
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
      const total = data.items.length
      const items = data.items.slice((page - 1) * pageSize, page * pageSize)
      return {
        code: 1000,
        data: {
          total, items, page
        }
      }
    }
  },
  {
    url: '/planform/add',
    type: 'post',
    response: config => {
      return {
        code: 1000,
        data: {
          id: Mock.mock('@id')
        }
      }
    }
  },
  {
    url: '/planform/edit',
    type: 'post',
    response: config => {
      return {
        code: 1000,
        data: {}
      }
    }
  },
  {
    url: '/planform/delete',
    type: 'post',
    response: config => {
      return {
        code: 1000,
        data: {}
      }
    }
  }
]

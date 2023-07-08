/**
 * role meta
 */
const Mock = require('mockjs')

const data = Mock.mock({
  'items|5': [{
    id: '@id',
    name: '@word(3, 8)-管理员',
    add_time: '@datetime',
    update_time: '@datetime'
  }]
})

module.exports = [
  {
    url: '/role/list',
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
    url: '/role/add',
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
    url: '/role/edit',
    type: 'post',
    response: config => {
      return {
        code: 1000,
        data: {}
      }
    }
  },
  {
    url: '/role/delete',
    type: 'post',
    response: config => {
      return {
        code: 1000,
        data: {}
      }
    }
  }
]

/**
 * role meta
 */
const Mock = require('mockjs')

const roleList = [
  {
    id: 1,
    name: '超级管理员',
    add_time: '2020-01-01 00:00:00',
    update_time: '2020-01-01 00:00:00'
  },
  {
    id: 2,
    name: '管理员',
    add_time: '2020-01-01 00:00:00',
    update_time: '2020-01-01 00:00:00'
  },
  {
    id: 3,
    name: '普通用户',
    add_time: '2020-01-01 00:00:00',
    update_time: '2020-01-01 00:00:00'
  },
  {
    id: 4,
    name: '游客',
    add_time: '2020-01-01 00:00:00',
    update_time: '2020-01-01 00:00:00'
  }
]

module.exports = [
  {
    url: '/role/list',
    type: 'get',
    response: config => {
      const query = config.query
      // 转换为整数
      const page = parseInt(query.page)
      const pageSize = parseInt(query.pageSize)
      if (!page || !pageSize) {
        return {
          code: 1000,
          data: {
            total: roleList.length,
            items: roleList,
            page: 1
          }
        }
      }
      const total = roleList.length
      const items = roleList.slice((page - 1) * pageSize, page * pageSize)
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

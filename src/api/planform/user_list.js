import request from '@/utils/request'

// 获取用户列表
export function getUserList(params) {
  return request({
    url: '/planform/list',
    method: 'get',
    params
  })
}

// 添加用户
export function addUser(data) {
  return request({
    url: '/planform/add',
    method: 'post',
    data
  })
}

// 编辑用户
export function editUser(data) {
  return request({
    url: '/planform/edit',
    method: 'post',
    data
  })
}

// 删除用户
export function deleteUser(data) {
  return request({
    url: '/planform/delete',
    method: 'post',
    data
  })
}

import request from '@/utils/request'

// 获取用户列表
export function getUserList(params) {
    return request({
        url: '/planform/list',
        method: 'get',
        params
    })
}

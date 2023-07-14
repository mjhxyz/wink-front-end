/**
 * 菜单接口
 */
import request from '@/utils/request'


// 获取菜单树
export function getMenuTree(params) {
    return request({
        url: `/menu/tree`,
        method: 'get',
        params
    })
}


// 添加菜单
export function addMenu(data) {
    return request({
        url: `/menu/add_menu`,
        method: 'post',
        data
    })
}
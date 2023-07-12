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
/**
 * @description 权限按钮接口
 */

import request from '@/utils/request'

export function queryButtonList(menu_code) {
  return request({
    url: `/wink/button/query`,
    method: 'get',
    params: { menu_code }
  })
}

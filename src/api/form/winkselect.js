/**
 * @description 下拉框用的接口
 */

import request from '@/utils/request'

export function querySelectList(field_id) {
  return request({
    url: `/field/mapping`,
    method: 'get',
    params: { field_id }
  })
}

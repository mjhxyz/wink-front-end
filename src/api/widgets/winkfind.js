
/**
 * @description 查找框
 */

import request from '@/utils/request'

export function queryFindList(meta_code, field_name) {
  return request({
    url: `/wink/widget/find`,
    method: 'get',
    params: { meta_code, field_name }
  })
}

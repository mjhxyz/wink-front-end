/**
 * @description 单表用的接口
 */
import request from '@/utils/request'

// 获取表数据列表
export function queryTableList(params) {
  return request({
    url: `/wink/singletable/list`,
    method: 'get',
    params
  })
}

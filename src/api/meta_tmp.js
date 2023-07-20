/**
 * meta api接口 plus
 */
import request from '@/utils/request'

// 获取 meta 对应表的数据
export function getList(metaCode, params) {
  return request({
    url: `/${metaCode}/list`,
    method: 'get',
    params
  })
}

// 添加记录
export function add(metaCode, data) {
  return request({
    url: `/meta/add_record/${metaCode}`,
    method: 'post',
    data
  })
}

// 编辑记录
export function edit(metaCode, data) {
  return request({
    url: `/meta/edit_record/${metaCode}`,
    method: 'post',
    data
  })
}

// 删除记录
export function deleteRecord(metaCode, data) {
  return request({
    url: `/meta/delete_record/${metaCode}`,
    method: 'post',
    data
  })
}

// 批量删除记录
export function deleteMany(metaCode, data) {
  return request({
    url: `/meta/delete_many/${metaCode}`,
    method: 'post',
    data
  })
}

// //////////////////// 简化请求 //////////////////////
class MetaRequest {
  constructor(metaCode) {
    this.metaCode = metaCode
  }
  getList(params) {
    return getList(this.metaCode, params)
  }
  add(data) {
    return add(this.metaCode, data)
  }
  edit(data) {
    return edit(this.metaCode, data)
  }
  delete(data) {
    return deleteRecord(this.metaCode, data)
  }
  deleteMany(data) {
    return deleteMany(this.metaCode, data)
  }
}

export function getRequest(metaCode) {
  return new MetaRequest(metaCode)
}

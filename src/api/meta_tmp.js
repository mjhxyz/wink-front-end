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
export function add(menuCode, metaCode, data) {
  return request({
    url: `/meta/add_record/${metaCode}`,
    method: 'post',
    data,
    params: { menu_code: menuCode }
  })
}

// 编辑记录
export function edit(menuCode, metaCode, data) {
  return request({
    url: `/meta/edit_record/${metaCode}`,
    method: 'post',
    data,
    params: { menu_code: menuCode }
  })
}

// 删除单个或者多个记录
export function deleteRecord(menuCode, metaCode, data) {
  return request({
    url: `/meta/delete_record/${metaCode}`,
    method: 'post',
    data,
    params: { menu_code: menuCode }
  })
}

// //////////////////// 简化请求 //////////////////////
class MetaRequest {
  constructor(menuCode, metaCode) {
    this.metaCode = metaCode
    this.menuCode = menuCode
  }
  getList(params) {
    return getList(this.metaCode, params)
  }
  add(data) {
    return add(this.menuCode, this.metaCode, data)
  }
  edit(data) {
    return edit(this.menuCode, this.metaCode, data)
  }
  delete(data) {
    return deleteRecord(this.menuCode, this.metaCode, data)
  }
}

export function getRequest(menuCode, metaCode) {
  return new MetaRequest(menuCode, metaCode)
}

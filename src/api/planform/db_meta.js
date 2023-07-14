/**
 * @description 数据库元数据获取接口
 */
import request from '@/utils/request'

// 获取数据库列表
export function getSourceList(params) {
    return request({
        url: '/wink/db/source_list',
        method: 'get',
        params
    })
}

// 获取数据库表列表
export function getTableList(source = 'meta') {
    const params = {
        source
    }
    return request({
        url: '/wink/db/table_list',
        method: 'get',
        params
    })
}

// 获取数据库表字段列表
export function getTableFieldList(table_name, source = 'meta') {
    const params = {
        table_name,
        source
    }
    return request({
        url: '/wink/db/table_field_list',
        method: 'get',
        params
    })
}





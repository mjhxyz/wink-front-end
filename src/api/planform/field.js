/**
 * @description 表单字段接口
 */
import request from '@/utils/request'


export function getFieldList(params) {
    return request({
        url: `/field/list`,
        method: 'get',
        params
    })
}
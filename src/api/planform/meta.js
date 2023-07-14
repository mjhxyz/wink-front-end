import request from '@/utils/request'

export function addMeta(data) {
    return request({
        url: `/meta/add_meta`,
        method: 'post',
        data
    })
}


export function getMetaList(params) {
    return request({
        url: `/meta/all`,
        method: 'get',
        params
    })
}

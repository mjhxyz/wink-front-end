<template>
    <div class="app-container">
        <datatable ref="datatable" :index="true" :fields="fields" :op-btn="opBtn" :op-btn-detail="opBtnDetail"
            :op-btn-delete="opBtnDelete" :op-btn-edit="opBtnEdit" :nav-btn="navBtn" :nav-btn-add="navBtnAdd"
            :nav-btn-detail="navBtnDetail" :nav-btn-edit="navBtnEdit" :nav-btn-delete="navBtnDelete" @fetchData="fetchData"
            @add="add" @edit="edit" @delete="deleteItems" @deleteOne="deleteOne" :pagination="pagination"
            @row-click="rowClick" :fetchOnCreated="fetchOnCreated">
            <template #nav-btn>
                <slot name="nav-btn"></slot>
            </template>
        </datatable>
    </div>
</template>

<script>
import { getRequest } from '@/api/meta'
import Datatable from '@/components/Datatable/index.vue'
import { queryTableList } from '@/api/components/singletable'
import { getFieldList } from '@/api/planform/field'

export default {
    components: {
        Datatable
    },
    props: {
        fetchOnCreated: { // 是否在创建时就获取数据
            type: Boolean,
            default: true
        },
        pagination: {
            type: Boolean,
            default: true
        },
        setting: {
            type: String,
            required: true
        }
    },

    data() {
        return {
            meta: {}
        }
    },

    async created() {
    },

    computed: {
        request() {
            return getRequest(this.metaCode)
        },

        opBtn() {
            return this.meta.opBtn && (this.opBtnDelete || this.opBtnEdit || this.opBtnDetail)
        },

        opBtnEdit() {
            return this.meta.opBtnEdit
        },

        opBtnDelete() {
            return this.meta.opBtnDelete
        },

        opBtnDetail() {
            return this.meta.opBtnDetail
        },

        navBtn() {
            return this.meta.navBtn
        },

        navBtnAdd() {
            return this.meta.navBtnAdd
        },

        navBtnDetail() {
            return this.meta.navBtnDetail
        },

        navBtnEdit() {
            return this.meta.navBtnEdit
        },

        navBtnDelete() {
            return this.meta.navBtnDelete
        },

        fields() {
            return this.meta.fields
        },
        metaCode() {
            return this.meta.code
        }
    },
    methods: {
        async genMeta() {
            // 判断是否为空对象
            if (Object.keys(this.meta).length) {
                return
            }
            let setting = JSON.parse(this.setting)
            const metaCode = setting.meta
            let meta = {}
            const res = await getFieldList({ masterKey: metaCode })
            const fields = res.data.items
            // 遍历 fields，将 meta 中的字段信息补充完整
            for (let i = 0; i < fields.length; i++) {
                const field = fields[i]
                console.log(field)
                field.type = {
                    name: 'text'
                }
            }


            meta.fields = fields
            meta.code = metaCode

            this.meta = meta
        },

        rowClick(row, column, event) {
            this.$emit('row-click', row, column, event)
        },

        triggerFetchData(params) { // 触发刷新
            this.$refs.datatable.fetchData(params)
        },

        add(item, callback) {
            this.request.add(item).then(res => {
                callback(true)
            }).catch(e => {
                callback(e)
            })
        },

        edit(item, callback) {
            this.request.edit(item).then(res => {
                callback(true)
            }).catch(e => {
                callback(e)
            })
        },

        deleteItems(items, callback) { // delete 是关键字，不能用
            // 获取到所有的 pk(id)
            const ids = items.map(item => item[this.meta.pk || 'id'])
            this.request.deleteMany({ ids }).then(res => {
                callback(true)
            }).catch(e => {
                callback(e)
            })
        },

        deleteOne(item, callback) {
            this.request.delete(item).then(res => {
                callback(true)
            }).catch(e => {
                callback(e)
            })
        },

        // 获取数据列表
        async fetchData(params, callback) {
            await this.genMeta()
            params.meta = this.meta.code
            const result = await queryTableList(params)
            const { page, total, items } = result.data
            callback({
                page,
                total,
                items
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.app-container {
    height: 100%;
    overflow-y: hidden;
    display: flex;
    flex-direction: column;
}
</style>

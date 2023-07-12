<template>
    <div class="app-container">

        <singletable :meta="masterMeta" @row-click="rowClick">
            <template #nav-btn>
                <el-button size="small" type="primary" icon="el-icon-plus">添加系统菜单</el-button>
            </template>
        </singletable>

        <singletable ref="slave" :meta="slaveMeta" :pagination="false" />
    </div>
</template>

<style lang="scss" scoped>
.app-container {
    height: 100%;
    overflow-y: hidden;
    display: flex;
    flex-direction: column;
}
</style>

<script>
import Singletable from '@/components/tables/Singletable/index.vue'
// TODO DELETE
import { metaMeta } from '@/utils/meta/meta'
import { fieldMeta } from '@/utils/meta/field'

export default {
    props: {
        setting: {
            type: String,
            required: true
        }
    },

    methods: {
        rowClick(row, column, event) {
            // 刷新子表
            this.$refs.slave.triggerFetchData({ masterKey: row.id })
            console.log(row, column, event)
        }
    },

    computed: {
        masterMeta() {
            // TODO DELETE
            return metaMeta
        },
        slaveMeta() {
            return fieldMeta
        }
    },
    components: {
        Singletable
    }
}

</script>
<template>
    <singletable :meta="meta" />
</template>

<script>
import Singletable from '@/components/tables/Singletable/index.vue'

export default {
    props: {
        setting: {
            type: String,
            required: true
        }
    },
    computed: {
        meta() {
            let setting = JSON.parse(this.setting)
            const metaCode = setting.metaCode
            // 获取字段信息
            
            console.log(metaCode)
            return {
                code: metaCode,
            }
        }
    },
    components: {
        Singletable
    },
}
</script>

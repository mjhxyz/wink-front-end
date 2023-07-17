<template>
    <el-select :value="value" :placeholder="placeholder" @change="change">
        <el-option key="" label="" value="" />
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
</template>

<script>
export default {
    props: {
        value: { // 绑定值
            type: String | Number,
            default: ''
        },
        placeholder: { // 提示
            type: String,
            default: ''
        },
        options: { // 选项
            type: Array,
            default: () => []
        },
    },
    data() {
        return {}
    },
    methods: {
        change(value) {
            this.$emit('update:value', value)
        }
    }
}
</script>
<!-- 密码框 -->
<template>
    <el-input class="wink-form-item" v-model="val" :placeholder="placeholder" @change="change" show-password />
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
    },
    data() {
        return {
            val: this.value // 付给初始值
        }
    },
    methods: {
        change(value) {
            this.$emit('input', value)
        }
    }
}
</script>
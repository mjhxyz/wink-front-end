<!-- 整数框 -->
<template>
  <el-input v-model.number="val" oninput="value=value.replace(/[^\d]/g,'')" class="wink-form-item" :placeholder="placeholder" @change="change" />
</template>

<script>
export default {
  props: {
    value: { // 绑定值
      type: Number,
      default: undefined
    },
    placeholder: { // 提示
      type: String,
      default: ''
    }
  },
  data() {
    return {
      val: this.value // 付给初始值
    }
  },
  methods: {
    change(value) {
      this.$emit('input', parseInt(value))
    }
  }
}
</script>

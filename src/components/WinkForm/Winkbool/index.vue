<!-- 布尔框 -->
<template>
  <el-switch
    v-model="val"
    active-color="#13ce66"
    active-value="1"
    inactive-value="0"
    @change="change"
  />
</template>

<script>
export default {
  props: {
    value: { // 绑定值
      type: [Number, Boolean],
      default: false
    }
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

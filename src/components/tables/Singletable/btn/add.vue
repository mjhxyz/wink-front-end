<template>
  <div style="display: inline-block; margin-right: 10px;">
    <el-button size="small" type="primary" :icon="icon">新增</el-button>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: ''
    }
  }
}
</script>

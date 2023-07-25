<template>
  <div class="">
    <el-form ref="form" :inline="true" label-width="120px">
      <el-form-item label="Meta" prop="name">
        <el-input ref="name" v-model="form.name" style="width: 200px;" placeholder="请输入名称" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

export default {
  components: {
  },
  props: {
  },
  data() {
    return {
      form: {}
    }
  },
  computed: {
  }
}
</script>

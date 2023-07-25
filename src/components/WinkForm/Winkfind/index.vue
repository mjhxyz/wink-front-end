<!-- 查找框 -->
<template>
  <div>
    <el-dialog
      title="请选择数据"
      :visible.sync="showX"
      width="30%"
      append-to-body
    >
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showX = false">取 消</el-button>
        <el-button type="primary" @click="showX = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-input
      v-model="val"
      class="wink-form-item wink-form-item-find"
      :placeholder="placeholder"
      suffix-icon="el-icon-search"
      :readonly="true"
      @change="change"
      @click.native="handleClick"
    />

  </div>

</template>

<script>
export default {
  props: {
    value: { // 绑定值
      type: [String, Number],
      default: ''
    },
    placeholder: { // 提示
      type: String,
      default: '世间当真有两全法'
    },
    metaCode: { // 元数据编码
      type: String,
      required: true
    },
    fieldCode: { // 字段编码
      type: String,
      required: true
    }
  },
  data() {
    return {
      showX: false, // 查找模态框
      val: this.value // 付给初始值
    }
  },
  methods: {
    handleClick() { // 点击查找框
      console.log('你好')
      this.showX = true
    },
    change(value) {
      this.$emit('input', value)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

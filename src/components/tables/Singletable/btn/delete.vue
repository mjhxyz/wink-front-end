<template>
  <div style="display: inline-block; margin-right: 10px;">
    <el-button type="danger" size="small" :icon="icon" @click="onClick">删除</el-button>
  </div>
</template>
<script>
export default {
  props: {
    icon: {
      type: String,
      default: ''
    },
    table: {
      type: Object,
      required: true
    },
    detailFields: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      showDetail: false, // 展示详情
      detailItem: {} // 详情数据
    }
  },
  methods: {
    fetchData() {
    },
    onClick() {
      const itemList = this.table.getSelection()
      if (itemList.length === 0) {
        this.$message({
          message: '请选择要删除的数据',
          type: 'warning'
        })
        return
      }
      this.$confirm(`此操作将永久删除该 ${itemList.length} 项数据, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$emit('delete', itemList, (e) => {
          if (e === true) {
            this.$message.success('删除成功')
            this.$emit('refresh')
          }
        })
      }).catch(() => { })
    }
  }
}
</script>

<template>
  <div style="display: inline-block; margin-right: 10px;">
    <el-dialog title="详情" :visible.sync="showDetail" width="800px">
      <!-- 详细信息弹出框 -->
      <el-descriptions title="" border>
        <el-descriptions-item v-for="field in detailFields" :key="field.name" :label="field.label">
          <span v-if="field.compo === '下拉框' && field.e_select_mapping">
            {{ field.e_select_mapping[detailItem[field.name]] }}
          </span>
          <span v-else-if="field.formatter">
            {{ field.formatter(detailItem[field.name]) }}
          </span>
          <span v-else-if="field.dict">
            {{ field.dict[detailItem[field.name]] }}
          </span>
          <span v-else>{{ detailItem[field.name] }}</span>
        </el-descriptions-item>
      </el-descriptions>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="showDetail = false">关 闭</el-button>
      </span>
    </el-dialog>
    <el-button type="success" size="small" :icon="icon" @click="onClick">详情</el-button>
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
    onClick() {
      // 获取选中的数据
      const selectedData = this.table.getSelection()
      if (selectedData.length !== 1) {
        this.$message({
          message: '请选择一条数据',
          type: 'warning'
        })
        return
      }
      this.detailItem = selectedData[0]
      this.showDetail = true
    }
  }
}
</script>

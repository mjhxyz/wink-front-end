<!-- 查找框 -->
<template>
  <div>
    <el-dialog
      title="请选择数据"
      :visible.sync="showX"
      width="30%"
      append-to-body
    >
      <el-table
        :data="findData"
        border
        style="width: 100%"
        @current-change="clickChange"
        @row-dblclick="doubleClick"
      >
        <el-table-column label="" width="55">
          <template slot-scope="scope">
            <el-radio v-model="tableRadio" :label="scope.row"><i /></el-radio>
          </template>
        </el-table-column>
        <el-table-column
          v-for="field in fieldList"
          :key="field"
          :prop="field"
          :label="field"
        />
        <el-table-column
          v-if="fieldList.length === 0"
          key="id"
          prop="id"
          label="数据"
        />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showX = false">取 消</el-button>
        <el-button type="primary" @click="clickConfirm">确 定</el-button>
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
import { queryFindList } from '@/api/widgets/winkfind'

export default {
  props: {
    value: { // 绑定值
      type: [String, Number],
      default: ''
    },
    placeholder: { // 提示
      type: String,
      default: '请选择'
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
      val: this.value, // 付给初始值
      findData: [], // 查找框的数据
      fieldList: [], // 表格的字段
      tableRadio: '' // 表格的单选框
    }
  },
  computed: {
  },
  watch: {
    async showX(val) {
      if (val) {
        // 请求数据
        const result = await queryFindList('wink_field', 'meta_code')
        this.findData = result.data.data
        this.fieldList = result.data.field_list
        console.log(this.findData, this.fieldList)
      }
    }
  },
  methods: {
    doubleClick() {
      this.clickConfirm()
    },
    clickConfirm() {
      // 点击确定
      if (!this.tableRadio) {
        this.$message.warning('请选择数据')
        return
      }
      if (this.fieldList.length === 0) {
        this.$error('没有字段列')
      }
      this.showX = false
      const val = this.tableRadio[this.fieldList[0]]
      this.val = val
      this.change(val) // # 手动触发change事件
    },
    clickChange(item) {
      this.tableRadio = item
    },
    handleClick() { // 点击查找框
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

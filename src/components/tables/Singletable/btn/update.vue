<template>
  <div style="display: inline-block; margin-right: 10px;">
    <el-dialog :title="formTitle" :visible.sync="showForm" width="800px" :close-on-click-modal="false">
      <!-- 添加信息弹出框 -->
      <el-form ref="form" class="record-dialog wink-scollbar" :inline="true" :model="form" label-width="150px" :rules="addRules">
        <el-form-item v-for="field in editFields" :key="field.name" :label="field.label" :prop="field.name">
          <winkinput
            v-if="!field.compo || field.compo === '文本框'"
            v-model="form[field.name]"
            :placeholder="field.placeholder"
          />
          <winknumber
            v-else-if="field.compo==='整数框'"
            v-model="form[field.name]"
            :placeholder="field.placeholder"
          />
          <winkpassword
            v-else-if="field.type.name === 'password'"
            v-model="form[field.name]"
            :placeholder="field.placeholder"
          />
          <el-date-picker
            v-else-if="field.compo === 'datetime' || field.compo === '日期时间框'"
            v-model="form[field.name]"
            style="width: 200px;"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            :placeholder="field.placeholder || '选择日期时间'"
          />
          <winkselect
            v-else-if="field.compo === '下拉框'"
            :label="field.label"
            :name="field.name"
            :placeholder="field.placeholder"
            :value.sync="form[field.name]"
            :options="field.e_select"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="success" @click="submit">提 交</el-button>
        <el-button type="danger" @click="showForm = false">关 闭</el-button>
      </span>
    </el-dialog>
    <el-button size="small" type="primary" :icon="icon" @click="click">修改</el-button>
  </div>
</template>

<script>
import Winkselect from '@/components/WinkForm/Winkselect'
import Winkinput from '@/components/WinkForm/Winkinput'
import Winknumber from '@/components/WinkForm/Winknumber'
import Winkpassword from '@/components/WinkForm/Winkpassword'

export default {
  components: {
    Winkselect,
    Winkinput,
    Winknumber,
    Winkpassword
  },
  props: {
    icon: {
      type: String,
      default: ''
    },
    table: {
      type: Object,
      required: true
    },
    addRules: { // 表单验证规则
      type: Object,
      default: () => ({})
    },
    formTitle: { // 表单标题
      type: String,
      default: ''
    },
    editFields: { // 表单字段
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      showForm: false, // 展示表单
      form: {} // 表单数据
    }
  },
  methods: {
    click() {
      const selectedData = this.table.getSelection()
      if (selectedData.length !== 1) {
        this.$message({
          message: '请选择一条数据',
          type: 'warning'
        })
        return
      }
      this.showForm = true
      this.form = Object.assign({}, selectedData[0])
    },
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit('edit', this.form, (e) => {
            if (e === true) {
              this.$message.success('修改成功')
              this.$emit('refresh')
            }
          })
          this.showForm = false
        }
      })
    }
  }
}
</script>

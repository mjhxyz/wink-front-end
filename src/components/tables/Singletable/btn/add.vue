<template>
  <div style="display: inline-block; margin-right: 10px;">
    <el-dialog :title="formTitle" :visible.sync="showForm" width="800px" :close-on-click-modal="false">
      <!-- 添加信息弹出框 -->
      <el-form ref="form" class="record-dialog wink-scollbar" :inline="true" :model="form" label-width="150px" :rules="tableRules">
        <el-form-item v-for="field in formFields" :key="field.name" :label="field.label" :prop="field.name">
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
  },
  data() {
    return {
      showForm: false, // 展示表单
      formTitle: '', // 表单标题
      formFields: [], // 表单字段
      form: {}, // 表单数据
      tableRules: {} // 表单验证规则
    }
  }
}
</script>

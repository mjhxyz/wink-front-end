<template>
  <div>
    <el-dialog title="添加系统菜单" :visible.sync="show" width="800px" :close-on-click-modal="false">
      <el-form ref="form" :inline="true" :rules="formRules" :model="form" label-width="120px">
        <fieldset>
          <legend>菜单信息:</legend>
          <el-form-item label="名称" prop="name">
            <el-input ref="name" v-model="form.name" style="width: 200px;" placeholder="请输入名称" />
          </el-form-item>
          <el-form-item label="编码" prop="code">
            <el-input ref="code" v-model="form.code" style="width: 200px;" placeholder="请输入编码" />
          </el-form-item>
          <el-form-item label="业务模板" prop="type">
            <el-select ref="type" v-model="form.type" style="width:200px" placeholder="请选择业务模板">
              <el-option v-for="temp in templateList" :key="temp.code" :label="temp.name" :value="temp.code" />
            </el-select>
          </el-form-item>
        </fieldset>
        <p />
        <fieldset v-if="form.type">
          <legend>
            <span style="font-weight: bold; color: #7559ff; font-size: 20px;">[{{ templateName }}]</span>
            配置
          </legend>
          <component :is="templateSettingComponent" ref="setting" str="配置组件" />
        </fieldset>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addMenu">添 加</el-button>
        <el-button @click="show = false">取 消</el-button>
      </span>
    </el-dialog>
    <el-button size="small" type="primary" icon="el-icon-plus" @click="click">添加系统菜单</el-button>
  </div>
</template>

<script>
import { TEMPLATE_LIST } from '@/utils/templates'
import { addMenu } from '@/api/menu'

export default {
  components: {},
  props: {
    table: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      templateList: TEMPLATE_LIST, // 模板列表
      form: {},
      formRules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入编码', trigger: 'blur' },
          { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
        ],
        type: [{ required: true, message: '请选择业务模板', trigger: 'blur' }]
      },
      show: false
    }
  },
  computed: {
    templateName() {
      const temp = this.templateList.find(item => item.code === this.form.type)
      return temp ? temp.name : ''
    },
    templateSettingComponent() {
      const temp = this.templateList.find(item => item.code === this.form.type)
      return temp ? temp.settingComponent : ''
    }
  },
  methods: {
    async valideMenuForm() {
      // 检查两个表单是否填写完整
      const formValidatePromise = new Promise((resolve, reject) => {
        this.$refs.form.validate(valid => {
          resolve(valid)
        })
      })
      let setting = Promise.resolve(false)
      if (this.$refs.setting) {
        setting = this.$refs.setting.validateForm()
      }
      const [formValid, settingValid] = await Promise.all([formValidatePromise, setting])
      return Promise.resolve(formValid && settingValid)
    },
    async addMenu() {
      const valid = await this.valideMenuForm()
      if (!valid) {
        return
      }
      const setting = this.$refs.setting.getSetting()
      const params = {
        name: this.form.name,
        code: this.form.code,
        type: this.form.type,
        parent_id: this.form.parent_id,
        setting: setting
      }

      addMenu(params).then(res => {
        this.$message({
          message: '添加成功',
          type: 'success'
        })
        this.show = false
        this.$emit('refresh')
      })
    },
    click() {
      // 检查是否选择了菜单记录
      const selectionList = this.table.getSelection()
      if (selectionList.length === 0) {
        this.$confirm(`还没有选择菜单目录，是否添加【顶级菜单】？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.form.parent_id = 0
          this.show = true
        }).catch(() => {})
      } else if (selectionList.length > 1) {
        this.$message({
          message: '只能选择一个菜单目录',
          type: 'warning'
        })
        return
      }
      const row = selectionList[0]
      if (row.type !== 'dir') {
        this.$message({
          message: '只能选择菜单目录',
          type: 'warning'
        })
        return
      } else {
        this.form.parent_id = selectionList[0].id
        this.show = true
      }
    }
  }
}
</script>

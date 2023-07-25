<template>
  <div class="app-container">
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
          <component :is="templateSettingComponent" str="配置组件" />
        </fieldset>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="clickAdd">添 加</el-button>
        <el-button @click="show = false">取 消</el-button>
      </span>
    </el-dialog>

    <singletable ref="table" :meta="meta">
      <template #nav-btn>
        <el-button size="small" type="primary" icon="el-icon-plus" @click="addMenu">添加系统菜单</el-button>
      </template>
    </singletable>
  </div>
</template>

<script>
import { menuMeta } from '@/utils/meta/menu'
import Singletable from '@/components/tables/Singletable/index.vue'
import { getMetaList } from '@/api/planform/meta'
import { addMenu } from '@/api/menu'
import { TEMPLATE_LIST } from '@/utils/templates'

export default {
  components: {
    Singletable
  },
  data() {
    return {
      templateList: TEMPLATE_LIST, // 模板列表
      show: false,
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
        type: [
          { required: true, message: '请选择业务模板', trigger: 'blur' }
        ],
        meta: [
          { required: true, message: '请输入meta', trigger: 'blur' }
        ]
      },
      metaList: [],

      meta: menuMeta
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
  watch: {
    show(val) {
      if (!val) {
        this.$refs.form.resetFields()
      }
    }
  },
  mounted() {
    getMetaList().then(res => {
      this.metaList = res.data
    })
  },
  methods: {
    clickAdd() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const setting = {
            meta: this.form.meta
          }
          const params = {
            name: this.form.name,
            code: this.form.code,
            type: this.form.type,
            setting: JSON.stringify(setting)
          }

          addMenu(params).then(res => {
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            this.show = false
            this.$refs.table.triggerFetchData()
          })
        }
      })
    },
    addMenu() {
      this.show = true
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  height: 100%;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
}
</style>

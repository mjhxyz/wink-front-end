<template>
  <div class="app-container">
    <el-dialog title="添加系统菜单" :visible.sync="show" width="800px" :close-on-click-modal="false">
      <el-form :inline="true" :rules="formRules" ref="form" :model="form" label-width="120px">
        <fieldset>
          <legend>菜单信息:</legend>
          <el-form-item label="名称" prop="name">
            <el-input ref="name" v-model="form.name" placeholder="请输入名称" />
          </el-form-item>
          <el-form-item label="编码" prop="code">
            <el-input ref="code" v-model="form.code" placeholder="请输入编码" />
          </el-form-item>
          <el-form-item label="业务模板" prop="type">
            <el-select style="width:187px" ref="type" v-model="form.type" placeholder="请选择业务模板">
              <el-option label="单表" value="singletable"></el-option>
            </el-select>
          </el-form-item>
        </fieldset>
        <fieldset>
          <legend>模板配置:</legend>
          <el-form-item label="Meta" prop="meta">
            <el-select v-model="form.meta" clearable placeholder="请选择">
              <el-option v-for="item in metaList" :key="item.code" :label="item.name" :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
        </fieldset>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="clickAdd">添 加</el-button>
        <el-button @click="show = false">取 消</el-button>
      </span>
    </el-dialog>

    <singletable ref="table" :meta="meta">
      <template #nav-btn>
        <el-button @click="addMenu" size="small" type="primary" icon="el-icon-plus">添加系统菜单</el-button>
      </template>
    </singletable>
  </div>
</template>

<script>
import { menuMeta } from '@/utils/meta/menu'
import Singletable from '@/components/tables/Singletable/index.vue'
import { getMetaList } from '@/api/planform/meta'
import { addMenu } from '@/api/menu'

export default {
  components: {
    Singletable
  },
  watch: {
    show(val) {
      if (!val) {
        this.$refs.form.resetFields()
      }
    }
  },
  data() {
    return {
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
  methods: {
    clickAdd() {
      this.$refs.form.validate(valid => {
        if (valid) {
          let setting = {
            meta: this.form.meta,
          }
          let params = {
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
    },
  },
  mounted() {
    getMetaList().then(res => {
      this.metaList = res.data
    })
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
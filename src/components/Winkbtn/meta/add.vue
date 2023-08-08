<template>
  <div style="display: inline-block; margin-right: 10px;">
    <el-dialog title="添加Meta数据" :visible.sync="show" width="800px" :close-on-click-modal="false">
      <el-form ref="form" :inline="true" :rules="formRules" :model="form" label-width="120px">
        <el-form-item label="数据表" prop="table">
          <el-cascader
            ref="table"
            v-model="form.table"
            :props="selectProps"
            placeholder="请选择数据源和数据表"
            style="width: 100%;"
            clearable
            filterable
          />
        </el-form-item>
        <el-form-item label="Meta名称" prop="name">
          <el-input ref="name" v-model="form.name" />
        </el-form-item>
        <el-form-item label="Meta编码" prop="code">
          <el-input ref="code" v-model="form.code" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="clickAdd">添 加</el-button>
        <el-button @click="show = false">取 消</el-button>
      </span>
    </el-dialog>
    <el-button size="small" type="primary" icon="el-icon-plus" @click="click">添加元数据</el-button>
  </div>
</template>

<script>
import { getSourceList, getTableList } from '@/api/planform/db_meta'
import { addMeta } from '@/api/planform/meta'

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
      form: {
        table: [],
        name: '',
        code: ''
      },
      formRules: {
        table: [
          { required: true, message: '请选择数据表', trigger: 'change' }
        ],
        name: [
          { required: true, message: '请输入Meta名称', trigger: 'blur' },
          { min: 2, max: 32, message: '长度在 2 到 32 个字符', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入Meta编码', trigger: 'blur' },
          { min: 2, max: 32, message: '长度在 2 到 32 个字符', trigger: 'blur' }
        ]
      },
      show: false,
      selectProps: {
        lazy: true,
        lazyLoad(node, resolve) {
          const { root } = node
          if (root) {
            // 根节点获取数据源
            getSourceList().then(res => {
              const nodes = res.data.map(item => ({
                value: item,
                label: item,
                leaf: false
              }))
              resolve(nodes)
            })
            return
          } else {
            // 子节点获取数据表
            getTableList(node.value).then(res => {
              const nodes = res.data.map(item => ({
                value: item,
                label: item,
                leaf: true
              }))
              resolve(nodes)
            })
          }
        }
      }
    }
  },
  computed: {
  },
  watch: {
    show(val) {
      if (!val) {
        this.$refs.form.resetFields() // 清空表单
      }
    }
  },
  methods: {
    clickAdd() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const tableArray = this.form.table
          const table = tableArray[1]
          const source = tableArray[0]
          const data = {
            ...this.form
          }
          data.table = table
          data.source = source
          addMeta(data).then(res => {
            this.$message.success('添加成功')
            this.$emit('refresh')
            this.show = false
          })
        }
      })
    },
    click() {
      this.show = true
    }
  }
}
</script>

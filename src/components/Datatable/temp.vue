<template>
  <div class="datatable-wrapper">
    <el-dialog :title="formTitle" :visible.sync="showForm" width="800px" :close-on-click-modal="false">
      <!-- 添加信息弹出框 -->
      <el-form ref="form" :inline="true" :model="form" label-width="150px" :rules="tableRules">
        <el-form-item v-for="field in formFields" :key="field.name" :label="field.label" :prop="field.name">
          <winkinput
            v-if="!field.compo || field.compo === '文本框' || field.compo==='整数框'"
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

    <el-dialog title="详情" :visible.sync="showDetail" width="800px">
      <!-- 详细信息弹出框 -->
      <el-descriptions title="" border>
        <el-descriptions-item v-for="field in detailFields" :key="field.name" :label="field.label">
          <span v-if="field.formatter">
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

    <div v-if="navBtn" class="app-header">
      <slot name="nav-btn" />
      <el-button v-if="navBtnAdd" size="small" type="primary" icon="el-icon-plus" @click="clickAdd">新增</el-button>
      <el-button v-if="navBtnEdit" size="small" type="warning" icon="el-icon-edit" @click="clickEdit">修改</el-button>
      <el-button v-if="navBtnDelete" size="small" type="danger" icon="el-icon-delete" @click="clickDelete">删除</el-button>
      <el-button v-if="navBtnDetail" size="small" type="success" icon="el-icon-info" @click="clickDetail">详情</el-button>
    </div>
    <el-table
      ref="table"
      v-loading="listLoading"
      class="app-body"
      :data="table.list"
      element-loading-text="加载中..."
      border
      fit
      height="100%"
      highlight-current-row
      @row-click="triggerRowClick"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column v-if="index" align="center" label="#" width="95">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column v-for="field in tableFields" :key="field.name" :label="field.label" :align="field.align">
        <template slot-scope="scope">
          <span v-if="field.formatter">
            {{ field.formatter(scope.row[field['name']], scope.row) }}
          </span>
          <span v-else-if="field.dict">
            {{ field.dict[scope.row[field['name']]] }}
          </span>
          <span v-else>{{ scope.row[field['name']] }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="opBtn" :label="'操作'" align="center" width="300" fixed="right">
        <template slot-scope="scope">
          <el-button
            v-if="opBtnEdit"
            size="mini"
            type="warning"
            icon="el-icon-edit"
            @click="edit(scope.row)"
          >修改</el-button>
          <el-button
            v-if="opBtnDetail"
            size="mini"
            type="success"
            icon="el-icon-info"
            @click="detail(scope.row)"
          >详情</el-button>
          <el-button
            v-if="opBtnDelete"
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="deleteItems([scope.row])"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="app-footer">
      <el-pagination
        v-if="pagination"
        background
        layout="total, sizes, prev, pager, next"
        :total="table.total"
        :current-page.sync="table.curPage"
        :page-sizes="[5, 10, 15, 20, 50, 100]"
        @size-change="sizeChange"
        @current-change="currentChange"
      />
    </div>

  </div>
</template>

<script>
import Winkselect from '@/components/WinkForm/Winkselect'
import Winkinput from '@/components/WinkForm/Winkinput'
import Winkpassword from '@/components/WinkForm/Winkpassword'
import { querySelectList } from '@/api/form/winkselect'

export default {
  components: {
    Winkselect,
    Winkinput,
    Winkpassword
  },
  props: {
    fetchOnCreated: { // 是否在组件创建时自动加载数据
      type: Boolean,
      default: true
    },

    pagination: { // 是否分页
      type: Boolean,
      default: true
    },
    index: { // 是否显示序号
      type: Boolean,
      default: true
    },
    mutiple: { // 是否多选
      type: Boolean,
      default: true
    },
    fields: { // 表格字段
      type: Array,
      default: () => []
    },

    opBtn: { // 操作按钮
      type: Boolean,
      default: true
    },
    opBtnDetail: { // 是否显示详情按钮
      type: Boolean,
      default: true
    },
    opBtnEdit: { // 是否显示修改按钮
      type: Boolean,
      default: true
    },
    opBtnDelete: { // 是否显示删除按钮
      type: Boolean,
      default: true
    },
    navBtn: { // 是否展示顶部导航按钮
      type: Boolean,
      default: true
    },
    navBtnAdd: { // 是否展示顶部导航新增按钮
      type: Boolean,
      default: true
    },
    navBtnEdit: { // 是否展示顶部导航修改按钮
      type: Boolean,
      default: true
    },
    navBtnDelete: { // 是否展示顶部导航删除按钮
      type: Boolean,
      default: true
    },
    navBtnDetail: { // 是否展示顶部导航详情按钮
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      status: 0, // 0: 正常的浏览 1: 添加 2: 修改
      form: {}, // 表单

      showDetail: false, // 是否显示详情
      detailItem: {}, // 详情数据

      listLoading: false,
      table: {
        list: [],
        total: 0,
        page: 1,
        pageSize: 10
      }
    }
  },

  computed: {
    showForm: {
      get() {
        return this.status === 1 || this.status === 2
      },
      set(val) {
        this.status = 0
      }
    },
    formTitle() {
      if (this.status === 1) {
        return '新增'
      } else if (this.status === 2) {
        return '修改'
      } else {
        return ''
      }
    },
    detailFields() {
      return this.fields.filter(field => !field.is_hide_detail)
    },
    formFields() {
      if (this.status === 1) {
        return this.addibleFields
      } else if (this.status === 2) {
        return this.editableFields
      } else {
        return []
      }
    },
    addibleFields() { // 能新增的字段
      return this.fields.filter(field => field.addible !== false)
    },
    editableFields() { // 能修改的字段
      return this.fields.filter(field => field.editable !== false)
    },
    tableFields() { // 能显示的字段
      return this.fields.filter(field => !field.is_hide)
    },
    tableRules() { // 新增表单验证规则
      const rules = {}
      for (const field of this.fields) {
        const rule = []
        if (field.required) {
          rule.push({ required: true, message: `请输入${field.label}`, trigger: 'blur' })
        }
        if (field.max_length) {
          rule.push({ max: field.max_length, message: `${field.label}最大长度为${field.max_length}`, trigger: 'blur' })
        }
        if (field.min_length) {
          rule.push({ min: field.min_length, message: `${field.label}最小长度为${field.min_length}`, trigger: 'blur' })
        }
        if (field.validate) {
          rule.push({
            validator: (rule, value, callback) => {
              const res = field.validate(value, this.form)
              if (res) {
                callback(new Error(res))
              } else {
                callback()
              }
            }, trigger: 'blur'
          })
        }
        rules[field.name] = rule
      }
      return rules
    }
  },

  watch: {
    'table.curPage': {
      handler() {
        this.fetchData()
      }
    }
  },

  async mounted() {
    if (this.fetchOnCreated) {
      this.fetchData()
    }
  },
  methods: {
    triggerRowClick(row, column, event) {
      this.$emit('row-click', row, column, event)
    },
    submit() {
      if (this.status === 1) {
        this.addSubmit()
      } else if (this.status === 2) {
        this.editSubmit()
      }
    },

    addSubmit() { // 新增提交
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit('add', this.form, (e) => {
            if (e === true) {
              this.$message.success('新增成功')
              this.fetchData()
            }
          })
          this.status = 0
        }
      })
    },
    async clickAdd() { // 点击新增按钮
      this.form = {}
      // 默认值
      const form = {}
      for (const field of this.fields) {
        if (field.default !== undefined) {
          if (typeof field.default === 'function') {
            form[field.name] = field.default()
          } else {
            form[field.name] = field.default
          }
        }
      }
      // this.form = Object.assign({}, form)
      this.form = { ...form }
      this.status = 1
    },

    editSubmit() { // 修改提交
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit('edit', this.form, (e) => {
            if (e === true) {
              this.$message.success('修改成功')
              this.fetchData()
            }
          })
          this.showForm = false
        }
      })
    },
    edit(item) {
      // 需要先拷贝一份，否则会影响到原数据
      this.form = { ...item }
      this.status = 2
    },
    async clickEdit() {
      // 获取选中的数据
      const selectedData = this.$refs.table.selection
      if (selectedData.length !== 1) {
        this.$message({
          message: '请选择一条数据',
          type: 'warning'
        })
        return
      }
      this.edit(selectedData[0])
    },

    detail(item) {
      this.detailItem = item
      this.showDetail = true
    },
    clickDetail() {
      // 获取选中的数据
      const selectedData = this.$refs.table.selection
      if (selectedData.length !== 1) {
        this.$message({
          message: '请选择一条数据',
          type: 'warning'
        })
        return
      }
      this.detail(selectedData[0])
      // this.$emit('clickDetail')
    },

    deleteItems(itemList) {
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
        if (itemList.length === 1) { // 删除单个
          this.$emit('deleteOne', itemList[0], (e) => {
            if (e === true) {
              this.$message.success('删除成功')
              this.fetchData()
            }
          })
        } else { // 删除多个
          this.$emit('delete', itemList, (e) => {
            if (e === true) {
              this.$message.success('删除成功')
              this.fetchData()
            }
          })
        }
      }).catch(() => { })
    },
    clickDelete() { // 批量删除
      // 获取选中的数据
      const selectedData = this.$refs.table.selection
      this.deleteItems(selectedData)
    },

    sizeChange(val) { // 每页显示条数改变
      this.table.page = 1
      this.table.pageSize = val
      this.fetchData()
    },
    currentChange(val) { // 当前页改变
      this.table.page = val
      this.fetchData()
    },
    fetchData(e) {
      this.listLoading = true
      let params = e || {}
      if (this.pagination) {
        params = {
          page: this.table.page,
          pageSize: this.table.pageSize
        }
      }
      this.$emit('fetchData', params, (response) => {
        this.table.list = response.items
        this.table.total = response.total
        this.table.page = response.page
        this.listLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.datatable-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.app-body {
  height: calc(100% - 40px);
}

.app-header {
  margin-bottom: 20px;
}

.app-footer {
  margin-top: 20px;
}
</style>

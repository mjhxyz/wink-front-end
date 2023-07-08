<template>
  <div class="datatable-wrapper">
    <el-dialog
      title="添加"
      :visible.sync="showAdd"
      width="800px"
      :close-on-click-modal="false"
    >
      <!-- 添加信息弹出框 -->
      <el-form
        ref="addform"
        :model="addForm"
        label-width="80px"
        :rules="tableRules"
      >
        <el-form-item
          v-for="field in addibleFields"
          :key="field.name"
          :label="field.label"
          :prop="field.name"
        >
          <el-input
            v-if="!field.type || field.type.name === 'text'"
            v-model="addForm[field.name]"
            :placeholder="field.placeholder"
          />
          <el-date-picker
            v-else-if="field.type.name === 'datetime'"
            v-model="addForm[field.name]"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            :placeholder="field.placeholder || '选择日期时间'"
          />
          <el-select
            v-else-if="field.type.name === 'select'"
            v-model="addForm[field.name]"
            :placeholder="field.placeholder"
          >
            <el-option
              v-for="item in field.type.params"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="success"
          @click="addSubmit"
        >提 交</el-button>
        <el-button
          type="danger"
          @click="showAdd = false"
        >关 闭</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="修改"
      :visible.sync="showEdit"
      width="800px"
      :close-on-click-modal="false"
    >
      <el-form
        ref="editform"
        :model="editForm"
        label-width="80px"
        :rules="tableRules"
      >
        <el-form-item
          v-for="field in editableFields"
          :key="field.name"
          :label="field.label"
          :prop="field.name"
        >
          <el-input
            v-if="!field.type || field.type.name === 'text'"
            v-model="editForm[field.name]"
            :placeholder="field.placeholder"
          />
          <el-date-picker
            v-else-if="field.type.name === 'datetime'"
            v-model="editForm[field.name]"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            :placeholder="field.placeholder || '选择日期时间'"
          />
          <el-select
            v-else-if="field.type.name === 'select'"
            v-model="editForm[field.name]"
            :placeholder="field.placeholder"
          >
            <el-option
              v-for="item in field.type.params"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <!-- 修改信息弹出框 -->
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="success"
          @click="editSubmit"
        >保存修改</el-button>
        <el-button
          type="danger"
          @click="showEdit = false"
        >关 闭</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="详情"
      :visible.sync="showDetail"
      width="800px"
    >
      <!-- 详细信息弹出框 -->
      <el-descriptions
        title=""
        border
      >
        <el-descriptions-item
          v-for="field in fields"
          :key="field.name"
          :label="field.label"
        >
          <span v-if="field.formatter">
            {{ field.formatter(detailItem[field.name]) }}
          </span>
          <span v-else-if="field.dict">
            {{ field.dict[detailItem[field.name]] }}
          </span>
          <span v-else>{{ detailItem[field.name] }}</span>
        </el-descriptions-item>
      </el-descriptions>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="showDetail = false"
        >关 闭</el-button>
      </span>
    </el-dialog>

    <div v-if="navBtn" class="app-header">
      <el-button
        v-if="navBtnAdd"
        size="small"
        type="primary"
        icon="el-icon-plus"
        @click="clickAdd"
      >新增</el-button>
      <el-button
        v-if="navBtnEdit"
        size="small"
        type="warning"
        icon="el-icon-edit"
        @click="clickEdit"
      >修改</el-button>
      <el-button
        v-if="navBtnDelete"
        size="small"
        type="danger"
        icon="el-icon-delete"
        @click="clickDelete"
      >删除</el-button>
      <el-button
        v-if="navBtnDetail"
        size="small"
        type="success"
        icon="el-icon-info"
        @click="clickDetail"
      >详情</el-button>
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
    >
      <el-table-column
        type="selection"
        width="55"
      />
      <el-table-column
        v-if="index"
        align="center"
        label="#"
        width="95"
      >
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column
        v-for="field in tableFields"
        :key="field.name"
        :label="field.label"
        :align="field.align"
      >
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
      <el-table-column
        v-if="opBtn"
        :label="'操作'"
        align="center"
        width="300"
        fixed="right"
      >
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
import { getRequest } from '@/api/meta'
import { wait } from '@/utils'

// meta select 缓存, key: field
const metaSelectCache = {}

export default {
  props: {
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
      addForm: {}, // 新增表单
      showAdd: false, // 是否显示新增

      showDetail: false, // 是否显示详情
      detailItem: {}, // 详情数据

      editForm: {}, // 修改表单
      showEdit: false, // 是否显示修改

      listLoading: true,
      table: {
        list: [],
        total: 0,
        page: 1,
        pageSize: 10
      }
    }
  },

  computed: {
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
        rules[field.name] = rule
      }
      return rules
    }
  },

  async created() {
    await this.beforeShowForm()
    this.fetchData()
  },
  methods: {
    async beforeShowForm() { // 显示表单前
      // meta 选择器
      for (const field of this.fields) {
        if (field.type && field.type.name === 'meta-select') {
          const { meta, value, label } = field.type.params
          const request = getRequest(meta)
          const res = await request.getList()
          let items = res.data.items
          const dict = {}
          items = items.map(item => {
            dict[item[value]] = item[label]
            return {
              value: item[value],
              label: item[label]
            }
          })
          field.type = { // 转换为 普通的 select
            name: 'select',
            params: items
          }
          field.dict = { ...dict }
        }
      }
    },

    addSubmit() { // 新增提交
      this.$refs.addform.validate((valid) => {
        if (valid) {
          this.$emit('add', this.addForm, (e) => {
            if (e) {
              this.$message.success('新增成功')
              this.fetchData()
            }
          })
          this.showAdd = false
        }
      })
    },
    clickAdd() { // 点击新增按钮
      this.addForm = {}
      // 默认值
      const addForm = {}
      for (const field of this.fields) {
        if (field.default !== undefined) {
          if (typeof field.default === 'function') {
            addForm[field.name] = field.default()
          } else {
            addForm[field.name] = field.default
          }
        }
      }
      // this.addForm = Object.assign({}, addForm)
      this.addForm = { ...addForm }
      this.showAdd = true
    },

    editSubmit() { // 修改提交
      this.$refs.editform.validate((valid) => {
        if (valid) {
          this.$emit('edit', this.editForm, (e) => {
            if (e) {
              this.$message.success('修改成功')
              this.fetchData()
            }
          })
          this.showEdit = false
        }
      })
    },
    edit(item) {
      // 需要先拷贝一份，否则会影响到原数据
      this.editForm = { ...item }
      this.showEdit = true
    },
    clickEdit() {
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
        this.$emit('delete', itemList, (e) => {
          if (e) {
            this.$message.success('删除成功')
            this.fetchData()
          }
        })
      }).catch(() => { })
    },
    clickDelete() {
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
    fetchData() {
      this.listLoading = true
      const params = {
        page: this.table.page,
        pageSize: this.table.pageSize
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

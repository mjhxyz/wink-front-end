<template>
  <div class="datatable-wrapper">
    <el-table
      ref="table"
      v-loading="listLoading"
      class="app-body wink-table-narrow wink-scollbar"
      :data="table.list"
      element-loading-text="加载中..."
      border
      fit
      height="100%"
      highlight-current-row
      @row-click="triggerRowClick"
      @select="triggerRowSelect"
      @select-all="triggerRowSelectAll"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column v-if="index" align="center" label="" width="60" fixed="left">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column v-for="field in tableFields" :key="field.name" :label="field.label" :align="field.align">
        <template slot-scope="scope">
          <span v-if="field.compo === '下拉框'">
            {{ field.e_select_mapping[scope.row[field['name']]] }}
          </span>
          <span v-else-if="field.formatter">
            {{ field.formatter(scope.row[field['name']], scope.row) }}
          </span>
          <span v-else-if="field.dict">
            {{ field.dict[scope.row[field['name']]] }}
          </span>
          <span v-else>{{ scope.row[field['name']] }}</span>
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
export default {
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
    tableFields: { // 表格字段
      type: Array,
      required: true
    }
  },
  data() {
    return {
      listLoading: false,
      table: {
        list: [],
        total: 0,
        page: 1,
        pageSize: 10
      }
    }
  },
  methods: {
    getSelection() {
      return this.$refs.table.selection
    },
    triggerRowSelectAll(selection) {
      if (!this.mutiple) {
        this.$refs.table.clearSelection()
      }
    },
    triggerRowSelect(selection, row) {
      // 手动勾选数据行的 Checkbox
      if (!this.mutiple) {
        this.$refs.table.clearSelection()
        this.$refs.table.toggleRowSelection(row, true)
      }
    },
    triggerRowClick(row, column, event) {
      // 多选的选择
      this.$refs.table.clearSelection()
      this.$refs.table.toggleRowSelection(row, true)
      this.$emit('row-click', row, column, event)
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
        this.$nextTick(() => {
          this.$refs.table.doLayout()
        })
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
.app-footer {
  margin-top: 20px;
}

</style>

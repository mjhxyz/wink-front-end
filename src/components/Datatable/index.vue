<template>
  <div class="datatable-wrapper">
    <el-dialog title="详情" :visible.sync="showDetail" width="800px">
      <!-- 详细信息弹出框 -->
      <el-descriptions title="" border>
        <el-descriptions-item :label="field.label" :key="field.name" v-for="field  in fields">
          {{ detailItem[field.name] }}
        </el-descriptions-item>
      </el-descriptions>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="showDetail = false">关 闭</el-button>
      </span>
    </el-dialog>
    <div class="app-header">
      <el-button size="small" type="primary" icon="el-icon-plus">新增</el-button>
      <el-button size="small" type="warning" icon="el-icon-edit">修改</el-button>
      <el-button size="small" type="danger" icon="el-icon-delete" @click="clickDelete">删除</el-button>
      <el-button size="small" type="success" icon="el-icon-info" @click="clickDetail">详情</el-button>
    </div>
    <el-table ref="table" class="app-body" v-loading="listLoading" :data="table.list" element-loading-text="加载中..." border
      fit height="100%" highlight-current-row>
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column align="center" label="#" width="95" v-if="index">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column :label="field.label" v-for="field in fields" :key="field.name" :align="field.align"
        v-if="!field.is_hide">
        <template slot-scope="scope">
          {{ scope.row[field['name']] }}
        </template>
      </el-table-column>
      <el-table-column :label="'操作'" align="center" width="300" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" type="warning" icon="el-icon-edit">修改</el-button>
          <el-button size="mini" type="success" icon="el-icon-info" @click="detail(scope.row)">详情</el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete" @click="deleteItems([scope.row])">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="app-footer">
      <el-pagination background layout="total, sizes, prev, pager, next" :total="table.total"
        :current-page.sync="table.curPage" :page-sizes="[5, 10, 15, 20, 50, 100]" @size-change="sizeChange"
        @current-change="currentChange">
      </el-pagination>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    index: {  // 是否显示序号
      type: Boolean,
      default: true
    },
    mutiple: {  // 是否多选
      type: Boolean,
      default: true
    },
    fields: {  // 表格字段
      type: Array,
      default: () => []
    },
    opBtn: {  // 操作按钮
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      showDetail: false,  // 是否显示详情
      detailItem: {},  // 详情数据

      listLoading: true,
      table: {
        list: [],
        total: 0,
        page: 1,
        pageSize: 10,
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
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
        this.$emit('clickDelete', itemList)
      }).catch(() => { })
    },
    clickDelete() {
      // 获取选中的数据
      const selectedData = this.$refs.table.selection
      this.deleteItems(selectedData)
    },
    sizeChange(val) {  // 每页显示条数改变
      this.table.page = 1
      this.table.pageSize = val
      this.fetchData()
    },
    currentChange(val) {  // 当前页改变
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

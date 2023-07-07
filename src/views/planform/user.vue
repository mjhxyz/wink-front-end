<template>
  <div class="app-container">
    <div class="app-header">
      <el-button size="small" type="primary" icon="el-icon-plus">新增</el-button>
      <el-button size="small" type="warning" icon="el-icon-edit">修改</el-button>
      <el-button size="small" type="danger" icon="el-icon-delete">删除</el-button>
      <el-button size="small" type="success" icon="el-icon-info">详情</el-button>
    </div>
    <el-table class="app-body" v-loading="listLoading" :data="table.list" element-loading-text="加载中..." border fit
      height="100%" highlight-current-row>
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column align="center" label="#" width="95">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="ID">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="用户名">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="角色" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.role }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="修改时间" width="200" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          {{ scope.row.update_time }}
        </template>
      </el-table-column>
      <el-table-column label="添加时间" width="200" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          {{ scope.row.add_time }}
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
import { getUserList } from '@/api/user_list'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        '正常': 'success',
        '停用': 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
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
      getUserList(params).then(response => {
        this.table.list = response.data.items
        this.table.total = response.data.total
        this.table.page = response.data.curPage
        this.listLoading = false
      })
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

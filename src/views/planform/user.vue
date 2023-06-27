<template>
  <div class="app-container">
    <datatable @fetchData="fetchData" :index="true" :fields="fields" />
  </div>
</template>

<script>
import { getUserList } from '@/api/user_list'
import Datatable from '@/components/Datatable/index.vue'

export default {
  components: {
    Datatable
  },

  data() {
    return {
      fields: [
        {
          label: 'ID',
          name: 'id',
          width: 100,
          align: 'center',
          // editable: 'readonly',
          editable: false,
          type: 'text', // 
          // is_hide: true,
        },
        {
          label: '用户名',
          name: 'name',
          // width: 100,
          align: 'center',
        },
        {
          label: '角色',
          name: 'role',
          // width: 100,
          align: 'center',
          type: [{ 'label': '普通用户', 'value': 0 }, { 'label': '管理员', 'value': 1 }, { 'label': '超级管理员', 'value': 2 }],
          formatter: (val, row, column = null, index) => {
            if (val == 0) {
              return '普通用户'
            } else if (val == 1) {
              return '管理员'
            } else if (val == 2) {
              return '超级管理员'
            }
          }
        },
        {
          label: '状态',
          name: 'status',
          width: 100,
          align: 'center',
          type: [{ 'label': '启用', 'value': 1 }, { 'label': '禁用', 'value': 0 }],
          dict: {
            1: '启用',
            0: '禁用'
          }
        },
        {
          label: '修改时间',
          name: 'update_time',
          width: 200,
          align: 'center',
          type: 'datetime',
          editable: 'readonly',
        },
        {
          label: '添加时间',
          name: 'add_time',
          width: 200,
          align: 'center',
          type: 'datetime',
          editable: 'readonly',
        }
      ]
    }
  },
  methods: {
    async fetchData(params, callback) {
      const result = await getUserList(params)
      const { page, total, items } = result.data
      callback({
        page,
        total,
        items
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
</style>
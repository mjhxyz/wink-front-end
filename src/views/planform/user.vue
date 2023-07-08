<template>
  <div class="app-container">
    <datatable :index="true" :fields="fields" :op-btn="true" @fetchData="fetchData" />
  </div>
</template>

<script>
import { getUserList } from '@/api/user_list'
import Datatable from '@/components/Datatable/index.vue'
import { parseTime } from '@/utils'

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
          addible: false,
          type: 'text'
          // is_hide: true
        },
        {
          label: '用户名',
          name: 'name',
          // width: 100,
          align: 'center',
          placeholder: '请输入用户名',
          validator: (val, row, index) => {
            if (val === '') {
              return '用户名不能为空'
            }
          },
          required: true, // 是否必填
          max_length: 10, // 最大长度
          min_length: 2 // 最小长度
        },
        {
          label: '角色',
          name: 'role',
          // width: 100,
          align: 'center',
          type: [{ 'label': '普通用户', 'value': 0 }, { 'label': '管理员', 'value': 1 }, { 'label': '超级管理员', 'value': 2 }],
          formatter: (val, row, index) => {
            if (val === 0) {
              return '普通用户'
            } else if (val === 1) {
              return '管理员'
            } else if (val === 2) {
              return '超级管理员'
            }
          },
          default: 0,
          required: true
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
          },
          placeholder: '请选择状态',
          default: 1,
          required: true
        },
        {
          label: '修改时间',
          name: 'update_time',
          width: 200,
          align: 'center',
          type: 'datetime',
          editable: 'readonly',
          default() {
            return parseTime(new Date())
          }
        },
        {
          label: '添加时间',
          name: 'add_time',
          width: 200,
          align: 'center',
          type: 'datetime',
          editable: 'readonly',
          placeholder: '请选择添加时间',
          validator: (val, row, index) => {
            if (val === '') {
              return '添加时间不能为空'
            }
          },
          default() {
            return parseTime(new Date())
          }
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

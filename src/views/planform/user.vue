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
          is_hide: true,
        },
        {
          label: '用户名',
          name: 'name',
          width: 100,
          align: 'center',
        },
        {
          label: '角色',
          name: 'role',
          width: 100,
          align: 'center',
        },
        {
          label: '状态',
          name: 'status',
          width: 100,
          align: 'center',
        },
        {
          label: '修改时间',
          name: 'update_time',
          width: 200,
          align: 'center',
        },
        {
          label: '添加时间',
          name: 'add_time',
          width: 200,
          align: 'center',
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
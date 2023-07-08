<template>
  <div class="app-container">
    <datatable :index="true" :nav-btn="true" :nav-btn-detail="false" :fields="fields" :op-btn="true" @fetchData="fetchData" @add="add" @edit="edit" @delete="deleteItems" />
  </div>
</template>

<script>
import { getUserList, addUser, editUser, deleteUser } from '@/api/planform/user_list'
import Datatable from '@/components/Datatable/index.vue'

export default {
  components: {
    Datatable
  },
  props: {
    meta: { // meta 描述
      type: Object,
      required: true
    }
  },

  data() {
  },

  computed: {
    fields() {
      return this.meta.fields
    },
    metaCode() {
      return this.meta.code
    }
  },
  methods: {
    add(item, callback) {
      // TODO 添加用户
      addUser(item).then(res => {
        callback(true)
      }).catch(e => {
        callback(e)
      })
    },

    edit(item, callback) {
      editUser(item).then(res => {
        callback(true)
      }).catch(e => {
        callback(false)
      })
    },

    deleteItems(items, callback) { // delete 是关键字，不能用
      // TODO 删除用户/删除单个用户
      deleteUser(items).then(res => {
        callback(true)
      }).catch(e => {
        callback(false)
      })
    },

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

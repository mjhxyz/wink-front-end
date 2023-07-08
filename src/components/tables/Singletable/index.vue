<template>
  <div class="app-container">
    <datatable :index="true" :nav-btn="true" :nav-btn-detail="false" :fields="fields" :op-btn="true" @fetchData="fetchData" @add="add" @edit="edit" @delete="deleteItems" />
  </div>
</template>

<script>
import { getRequest } from '@/api/meta'
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
    request() {
      return getRequest(this.metaCode)
    },
    fields() {
      return this.meta.fields
    },
    metaCode() {
      return this.meta.code
    }
  },
  methods: {
    add(item, callback) {
      this.request.add(item).then(res => {
        callback(true)
      }).catch(e => {
        callback(e)
      })
    },

    edit(item, callback) {
      this.request.edit(item).then(res => {
        callback(true)
      }).catch(e => {
        callback(e)
      })
    },

    deleteItems(items, callback) { // delete 是关键字，不能用
      // TODO 删除用户/删除单个用户
      this.request.delete(items).then(res => {
        callback(true)
      }).catch(e => {
        callback(e)
      })
    },

    // 获取数据列表
    async fetchData(params, callback) {
      const result = await this.request.getList(params)
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

<template>
  <div class="app-container">
    <datatable
      ref="datatable"
      :index="true"
      :fields="fields"
      :op-btn="opBtn"
      :op-btn-detail="opBtnDetail"
      :op-btn-delete="opBtnDelete"
      :op-btn-edit="opBtnEdit"
      :nav-btn="navBtn"
      :nav-btn-add="navBtnAdd"
      :nav-btn-detail="navBtnDetail"
      :nav-btn-edit="navBtnEdit"
      :nav-btn-delete="navBtnDelete"
      :pagination="pagination"
      :fetch-on-created="fetchOnCreated"
      @fetchData="fetchData"
      @add="add"
      @edit="edit"
      @delete="deleteItems"
      @deleteOne="deleteOne"
      @row-click="rowClick"
    >
      <template #nav-btn>
        <slot name="nav-btn" />
      </template>
    </datatable>
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
    fetchOnCreated: { // 是否在创建时就获取数据
      type: Boolean,
      default: true
    },
    pagination: {
      type: Boolean,
      default: true
    },
    meta: { // meta 描述
      type: Object,
      required: true
    }
  },

  data() {
    return {}
  },

  computed: {
    request() {
      return getRequest(this.metaCode)
    },

    opBtn() {
      return this.meta.opBtn && (this.opBtnDelete || this.opBtnEdit || this.opBtnDetail)
    },

    opBtnEdit() {
      return this.meta.opBtnEdit
    },

    opBtnDelete() {
      return this.meta.opBtnDelete
    },

    opBtnDetail() {
      return this.meta.opBtnDetail
    },

    navBtn() {
      return this.meta.navBtn
    },

    navBtnAdd() {
      return this.meta.navBtnAdd
    },

    navBtnDetail() {
      return this.meta.navBtnDetail
    },

    navBtnEdit() {
      return this.meta.navBtnEdit
    },

    navBtnDelete() {
      return this.meta.navBtnDelete
    },

    fields() {
      return this.meta.fields
    },
    metaCode() {
      return this.meta.code
    }
  },
  methods: {
    rowClick(row, column, event) {
      this.$emit('row-click', row, column, event)
    },

    triggerFetchData(params) { // 触发刷新
      this.$refs.datatable.fetchData(params)
    },

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
      // 获取到所有的 pk(id)
      const ids = items.map(item => item[this.meta.pk || 'id'])
      this.request.deleteMany({ ids }).then(res => {
        callback(true)
      }).catch(e => {
        callback(e)
      })
    },

    deleteOne(item, callback) {
      this.request.delete(item).then(res => {
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

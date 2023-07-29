<template>
  <div class="app-container">
    <div v-if="buttons.length !== 0" class="app-btn-group">
      <component
        :is="item.component"
        v-for="(item, index) in buttons"
        :key="index"
        :table="$refs.datatable"
        :icon="item.icon"
        :detail-fields="detailFields"
        :add-fields="addFields"
        :edit-fields="editFields"
        :add-rules="addRules"
        @delete="deleteItems"
        @add="add"
        @edit="edit"
        @refresh="reloadData"
      />
    </div>
    <datatable
      ref="datatable"
      :index="true"
      :op-btn="opBtn"
      :table-fields="tableFields"
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
      @row-click="rowClick"
    >
      <template #nav-btn>
        <slot name="nav-btn" />
      </template>
    </datatable>
  </div>
</template>

<script>
import { getRequest } from '@/api/meta_tmp'
import Datatable from '@/components/Datatable/temp.vue'
import { queryTableList } from '@/api/components/singletable'
import { getFieldList } from '@/api/planform/field'
import { querySelectList } from '@/api/form/winkselect'
import Buttontable from '@/components/tables/Buttontable.vue'

export default {
  components: {
    Datatable
  },
  extends: Buttontable,
  props: {
    fetchOnCreated: { // 是否在创建时就获取数据
      type: Boolean,
      default: true
    },
    pagination: {
      type: Boolean,
      default: true
    },
    setting: {
      type: String,
      required: true
    },
    menuCode: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      meta: {}
    }
  },

  computed: {
    request() {
      return getRequest(this.menuCode, this.metaCode)
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
    tableFields() {
      if (!this.fields) {
        return []
      }
      return this.fields.filter(field => !field.is_hide)
    },
    metaCode() {
      return this.meta.code
    },
    detailFields() {
      if (!this.fields) {
        return []
      }
      return this.fields.filter(field => !field.is_hide_detail)
    },
    addFields() {
      if (!this.fields) {
        return []
      }
      return this.fields.filter(field => field.is_add)
    },
    editFields() {
      if (!this.fields) {
        return []
      }
      return this.fields.filter(field => field.is_edit)
    },

    addRules() {
      const rules = {}
      if (!this.fields) {
        return rules
      }
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
        if (field.validate) {
          rule.push({
            validator: (rule, value, callback) => {
              const res = field.validate(value, this.form)
              if (res) {
                callback(new Error(res))
              } else {
                callback()
              }
            }, trigger: 'blur'
          })
        }
        rules[field.name] = rule
      }
      return rules
    }
  },

  async created() {
    // 创建 meta
    await this.genMeta()
    // 拉取数据
    this.triggerFetchData()
  },

  methods: {
    getSelection() {
      return this.$refs.datatable.getSelection()
    },
    async genMeta() {
      // 判断是否为空对象
      if (Object.keys(this.meta).length) {
        return
      }
      const setting = JSON.parse(this.setting)
      const metaCode = setting.meta
      const meta = {}
      const res = await getFieldList({ masterKey: metaCode })
      const fields = res.data.items
      // 遍历 fields，将 meta 中的字段信息补充完整
      meta.fields = fields
      meta.code = metaCode
      this.meta = meta
      for (let i = 0; i < fields.length; i++) {
        const field = fields[i]
        if (field.compo === '下拉框') {
          const res = await querySelectList(field.id)
          const data = res.data
          const e_select_mapping = {}
          const e_select = []
          for (let j = 0; j < data.length; j++) {
            const item = data[j]
            let val = item.value
            if (field.type !== 'VARCHAR') {
              val = parseInt(val)
            }
            e_select_mapping[val] = item.name
            e_select.push({
              label: item.name,
              value: val
            })
          }
          field.e_select = e_select
          field.e_select_mapping = e_select_mapping
        }
      }
    },

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
      const pk = this.meta.pk || 'id'
      const pk_vals = items.map(item => item[pk])
      this.request.delete({ [pk]: pk_vals }).then(res => {
        callback(true)
      }).catch(e => {
        callback(e)
      })
    },

    reloadData() { // 刷新数据
      this.$refs.datatable.fetchData()
    },

    // 获取数据列表
    async fetchData(params, callback) {
      params.meta = this.meta.code
      const result = await queryTableList(params)
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

.app-btn-group {
    margin-bottom: 10px;
}
</style>

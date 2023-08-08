<template>
  <div class="app-container">
    <singletable ref="master" :setting="metaSetting" :menu-code="'meta_menu'" @row-click="rowClick" @fetchData="onFetchData" />
    <singletable ref="slave" :setting="fieldSetting" :pagination="false" :menu-code="'wink-field'" />
  </div>
</template>

<style lang="scss" scoped>
.app-container {
    height: 100%;
    overflow-y: hidden;
    display: flex;
    flex-direction: column;
}
</style>

<script>
import Singletable from '@/components/tables/Singletable/temp.vue'

export default {
  components: {
    Singletable
  },
  props: {
    setting: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      fieldSetting: JSON.stringify({
        meta: 'wink_field'
      }),
      metaSetting: JSON.stringify({
        meta: 'wink_meta'
      })
    }
  },
  mounted() {
    this.$refs.master.triggerFetchData()
  },

  methods: {
    rowClick(row, column, event) {
      const curSelection = this.$refs.master.getSelection()
      if (curSelection.length !== 1) {
        // 清除子表数据
        this.$refs.slave.clearData()
      }
      // 刷新子表
      this.$refs.slave.triggerFetchData({ masterKey: row.code })
    },
    onFetchData(rows) {
      // 默认选中第一行
      if (rows.length === 0) return
      this.$nextTick(() => {
        const first = rows[0]
        this.$refs.master.setSelection([first])
        // this.$refs.slave.triggerFetchData({ masterKey: first.code })
      })
    }
  }
}

</script>

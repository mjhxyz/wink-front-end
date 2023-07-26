<template>
  <div class="" />
</template>

<script>

export default {
  components: {
  },
  props: {
  },
  data() {
    return {
      form: {}
    }
  },
  computed: {
  },
  methods: {
    validateForm() {
      // 校验模板配置
      return true
    },
    getSetting() {
      // 校验 form
      if (!this.validateForm()) {
        return false
      }
      return JSON.stringify(this.form)
    }
  }
}
</script>

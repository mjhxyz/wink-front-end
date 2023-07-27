<template>
  <div class="">
    <el-form ref="form" :model="form" :inline="true" label-width="120px" :rules="rules">
      <el-form-item label="Meta" prop="meta">
        <!-- 查找框 -->
        <winkfind ref="meta" v-model="form.meta" meta-code="wink_field" field-code="meta_code" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Winkfind from '@/components/WinkForm/Winkfind/index.vue'
import Menusetting from '@/components/Menusetting/base.vue'

export default {
  components: {
    Winkfind
  },
  extends: Menusetting,
  props: {
  },
  data() {
    return {
      form: {
      },
      rules: {
        meta: [
          { required: true, message: '请选择Meta', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 重写父类的方法
    validateForm() {
      return new Promise((resolve, reject) => {
        this.$refs.form.validate(valid => {
          resolve(valid)
        })
      })
    }
  }
}
</script>

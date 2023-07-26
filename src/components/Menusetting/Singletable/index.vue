<template>
  <div class="">
    <el-form ref="form" :inline="true" label-width="120px">
      <el-form-item label="Meta" prop="name">
        <!-- 查找框 -->
        <winkfind meta-code="wink_field" field-code="meta_code" />
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
      form: {}
    }
  },
  computed: {
  },
  created() {
  }
}
</script>

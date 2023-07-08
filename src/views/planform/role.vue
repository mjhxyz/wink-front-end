<template>
  <singletable :meta="meta" />
</template>

<script>
import { roleMeta } from '@/utils/meta/role'
import Singletable from '@/components/tables/Singletable/index.vue'

export default {
  components: {
    Singletable
  },
  data() {
    return {
      meta: roleMeta
    }
  }
}
</script>

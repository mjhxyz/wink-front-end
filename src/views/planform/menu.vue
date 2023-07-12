<template>
  <singletable :meta="meta" />
</template>

<script>
import { menuMeta } from '@/utils/meta/menu'
import Singletable from '@/components/tables/Singletable/index.vue'

export default {
  components: {
    Singletable
  },
  data() {
    return {
      meta: menuMeta
    }
  }
}
</script>

<template>
  <singletable :meta="meta" />
</template>

<script>
import { userMeta } from '@/utils/meta/user'
import Singletable from '@/components/tables/Singletable/index.vue'

export default {
  components: {
    Singletable
  },
  data() {
    return {
      meta: userMeta
    }
  }
}
</script>

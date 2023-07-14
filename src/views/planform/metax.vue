<template>
  <singletable :meta="meta" />
</template>

<script>
import { metaMeta } from '@/utils/meta/meta'
import Singletable from '@/components/tables/Singletable/index.vue'

export default {
  components: {
    Singletable
  },
  data() {
    return {
      meta: metaMeta
    }
  }
}
</script>

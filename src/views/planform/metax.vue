<template>
  <Masterslave :setting="meta" />
</template>

<script>
import { metaMeta } from '@/utils/meta/meta'
import Masterslave from '@/components/tables/Masterslave/index.vue'

export default {
  components: {
    Masterslave
  },
  data() {
    return {
      meta: '{}'
    }
  }
}
</script>

<template>
  <Masterslave :setting="meta" />
</template>

<script>
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

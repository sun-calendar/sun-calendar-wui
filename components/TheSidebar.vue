<template lang="pug">
.container
  DayInfo
</template>
<script lang="ts">
import Vue from 'vue'
import DayInfo from './DayInfo.vue'

export default Vue.extend({
  components: {
    DayInfo
  }
})
</script>
<style lang="stylus" scoped>
@require '~assets/styl/rel'

.container
  padding rel(20)
  background #eee
</style>

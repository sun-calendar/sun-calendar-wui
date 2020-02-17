<template lang="pug">
.container
  span.time {{ time }}
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  computed: {
    time (): string {
      return this.$store.getters.localNow.format(
        this.$store.state.defaultFormat)
    }
  },
  mounted (): void {
    setInterval(() => {
      this.$store.commit('updateNow')
    }, 1000)
  }
})
</script>
<style lang="stylus" scoped>
.container
  flex-grow 1
  display flex
  justify-content center
</style>

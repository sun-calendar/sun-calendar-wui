<template lang="pug">
.container
  TheHeader
  nuxt
</template>
<script lang="ts">
import Vue from 'vue'
import Cookie from 'js-cookie'
import moment from 'moment-timezone'
import TheHeader from '~/components/TheHeader.vue'

export default Vue.extend({
  components: {
    TheHeader
  },
  beforeCreate () {
    this.$store.commit('setZoneName',
      Cookie.get('zoneName') || moment.tz.guess())
  }
})
</script>
<style lang="stylus" scoped>
@require '~assets/styl/rel'

.container
  font-family "Iosevka Slab Web"
  font-size rel(25)
  background #eee
  user-select none
</style>
<style lang="stylus">
*,
*::before,
*::after
  box-sizing border-box
  margin 0
</style>

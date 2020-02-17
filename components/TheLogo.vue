<template lang="pug">
.logo(v-t="'logo'")
</template>
<i18n>
{
  "en": {
    "logo": "The Sun calendar"
  },
  "ru": {
    "logo": "Календарь солнца"
  }
}
</i18n>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({

})
</script>
<style lang="stylus" scoped>
@require '~assets/styl/rel'

.logo
  font-weight bold
  font-size rel(25)
  user-select none
  margin-right rel(30)
</style>

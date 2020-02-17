<template lang="pug">
header.header
  TheLogo
  TimezonePicker
  TimeWidget
  LocaleSwither
</template>
<script lang="ts">
import Vue from 'vue'
import TheLogo from '~/components/TheLogo.vue'
import TimeWidget from '~/components/TimeWidget.vue'
import TimezonePicker from '~/components/TimezonePicker.vue'
import LocaleSwither from '~/components/LocaleSwitcher.vue'

export default Vue.extend({
  components: {
    TimeWidget,
    TimezonePicker,
    LocaleSwither,
    TheLogo
  }
})
</script>
<style lang="stylus" scoped>
@require '~assets/styl/rel'

.header
  display flex
  justify-content space-around
  align-items center
  padding rel(5) rel(15)
  border-bottom rel(1) solid #888
</style>

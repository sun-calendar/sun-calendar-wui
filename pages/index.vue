<template lang="pug">
.content
  TheSidebar.sidebar
  TheCalendar.calendar
</template>
<i18n>
{
  "en": {
    "title": "Sun calendar"
  },
  "ru": {
    "title": "Календарь солнца"
  }
}
</i18n>
<script lang="ts">
import Vue from 'vue'
import TheCalendar from '~/components/TheCalendar.vue'
import TheSidebar from '~/components/TheSidebar.vue'

export default Vue.extend({
  components: {
    TheCalendar,
    TheSidebar
  },
  beforeMount () {
    document.title = this.$t('title').toString()
  }
})
</script>
<style lang="stylus" scoped>
.content
  display flex

.sidebar
  flex-grow 1
</style>

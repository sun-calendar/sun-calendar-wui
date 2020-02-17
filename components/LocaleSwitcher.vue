<template lang="pug">
select.langs(
  v-model="locale"
  @change="changeLocale"
)
  option(v-for="locale in $root.$i18n.locales"
         :value="locale.code") {{ locale.name }}
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data () {
    return {
      locale: this.$root.$i18n.locale
    }
  },
  methods: {
    changeLocale () {
      this.$root.$i18n.setLocale(this.locale)
    }
  }
})
</script>
<style lang="stylus" scoped>
.langs
  appearance none
  background inherit
  border none
  cursor pointer

  &:focus
    outline 0
</style>

<template lang="pug">
.container
  select.timezones(
    :title="$t('help')"
    :value="zoneName"
    @change="changeZoneName"
  )
    option.timezone(
      v-for="zoneName in zoneNames"
      :value="zoneName"
      :key="zoneName"
    ) {{ zoneName }}
  button.guess-btn(@click="guessZoneName" v-t="'guess-zone'")
</template>
<i18n>
{
  "en": {
    "guess-zone": "Guess",
    "help": "Choose your timezone"
  },
  "ru": {
    "guess-zone": "Авто",
    "help": "Выберите свой часовой пояс"
  }
}
</i18n>
<script lang="ts">
import Vue from 'vue'
import moment from 'moment-timezone'

export default Vue.extend({
  data () {
    return {
      zoneNames: moment.tz.names()
    }
  },
  computed: {
    zoneName () {
      return this.$store.state.zoneName
    }
  },
  methods: {
    changeZoneName (e) {
      this.$store.commit('setZoneName', e.target.value)
    },
    guessZoneName () {
      this.$store.dispatch('guessZoneName')
    }
  }
})
</script>
<style lang="stylus" scoped>
@require '~assets/styl/rel'

.guess-btn
  margin-left rel(10)
</style>

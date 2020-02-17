<template lang="pug">
.container
  .selected-date {{ selectedDate.format($store.state.defaultFormat) }}
  label {{ $t('year') }}
    input(
      :value="selectedDate.year"
      data-name="year"
      type="number"
      @change="infoChanged")
  label {{ $t('month') }}
    select(
      :value="selectedDate.month"
      data-name="month"
      type="number"
      @change="infoChanged")
      option(v-for="monthName, month0 in monthsNames"
             :value="month0 + 1") {{ monthName }}
  label {{ $t('week') }}
    select(
      :value="selectedDate.week"
      data-name="week"
      type="number"
      @change="infoChanged")
      option(v-for="week in weeksInMonth"
             :value="week") {{ week }}
  label {{ $t('day') }}
    select(
      :value="selectedDate.day"
      data-name="day"
      type="number"
      @change="infoChanged")
      option(v-for="dayName, day0 in names.days"
             :value="day0 + 1") {{ dayName }}
  label(:title="$t('unix-title')") {{ $t('unix') }}
    input(
      :value="unix"
      data-name="unix"
      type="number"
      @change="infoChanged")
  label {{ $t('week-of-year') }}
    input(
      :value="selectedDate.weekOfYear"
      data-name="weekOfYear"
      type="number"
      @change="infoChanged")
  label {{ $t('day-of-year') }}
    input(
      :value="selectedDate.dayOfYear"
      data-name="dayOfYear"
      type="number"
      @change="infoChanged")
  label {{ $t('old-date') }}
    input(
      v-model="oldDate"
      type="date"
      @enter="oldDateChanged"
      @blur="oldDateChanged")
  label {{ $t('hour') }}
    input(
      :value="selectedDate.hour"
      data-name="hour"
      type="number"
      @change="infoChanged")
  label {{ $t('minute') }}
    input(
      :value="selectedDate.minute"
      data-name="minute"
      type="number"
      @change="infoChanged")
  label {{ $t('second') }}
    input(
      :value="selectedDate.second"
      data-name="second"
      type="number"
      @change="infoChanged")
</template>
<i18n>
{
  "en": {
    "year": "Year",
    "month": "Month",
    "week": "Week",
    "day": "Day",
    "unix": "Unix time",
    "unix-title": "Seconds since 1970-01-01",
    "week-of-year": "Week of year",
    "day-of-year": "Day of year",
    "old-date": "Gregorian date",
    "hour": "Hour",
    "minute": "Minute",
    "second": "Second"
  },
  "ru": {
    "year": "Год",
    "month": "Месяц",
    "week": "Неделя",
    "day": "День",
    "unix": "Unix-время",
    "unix-title": "Секунды с 01.01.1970",
    "week-of-year": "Неделя года",
    "day-of-year": "День года",
    "old-date": "Григорианская дата",
    "hour": "Час",
    "minute": "Минута",
    "second": "Секунда"
  }
}
</i18n>
<script>
import Vue from 'vue'
import * as sun from 'sun-calendar'

export default Vue.extend({
  data () {
    return {
      oldDate: ''
    }
  },
  computed: {
    unix () {
      return Math.floor(this.selectedDate.unix)
    },
    zoneName () {
      return this.$store.state.zoneName
    },
    selectedDate () {
      return this.$store.getters.localSelectedDate
    },
    names () {
      return sun.consts.names[this.$i18n.locale]
    },
    weeksInMonth () {
      return sun.tools.getWeeksInMonth(this.selectedDate.month)
    },
    monthsInYear () {
      return sun.tools.getMonthsInYear(this.selectedDate.isLeap)
    },
    monthsNames () {
      return this.names.months.slice(0, this.monthsInYear)
    }
  },
  watch: {
    '$store.getters.localOldDate' (value) {
      this.oldDate = value
    }
  },
  created () {
    this.oldDate = this.$store.getters.localOldDate
  },
  methods: {
    infoChanged (e) {
      const target = e.target
      const { value } = target
      const { name } = target.dataset
      this.$store.dispatch('setSelectedDate', { [name]: Number(value) })
    },
    oldDateChanged () {
      this.$store.commit('setOldDate', this.oldDate)
    }
  }
})
</script>
<style lang="stylus" scoped>
@require '~assets/styl/rel'

.container
  display flex
  flex-wrap wrap
  justify-content center

.selected-date
  padding: rel(20)
  font-size rel(25)

label
  display flex
  align-items center
  justify-content flex-end
  flex-basis 100%
  padding: rel(10) 0
  font-size rel(20)

input,
select
  border none
  background #bbb
  margin-left: rel(10)
  flex-basis 60%
  padding: rel(5)
</style>

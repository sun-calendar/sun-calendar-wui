<template lang="pug">
.calendar
  .year-selection
    button(@click="selectNow" v-t="'select-now'")
    input(type="number" v-model="year")
    button(@click="toSelectedYear" v-t="'to-selected'")
  .year(
    :data-sel="year == selectedDate.year"
    :data-today="year == now.year")
    .month(
      v-for="monthName, month0 in names.months"
      :key="monthName"
      :data-inactive="month0 === monthsInYear"
      :data-sel="month0 + 1 === selectedDate.month"
      :data-today="month0 + 1 === now.month")
      .month-name {{ monthName }}
      .month-index {{ month0 + 1 }}
      .day-name(
        v-for="dayName, day0 in names.days"
        :data-sel="dayName === selectedDate.dayName"
        :data-today="dayName === now.dayName"
        :data-hov="day0 + 1 == hovered.day") {{ dayName.slice(0, 3) }}
      template(v-for="week in weeksInMonth(month0 + 1)")
        .week-index(
          :data-sel="week === selectedDate.week"
          :data-today="week === now.week"
          :data-hov="week == hovered.week") {{ week }}
        .day(v-for="dayName, day0 in names.days"
             :data-sel="week === selectedDate.week && \
                        dayName === selectedDate.dayName"
             :data-today="week === now.week && \
                          dayName === now.dayName"
             :data-month="month0 + 1"
             :data-week="week"
             :data-day="day0 + 1"
             @click="selectDay"
             @mouseenter="mouseenterDay"
             @mouseleave="mouseleaveDay")
          .day-inner &nbsp;
</template>
<i18n>
{
  "en": {
    "select-now": "Select now",
    "to-selected": "Go to the selected day"
  },
  "ru": {
    "select-now": "Выбрать текущий момент",
    "to-selected": "Перейти к выбранному дню"
  }
}
</i18n>
<script>
import Vue from 'vue'
import * as sun from 'sun-calendar'

export default Vue.extend({
  data () {
    return {
      year: this.$store.getters.localSelectedDate.year,
      hovered: {
        week: undefined,
        day: undefined
      }
    }
  },
  computed: {
    selectedDate () {
      return this.$store.getters.localSelectedDate
    },
    now () {
      return this.$store.getters.localNow
    },
    names () {
      return sun.consts.names[this.$i18n.locale]
    },
    isLeap () {
      return this.$store.getters.localZero.set({
        year: Number(this.year)
      }).isLeap
    },
    monthsInYear () {
      return sun.tools.getMonthsInYear(this.isLeap)
    }
  },
  watch: {
    'selectedDate.year' (value) { this.year = value }
  },
  methods: {
    mouseenterDay (e) {
      const { day, week } = e.currentTarget.dataset
      this.hovered.day = day
      this.hovered.week = week
    },
    mouseleaveDay (e) {
      this.hovered.day = undefined
      this.hovered.week = undefined
    },
    weeksInMonth (month) {
      return sun.tools.getWeeksInMonth(month)
    },
    selectNow () {
      this.$store.dispatch('setSelectedDate', {
        timeValue: Date.now()
      })
      this.toSelectedYear()
    },
    toSelectedYear () {
      this.year = this.selectedDate.year
    },
    selectDay (e) {
      const data = e.currentTarget.dataset
      this.$store.dispatch('setSelectedDate', {
        day: Number(data.day),
        week: Number(data.week),
        month: Number(data.month),
        year: Number(this.year)
      })
    }
  }
})
</script>
<style lang="stylus" scoped>
@require '~assets/styl/rel'

.calendar
  margin rel(3)
  font-size rel(20)
  border rel(10) solid hsl(193, 100%, 75%)
  border-radius rel(5)

.year
  display grid
  grid-gap rel(2) rel(5)

.month:last-child
  grid-column 4

.month-name
  grid-column 2 / 8

.month
  display: grid
  align-items: center
  text-align: center
  padding rel(3) rel(10)

  &:last-child
    grid-column: 4

.month:not([data-inactive])
  cursor: crosshair
  &:hover
    .month-name
      font-style: italic

.month[data-inactive]
  cursor: not-allowed
  background #bbb

.month-index,
.week-index
  width rel(20)
  margin-right: rel(3)

.month-index,
.day-name
  margin-bottom: rel(3)

.month-name
  grid-column: 2 / 8

.day
  display: flex
  justify-content: center
  align-items: stretch
  padding: rel(4)
  width: rel(40)
  height: rel(30)

  .day-inner
    flex-grow: 1
    background hsl(237, 100%, 85%)

.year-selection
  display: flex
  justify-content: center
  padding: rel(10) 0

  input
    margin: 0 rel(10)
    text-align: center

.year[data-today]
  .month[data-today]
    [data-today]
      background #555
      color #fff

      div
        background #999

.year[data-sel]
  .month[data-sel]
    div[data-sel]
      background: hsl(119, 36%, 50%)

.year
  .month:hover:not([data-inactive])
    .day:hover,
    .day-name[data-hov],
    .week-index[data-hov]
      color: #fff
      background: hsl(250, 100%, 50%)
</style>

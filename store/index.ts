import moment from 'moment-timezone'
import Cookie from 'js-cookie'
import * as sun from 'sun-calendar'

export const state = () => {
  return {
    selectedDateTimeValue: Date.now(),
    nowTimeValue: Date.now(),
    zoneName: 'UTC',
    defaultFormat: '%y4 %M, %D-%w [%hh:%mm:%ss]'
  }
}

export const mutations = {
  setZoneName (state, name) {
    state.zoneName = name
    Cookie.set('zoneName', name)
  },
  setSelectedDateTimeValue (state, timeValue) {
    state.selectedDateTimeValue = timeValue
  },
  updateNow (state) {
    state.nowTimeValue = Date.now()
  },
  setEventsCountry (state, country) {
    state.country = country
  },
  setOldDate (state, oldDate) {
    state.selectedDateTimeValue = moment.tz(oldDate, state.zoneName).unix() /
      sun.consts.units.millisecond
  }
}

export const actions = {
  guessZoneName (context) {
    context.commit('setZoneName', moment.tz.guess())
  },
  setSelectedDate ({ getters, commit }, params) {
    const { timeValue } = getters.localSelectedDate.set(params)
    commit('setSelectedDateTimeValue', timeValue)
  }
}

export const getters = {
  localZero (state) {
    return sun.zero({
      locale: state.i18n.locale,
      zoneName: state.zoneName
    })
  },
  localSelectedDate (state, getters) {
    return getters.localZero.set({ timeValue: state.selectedDateTimeValue })
  },
  localNow (state, getters) {
    return getters.localZero.set({ timeValue: state.nowTimeValue })
  },
  localOldDate (state) {
    return moment.tz(state.selectedDateTimeValue, state.zoneName)
      .format('YYYY-MM-DD')
  }
}

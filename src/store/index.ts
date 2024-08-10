import { createStore, Store, useStore as baseUseStore } from 'vuex'
import axios from 'axios'
import { InjectionKey } from 'vue'

export interface BusLine {
  id: number
  name: string
}

export interface BusStop {
  id: number
  name: string
  lineId: number
}

export interface State {
  busLines: BusLine[]
  busStops: BusStop[]
}

const key: InjectionKey<Store<State>> = Symbol()

const store = createStore<State>({
  state: {
    busLines: [],
    busStops: [],
  },
  mutations: {
    setBusLines(state, lines: BusLine[]) {
      state.busLines = lines
    },
    setBusStops(state, stops: BusStop[]) {
      state.busStops = stops
    },
  },
  actions: {
    async fetchBusLines({ commit }) {
      const response = await axios.get('http://localhost:3000/busLines')
      commit('setBusLines', response.data)
    },
    async fetchBusStops({ commit }, lineId: number) {
      const response = await axios.get(`http://localhost:3000/busStops?lineId=${lineId}`)
      commit('setBusStops', response.data)
    },
  },
})

export function useStore () {
  return baseUseStore(key)
}

export default store

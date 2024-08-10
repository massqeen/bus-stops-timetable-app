import { createStore, Store, useStore as baseUseStore } from 'vuex'
import axios from 'axios'
import { InjectionKey } from 'vue'

export interface BusLine {
  id: number
  order: number
}

export interface BusStop {
  line: number
  stop: string
  order: number
  time: string
}

export interface State {
  busLines: BusLine[]
  busStops: BusStop[]
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
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
    async fetchBusLines({ commit, state }) {
      if (state.busStops.length === 0) {
        await this.dispatch('fetchBusStops')
      }
      const busLines = state.busStops.reduce((acc: BusLine[], stop) => {
        if (!acc.find(line => line.id === stop.line)) {
          acc.push({ id: stop.line, order: stop.order })
        }
        return acc
      }, [])
      commit('setBusLines', busLines.sort((a, b) => a.id - b.id))
    },
    async fetchBusStops({ commit }) {
      const response = await axios.get('http://localhost:3000/stops')
      commit('setBusStops', response.data)
    },
  },
})

export function useStore () {
  return baseUseStore(key)
}

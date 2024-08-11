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
  isLoading: boolean
  error: string | null
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    busLines: [],
    busStops: [],
    isLoading: false,
    error: null,
  },
  mutations: {
    setBusLines(state, lines: BusLine[]) {
      state.busLines = lines
    },
    setBusStops(state, stops: BusStop[]) {
      state.busStops = stops
    },
    setLoading(state, isLoading: boolean) {
      state.isLoading = isLoading
    },
    setError(state, error: string | null) {
      state.error = error
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
      commit('setLoading', true)
      commit('setError', null)
      try {
        const response = await axios.get('http://localhost:3000/stops')
        commit('setBusStops', response.data)
      } catch (error) {
        commit('setError', 'Failed to load bus stops')
      } finally {
        commit('setLoading', false)
      }
    },
  },
})

export function useStore () {
  return baseUseStore(key)
}

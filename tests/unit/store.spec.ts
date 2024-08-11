import { describe, it, expect, beforeEach, vi } from 'vitest'
import { Store } from 'vuex'

// reset modules before mocking
vi.resetModules()

// mock axios before its importing
vi.mock('axios')
import axios from 'axios'
const mockedAxios = axios as jest.Mocked<typeof axios>

// import store after mocking axios
import { store as originalStore } from '@/store'

describe('Vuex Store', () => {
    let store: Store<unknown>

    beforeEach(() => {
        // create new store instance before every test
        store = originalStore
    })

    it('fetchBusStops action commits setBusStops mutation with data and sets isLoading correctly', async () => {
        const busStops = [
            { line: 1, stop: 'Stop 1', order: 1, time: '08:00' },
            { line: 1, stop: 'Stop 2', order: 2, time: '08:30' },
        ]
        mockedAxios.get.mockResolvedValue({ data: busStops })

        const promise = store.dispatch('fetchBusStops')

        expect(store.state.isLoading).toBe(true)

        await promise

        expect(store.state.busStops).toEqual(busStops)
        expect(store.state.isLoading).toBe(false)
    })

    it('fetchBusStops action commits setError mutation on failure and sets isLoading correctly', async () => {
        mockedAxios.get.mockRejectedValue(new Error('Network Error'))

        const promise = store.dispatch('fetchBusStops')

        expect(store.state.isLoading).toBe(true)

        await promise

        expect(store.state.error).toBe('Failed to load bus stops')
        expect(store.state.isLoading).toBe(false)
    })
    it('fetchBusLines action commits setBusLines mutation with unique lines correctly', async () => {
        const busStops = [
            { line: 1, stop: 'Stop 1', order: 1, time: '08:00' },
            { line: 1, stop: 'Stop 2', order: 2, time: '08:30' },
            { line: 2, stop: 'Stop 3', order: 1, time: '09:00' },
        ]
        mockedAxios.get.mockResolvedValue({ data: busStops })

        await store.dispatch('fetchBusStops')
        expect(store.state.isLoading).toBe(false)
        await store.dispatch('fetchBusLines')

        const expectedBusLines = [
            { id: 1, order: 1 },
            { id: 2, order: 1 },
        ]

        expect(store.state.busLines).toEqual(expectedBusLines)
    })
    it('fetchBusLines action always resets isLoading state on error', async () => {
        mockedAxios.get.mockRejectedValue(new Error('Network Error'))

        await store.dispatch('fetchBusLines')

        expect(store.state.isLoading).toBe(false)
    })
    it('fetchBusLines does not modify busLines if fetchBusStops returns an empty array', async () => {
        mockedAxios.get.mockResolvedValue({ data: [] })

        await store.dispatch('fetchBusStops')
        await store.dispatch('fetchBusLines')

        expect(store.state.busLines).toEqual([])
    })
    it('fetchBusLines action sets error state when fetchBusStops fails', async () => {
        mockedAxios.get.mockRejectedValue(new Error('Network Error'))

        await store.dispatch('fetchBusLines')

        // Ensure the error state is set after the failure
        expect(store.state.error).toBe('Failed to load bus stops')
        expect(store.state.busLines).toEqual([]) // Lines should not be updated
    })
})

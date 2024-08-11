import { describe, it, expect, beforeEach, vi } from 'vitest'

// Сброс модулей перед мокированием
vi.resetModules()

// Мокируем axios перед его импортом
vi.mock('axios')
import axios from 'axios'
const mockedAxios = axios as jest.Mocked<typeof axios>

// Импортируем store после мокирования axios
import { store as originalStore, State } from '@/store'

describe('Vuex Store', () => {
    let store: any

    beforeEach(() => {
        // Создаем новый экземпляр стора перед каждым тестом
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
})
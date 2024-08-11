import { shallowMount } from '@vue/test-utils'
import { Store } from "vuex";
import BusStops from '@/views/BusStops.vue'
import { useStore } from '@/store'
import SortableBusStopList from '@/components/SortableBusStopList.vue'
import SearchInput from '@/components/SearchInput.vue'
import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('@/store', () => ({
    useStore: vi.fn(),
}))

describe('BusStops.vue', () => {
    let store: Store<unknown>

    beforeEach(() => {
        store = {
            state: {
                isLoading: false,
                error: null,
                busStops: [
                    { stop: 'Abc' },
                    { stop: 'Cfg' },
                    { stop: 'Bnf' }
                ],
            },
            dispatch: vi.fn(),
        }

        ;(useStore as vi.Mock).mockReturnValue(store)
    })

    it('fetches and sets bus stops on mount', async () => {
        const wrapper = shallowMount(BusStops)
        await wrapper.vm.$nextTick()

        expect(store.dispatch).toHaveBeenCalledWith('fetchBusStops')
        expect(wrapper.vm.busStops.length).toBe(3)
    })

    it('displays loading indicator when isLoading is true', () => {
        store.state.isLoading = true
        const wrapper = shallowMount(BusStops)

        expect(wrapper.find('.loading-container').exists()).toBe(true)
    })

    it('displays error message when error exists', () => {
        store.state.error = 'Error fetching bus stops'
        const wrapper = shallowMount(BusStops)

        expect(wrapper.find('.error-container').text()).toBe('Error fetching bus stops')
    })

    it('renders SearchInput and SortableBusStopList components', () => {
        const wrapper = shallowMount(BusStops)

        expect(wrapper.findComponent(SearchInput).exists()).toBe(true)
        expect(wrapper.findComponent(SortableBusStopList).exists()).toBe(true)
    })

    it('filters bus stops based on search query', async () => {
        const wrapper = shallowMount(BusStops)
        await wrapper.vm.$nextTick()

        wrapper.vm.searchQuery = 'abc'
        await wrapper.vm.$nextTick()

        expect(wrapper.vm.filteredBusStops.length).toBe(1)
        expect(wrapper.vm.filteredBusStops[0].stop).toBe('Abc')
    })

    it('sorts bus stops by name', async () => {
        const wrapper = shallowMount(BusStops)
        await wrapper.vm.$nextTick()

        wrapper.vm.sortStopsByName()
        await wrapper.vm.$nextTick()

        expect(wrapper.vm.sortedBusStops[1].stop).toBe('Bnf')
        expect(wrapper.vm.sortedBusStops[2].stop).toBe('Cfg')
    })
})

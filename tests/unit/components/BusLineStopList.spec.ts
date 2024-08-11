import { shallowMount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import BusLineStopList from '@/components/BusLineStopList.vue'
import SortableBusStopList from '@/components/SortableBusStopList.vue'

describe('BusLineStopList.vue', () => {
    const stops = [
        { stop: 'Stop 1', order: 1 },
        { stop: 'Stop 2', order: 2 },
        { stop: 'Stop 3', order: 3 }
    ]

    it('renders the correct bus line number in the title', () => {
        const wrapper = shallowMount(BusLineStopList, {
            props: {
                stops,
                selectedLineNumber: 5
            }
        })
        const title = wrapper.find('.title')
        expect(title.text()).toContain('Bus Line: 5')
    })

    it('sorts stops by order initially in ascending order', () => {
        const wrapper = shallowMount(BusLineStopList, {
            props: {
                stops,
                selectedLineNumber: 5
            }
        })
        expect(wrapper.vm.sortedBusStops).toEqual(stops)
    })

    it('toggles the sorting order when sortStopsByOrder is called', async () => {
        const wrapper = shallowMount(BusLineStopList, {
            props: {
                stops,
                selectedLineNumber: 5
            }
        })

        await wrapper.vm.sortStopsByOrder()
        expect(wrapper.vm.sortedBusStops[0].stop).toBe('Stop 3')

        await wrapper.vm.sortStopsByOrder()
        expect(wrapper.vm.sortedBusStops[0].stop).toBe('Stop 1')
    })

    it('emits stopSelected event when a stop is selected', async () => {
        const wrapper = shallowMount(BusLineStopList, {
            props: {
                stops,
                selectedLineNumber: 5
            }
        })

        const sortableBusStopList = wrapper.findComponent(SortableBusStopList)
        await sortableBusStopList.vm.$emit('stop-selected', stops[1])

        expect(wrapper.emitted('stopSelected')).toBeTruthy()
        expect(wrapper.emitted('stopSelected')?.[0]).toEqual([stops[1]])
    })

    it('renders SortableBusStopList with the correct props', () => {
        const wrapper = shallowMount(BusLineStopList, {
            props: {
                stops,
                selectedLineNumber: 5
            }
        })

        const sortableBusStopList = wrapper.findComponent(SortableBusStopList)
        expect(sortableBusStopList.exists()).toBe(true)
        expect(sortableBusStopList.props('stops')).toEqual(stops)
        expect(sortableBusStopList.props('isSelectable')).toBe(true)
        expect(sortableBusStopList.props('isAscending')).toBe(true)
    })
})

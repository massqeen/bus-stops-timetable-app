import { shallowMount } from '@vue/test-utils'
import SortableBusStopList from '@/components/SortableBusStopList.vue'
import SortIcon from '@/components/icons/SortIcon.vue'
import BusStopItem from '@/components/BusStopItem.vue'
import { describe, it, expect, vi } from 'vitest'

describe('SortableBusStopList.vue', () => {
    const stops = [
        { stop: 'Stop A' },
        { stop: 'Stop B' },
        { stop: 'Stop C' }
    ];

    it('renders the header and sort button', () => {
        const wrapper = shallowMount(SortableBusStopList, {
            props: { stops, isSelectable: true, isAscending: true }
        })

        expect(wrapper.find('.sorting').text()).toBe('Bus Stops')
        expect(wrapper.findComponent(SortIcon).exists()).toBe(true)
    })

    it('emits sortStops event when sort button is clicked', async () => {
        const wrapper = shallowMount(SortableBusStopList, {
            props: { stops, isSelectable: true, isAscending: true }
        })

        await wrapper.find('.sorting-button').trigger('click')

        expect(wrapper.emitted('sortStops')).toBeTruthy()
    })

    it('renders the list of bus stops', () => {
        const wrapper = shallowMount(SortableBusStopList, {
            props: { stops, isSelectable: true, isAscending: true }
        })

        const items = wrapper.findAllComponents(BusStopItem)
        expect(items.length).toBe(stops.length)
        items.forEach((item, index) => {
            expect(item.props('stop').stop).toBe(stops[index].stop)
        })
    })

    it('emits stopSelected event when a bus stop is clicked and selectable', async () => {
        const wrapper = shallowMount(SortableBusStopList, {
            props: { stops, isSelectable: true, isAscending: true }
        })

        const items = wrapper.findAllComponents(BusStopItem)
        await items[0].trigger('click')

        expect(wrapper.emitted('stopSelected')).toBeTruthy()
        expect(wrapper.emitted('stopSelected')?.[0]).toEqual([stops[0]])
    })

    it('does not emit stopSelected event when isSelectable is false', async () => {
        const wrapper = shallowMount(SortableBusStopList, {
            props: { stops, isSelectable: false, isAscending: true }
        })

        const items = wrapper.findAllComponents(BusStopItem)
        await items[0].trigger('click')

        expect(wrapper.emitted('stopSelected')).toBeFalsy()
    })
})

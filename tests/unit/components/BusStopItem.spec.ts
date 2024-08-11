import { shallowMount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import BusStopItem from '@/components/BusStopItem.vue'
import { BusStop } from '@/store'

describe('BusStopItem.vue', () => {
    const stop: BusStop = { stop: 'Central Station' }

    it('renders the bus stop name', () => {
        const wrapper = shallowMount(BusStopItem, {
            props: {
                stop,
                isSelectable: true
            }
        })
        expect(wrapper.text()).toBe(stop.stop)
    })

    it('emits stopSelected event when the stop is selectable and clicked', async () => {
        const wrapper = shallowMount(BusStopItem, {
            props: {
                stop,
                isSelectable: true
            }
        })

        await wrapper.trigger('click')

        expect(wrapper.emitted('stopSelected')).toBeTruthy()
        expect(wrapper.emitted('stopSelected')?.[0]).toEqual([stop])
    })

    it('does not emit stopSelected event when the stop is not selectable', async () => {
        const wrapper = shallowMount(BusStopItem, {
            props: {
                stop,
                isSelectable: false
            }
        })

        await wrapper.trigger('click')

        expect(wrapper.emitted('stopSelected')).toBeFalsy()
    })

    it('applies selectable class when the stop is selectable', () => {
        const wrapper = shallowMount(BusStopItem, {
            props: {
                stop,
                isSelectable: true
            }
        })

        expect(wrapper.classes()).toContain('selectable')
    })

    it('does not apply selectable class when the stop is not selectable', () => {
        const wrapper = shallowMount(BusStopItem, {
            props: {
                stop,
                isSelectable: false
            }
        })

        expect(wrapper.classes()).not.toContain('selectable')
    })
})

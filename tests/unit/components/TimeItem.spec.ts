import { shallowMount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import TimeItem from '@/components/TimeItem.vue'

describe('TimeItem.vue', () => {
    it('renders the time passed via props', () => {
        const time = '12:30'
        const wrapper = shallowMount(TimeItem, {
            props: { time }
        })

        expect(wrapper.text()).toBe(time)
    })

    it('has the correct class applied', () => {
        const wrapper = shallowMount(TimeItem, {
            props: { time: '12:30' }
        })
        const timeItem = wrapper.find('.time-item')

        expect(timeItem.exists()).toBe(true)
    })

    it('renders as an li element', () => {
        const wrapper = shallowMount(TimeItem, {
            props: { time: '12:30' }
        })

        expect(wrapper.element.tagName.toLowerCase()).toBe('li')
    })
})

import { shallowMount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import DetailsPlaceholder from '@/components/DetailsPlaceholder.vue'

describe('DetailsPlaceholder.vue', () => {
    it('renders the slot content', () => {
        const wrapper = shallowMount(DetailsPlaceholder, {
            slots: {
                default: '<p>Test Slot Content</p>'
            }
        })
        expect(wrapper.find('p').text()).toBe('Test Slot Content')
    })

    it('applies the correct styles via the container class', () => {
        const wrapper = shallowMount(DetailsPlaceholder)
        const container = wrapper.find('.container')

        expect(container.exists()).toBe(true)
        expect(container.classes()).toContain('container')
    })
})


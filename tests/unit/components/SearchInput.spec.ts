import { shallowMount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import SearchInput from '@/components/SearchInput.vue'

describe('SearchInput.vue', () => {
    it('renders the input element', () => {
        const wrapper = shallowMount(SearchInput, {
            props: { placeholder: 'Search...' }
        })
        expect(wrapper.find('input').exists()).toBe(true)
    })

    it('passes the placeholder prop to the input element', () => {
        const placeholder = 'Search for something...'
        const wrapper = shallowMount(SearchInput, {
            props: { placeholder }
        })
        expect(wrapper.find('input').attributes('placeholder')).toBe(placeholder)
    })

    it('emits searchQuery event with debounced input', async () => {
        vi.useFakeTimers()
        const wrapper = shallowMount(SearchInput, {
            props: { placeholder: 'Search...' }
        })

        const input = wrapper.find('input')
        await input.setValue('test query')

        // Waiting for debounce timer
        vi.runAllTimers()

        expect(wrapper.emitted('searchQuery')).toBeTruthy()
        expect(wrapper.emitted('searchQuery')?.[0]).toEqual(['test query'])
    })

    it('adds a focused class to the container on input focus', async () => {
        const wrapper = shallowMount(SearchInput, {
            props: { placeholder: 'Search...' }
        })

        const input = wrapper.find('input')
        await input.trigger('focus')

        expect(wrapper.find('.search-container').classes()).toContain('focused')

    })
})

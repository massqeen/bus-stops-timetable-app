import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import SotIcon from '@/components/icons/SortIcon.vue'

describe('SotIcon.vue', () => {
    it('renders with isSortedAsc=true', () => {
        const wrapper = mount(SotIcon, {
            props: { isSortedAsc: true }
        })

        const paths = wrapper.findAll('path')

        expect(paths[0].attributes('fill')).toBe('#000')
        expect(paths[1].attributes('fill')).toBe('#9A9DA4')
    })

    it('renders with isSortedAsc=false', () => {
        const wrapper = mount(SotIcon, {
            props: { isSortedAsc: false }
        })

        const paths = wrapper.findAll('path')

        expect(paths[0].attributes('fill')).toBe('#9A9DA4')
        expect(paths[1].attributes('fill')).toBe('#000')
    })
})

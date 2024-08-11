import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import BusLineItem from '@/components/BusLineItem.vue'
import { BusLine } from '@/store'

describe('BusLineItem.vue', () => {
    const line: BusLine = { id: 1, order: 'Line 1' };

    it('renders line id correctly', () => {
        const wrapper = shallowMount(BusLineItem, {
            props: {
                line,
                isActive: false
            }
        });

        expect(wrapper.text()).toContain(line.id.toString());
    });

    it('emits lineSelected event when clicked', async () => {
        const wrapper = shallowMount(BusLineItem, {
            props: {
                line,
                isActive: false
            }
        });

        await wrapper.trigger('click');

        expect(wrapper.emitted('lineSelected')).toBeTruthy();
        expect(wrapper.emitted('lineSelected')?.[0]).toEqual([line]);
    });

    it('applies active class when isActive is true', () => {
        const wrapper = shallowMount(BusLineItem, {
            props: {
                line,
                isActive: true
            }
        });

        expect(wrapper.classes()).toContain('active');
    });

    it('does not apply active class when isActive is false', () => {
        const wrapper = shallowMount(BusLineItem, {
            props: {
                line,
                isActive: false
            }
        });

        expect(wrapper.classes()).not.toContain('active');
    });
});

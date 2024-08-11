import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import AppMain from '@/components/AppMain.vue';

describe('AppMain.vue', () => {
    it('renders the main element', () => {
        const wrapper = shallowMount(AppMain);
        expect(wrapper.find('main').exists()).toBe(true);
    });

    it('renders the router view inside the main element', () => {
        const wrapper = shallowMount(AppMain);
        expect(wrapper.find('router-view').exists()).toBe(true);
    });

    it('applies the correct class to the main element', () => {
        const wrapper = shallowMount(AppMain);
        expect(wrapper.find('main').classes()).toContain('main');
    });

    it('main element is styled with the correct width', () => {
        const wrapper = shallowMount(AppMain);
        const mainElement = wrapper.find('main');
        expect(mainElement.classes()).toContain('main');
    });
});

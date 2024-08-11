import { describe, it, expect, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import BusLines from '@/views/BusLines.vue';
import { useStore } from '@/store';

vi.mock('@/store', () => ({
    useStore: vi.fn(),
}));

describe('BusLines.vue', () => {
    it('renders grid structure when no loading or error', () => {
        const mockStore = {
            state: {
                isLoading: false,
                error: null,
                busStops: [],
            },
        };

        (useStore as vi.Mock).mockReturnValue(mockStore);

        const wrapper = shallowMount(BusLines);

        expect(wrapper.find('.grid').exists()).toBe(true);
    });

    it('does not render grid structure when loading is true', () => {
        const mockStore = {
            state: {
                isLoading: true,
                error: null,
                busStops: [],
            },
        };

        (useStore as vi.Mock).mockReturnValue(mockStore);

        const wrapper = shallowMount(BusLines);

        expect(wrapper.find('.grid').exists()).toBe(false);
    });

    it('does not render grid structure when there is an error', () => {
        const mockStore = {
            state: {
                isLoading: false,
                error: 'Error occurred',
                busStops: [],
            },
        };

        (useStore as vi.Mock).mockReturnValue(mockStore);

        const wrapper = shallowMount(BusLines);

        expect(wrapper.find('.grid').exists()).toBe(false);
    });
});

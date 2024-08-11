import { shallowMount } from '@vue/test-utils'
import BusLineList from '@/components/BusLineList.vue'
import BusLineItem from '@/components/BusLineItem.vue'
import { createStore } from 'vuex'
import { key } from '@/store'

describe('BusLineList.vue', () => {
    let store;
    let wrapper;
    const busLines = [
        { id: 1, order: 1 },
        { id: 2, order: 2 }
    ];

    beforeEach(async () => {
        store = createStore({
            state: {
                busLines: [],
                busStops: [],
            },
            actions: {
                fetchBusLines: vi.fn().mockImplementation(({ commit }) => {
                    commit('setBusLines', busLines)
                }),
            },
            mutations: {
                setBusLines(state, lines) {
                    state.busLines = lines
                }
            }
        });

        wrapper = shallowMount(BusLineList, {
            global: {
                provide: {
                    [key as symbol]: store
                },
                stubs: {
                    BusLineItem: false // Отключаем заглушку для этого компонента
                }
            }
        });

        await store.dispatch('fetchBusLines');
        await wrapper.vm.$nextTick();
    });

    it('renders two bus lines', () => {
        const busLineItems = wrapper.findAllComponents(BusLineItem);
        expect(busLineItems.length).toBe(2);
    });

    it('renders BusLineItem as <li> elements', () => {
        const busLineItems = wrapper.findAllComponents(BusLineItem);
        busLineItems.forEach(item => {
            expect(item.element.tagName).toBe('LI');
        });
    });

    it('emits lineSelected event when a line is selected', async () => {
        const busLineItems = wrapper.findAllComponents(BusLineItem);

        // Проверка на эмиссию события lineSelected
        await busLineItems[0].vm.$emit('lineSelected', busLines[0]);
        expect(wrapper.emitted('lineSelected')).toBeTruthy();
        expect(wrapper.emitted('lineSelected')?.[0]).toEqual([busLines[0]]);
    });

    it('assigns selectedLine when a line is selected', async () => {
        // Присвоение selectedLine должно происходить при выборе линии
        wrapper.vm.handleSelectLine(busLines[0]);
        await wrapper.vm.$nextTick();
        expect(wrapper.vm.selectedLine).toEqual(busLines[0]);
    });
});

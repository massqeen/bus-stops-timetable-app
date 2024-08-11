import { shallowMount } from '@vue/test-utils'
import TimeList from '@/components/TimeList.vue'
import TimeItem from '@/components/TimeItem.vue'
import { describe, it, expect } from 'vitest'

describe('TimeList.vue', () => {
    const times = ['12:00', '12:30', '13:00']
    const selectedStopName = 'Main Street'

    it('renders the correct number of TimeItem components', () => {
        const wrapper = shallowMount(TimeList, {
            props: { times, selectedStopName }
        })

        const timeItems = wrapper.findAllComponents(TimeItem)
        expect(timeItems.length).toBe(times.length)
    })

    it('renders the correct stop name', () => {
        const wrapper = shallowMount(TimeList, {
            props: { times, selectedStopName }
        })

        expect(wrapper.find('.title').text()).toBe(`Bus Stop: ${selectedStopName}`)
    })

    it('scrolls to the top when times change', async () => {
        const wrapper = shallowMount(TimeList, {
            props: { times, selectedStopName },
            attachTo: document.body // Прикрепляем к реальному DOM
        })

        const container = wrapper.find('.time-list-container').element as HTMLElement
        container.scrollTop = 100 // Имитируем прокрутку

        await wrapper.setProps({ times: ['14:00', '14:30'] })

        // Убедитесь, что вызов обновлений завершен
        await wrapper.vm.$nextTick()

        // Проверяем, что scrollTop был сброшен
        expect(container.scrollTop).toBe(0)
    })

    it('renders the container with the correct classes', () => {
        const wrapper = shallowMount(TimeList, {
            props: { times, selectedStopName }
        })

        expect(wrapper.find('.time-list-container').exists()).toBe(true)
    })

    it('renders each TimeItem as an li element', () => {
        const wrapper = shallowMount(TimeList, {
            props: { times, selectedStopName },
            global: {
                stubs: {
                    TimeItem: false  // Убираем заглушку для TimeItem
                }
            }
        })

        const timeItems = wrapper.findAll('li.time-item')
        expect(timeItems.length).toBe(times.length)
    })
})

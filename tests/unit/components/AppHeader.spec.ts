import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import AppHeader from '@/components/AppHeader.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { nextTick } from 'vue'

const routes = [
    { path: '/lines', name: 'BusLines' },
    { path: '/stops', name: 'BusStops' },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

describe('AppHeader.vue', () => {
    it('renders the header with the correct title', () => {
        const wrapper = mount(AppHeader, {
            global: {
                plugins: [router],
            },
        })
        const title = wrapper.find('h1.title')
        expect(title.text()).toBe('Timetable')
    })

    it('renders navigation links with correct text', () => {
        const wrapper = mount(AppHeader, {
            global: {
                plugins: [router],
            },
        })

        const navLinks = wrapper.findAll('.nav-link')
        expect(navLinks[0].text()).toBe('Bus Lines')
        expect(navLinks[1].text()).toBe('Stops')
    })

    it('applies active class to the correct link based on the current route', async () => {
        await router.push('/lines')
        await router.isReady()

        const wrapper = mount(AppHeader, {
            global: {
                plugins: [router],
            },
        })

        await nextTick()

        const activeLink = wrapper.find('.nav-link.active')

        expect(activeLink.exists()).toBe(true)
        expect(activeLink.text()).toBe('Bus Lines')
    })
})

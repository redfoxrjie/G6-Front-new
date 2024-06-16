import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/trips',
      name: 'trips',
      component: () => import('../views/TripsView.vue')
    },
    {
      path: '/blog',
      name: 'blog',
      component: () => import('../views/BlogView.vue')
    },
    {
      path: '/news',
      name: 'news',
      component: () => import('../views/NewsView.vue')
    },
    {
      path: '/tickets',
      name: 'tickets',
      component: () => import('../views/TicketsView.vue')
    },
    {
      path: '/tickets/:id',
      name: 'ticketsInfo',
      component: () => import('../views/TicketInner.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/allTrips',
      name: 'allTrips',
      component: () => import('../views/AllTripsView.vue')
    },
    {
      path: '/memberMain',
      name: 'memberMain',
      component: () => import('../views/MemberMainView.vue')
    },
    {
      path: '/editMemberMain',
      name: 'editMemberMain',
      component: () => import('../views/EditMemberMainView.vue')
    },
    {
      path: '/tripsSearchResult',
      name: 'tripsSearchResult',
      component: () => import('../views/TripsSearchResultView.vue')
    },
      {  
        path: '/TicketOrder',
        name: 'TicketOrder',
        component: () => import('../views/TicketOrder.vue')
      },
      {  
        path: '/TicketInner/:id',
        name: 'TicketInner',
        component: () => import('../views/TicketInner.vue')
      },
    {  
      path: '/Contact',
      name: 'Contact',
      component: () => import('../views/ContactView.vue')
    },
    {
      path: '/blogSearchResult',
      name: 'blogSearchResult',
      component: () => import('../views/BlogSearchResultView.vue')
    },
    {
      path: '/blogPage',
      name: 'blogPage',
      component: () => import('../views/BlogPageView.vue')
    }
  ]
})

export default router

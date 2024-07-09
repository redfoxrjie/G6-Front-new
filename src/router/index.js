import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: '土狗旅遊'
      }
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
      path: '/trips/:trp_id',
      name: 'mytrip',
      component: () => import('../views/TripsView.vue')
    },
    {
      path: '/blog',
      name: 'blog',
      component: () => import('../views/BlogView.vue')
    },
    {
      path: '/blog/:query',
      name: 'blogPage',
      component: () => import('../views/BlogPageView.vue')
    },
    {
      path: '/news',
      name: 'news',
      component: () => import('../views/NewsView.vue')
    },
    {
      path: '/news/:id',
      name: 'newsPage',
      component: () => import('../views/NewsPageView.vue')
    },
    {
      path: '/tickets',
      name: 'tickets',
      component: () => import('../views/TicketsView.vue')
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
      path: '/tripsSearchResult/:query',
      name: 'tripsSearchResult',
      component: () => import('../views/TripsSearchResultView.vue')
    },
    {  
      path: '/TicketOrder/:id',
      name: 'TicketOrder',
      component: () => import('../views/TicketOrder.vue'),
    },
    {  
      path: '/OrderQRCode/:id',
      name: 'OrderQRCode',
      component: () => import('../views/OrderQRCode.vue'),
    },
    {  
      path: '/TicketInner/:id',
      name: 'TicketInner',
      component: () => import('../views/TicketInner.vue'),
      props: true
    },
    {  
      path: '/Contact',
      name: 'Contact',
      component: () => import('../views/ContactView.vue')
    },
    {
      path: '/blogsSearchResult/:query',
      name: 'blogsSearchResult',
      component: () => import('../views/BlogsSearchResultView.vue'),
      
    },
    // {
    //   path: '/blogPage',
    //   name: 'blogPage',
    //   component: () => import('../views/BlogPageView.vue')
    // },

    {
      path: '/member',
      name: 'member',
      component: () => import('../views/MemberView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/NotFoundView.vue') 
    },
    {
      path: '/test',
      name: 'testpage',
      component: () => import('../views/TestPageView.vue') 
    }
    // {
    //   path: '/PageFooter',
    //   name: 'PageFooter',
    //   component: () => import('../components/footer/PageFooter.vue')
    // }
  ],
  scrollBehavior (to, from, savedPosition) {
    //return 期望滾動到哪個位置
    return {top: 0}
  }

})

// router.beforeEach(asyc(to, from) => {
//   if(to.meta && to.meta.title){
//     document.title = to.meta.title
//   }
// })

export default router

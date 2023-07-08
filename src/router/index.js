import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ListingDetail from '../views/ListingDetail.vue'
import CreateListing from '../views/CreateListing.vue'
import EditListing from '../views/EditListing.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/detail/:id',
    name: 'ListingDetail',
    component: ListingDetail,
    props: true
  },
  {
    path: '/detail/edit/:id',
    name: 'EditListing',
    component: EditListing,
    props: true
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: AboutView
  },
  {
    path: '/create',
    name: 'create',
    component: CreateListing
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

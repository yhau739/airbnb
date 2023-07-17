import { createRouter, createWebHistory } from 'vue-router'
import { store } from '@/data/store'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ListingDetail from '../views/ListingDetail.vue'
import CreateListing from '../views/CreateListing.vue'
import EditListing from '../views/EditListing.vue'
import LoginView from '../views/LoginView.vue'
import ProfileView from '../views/ProfileView.vue'

const routes = [
  {
    path: '/:sessionUserId?',
    name: 'home',
    component: HomeView,
    props: true
  },
  {
    path: '/detail/:id',
    name: 'ListingDetail',
    component: ListingDetail,
    meta: { requiresAuth: true },
    props: true
  },
  {
    path: '/detail/edit/:id',
    name: 'EditListing',
    component: EditListing,
    meta: { requiresAuth: true },
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
    component: CreateListing,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/Profile',
    name: 'Profile',
    component: ProfileView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// navigation guard
router.beforeEach((to, from, next) => {
  // if finished login
  if (to.params.sessionUserId && !store.isLoggedIn) {
    // get sessionId from query parameter
    const sessionUserId = to.params.sessionUserId;
    // get login status
    const isLoggedIn = !!sessionUserId;

    // store into reactive object
    store.isLoggedIn = isLoggedIn;
    store.sessionUserId = sessionUserId;
  }

  // If the route requires authentication
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // If user is not logged in
    if (!store.isLoggedIn) {
      next('/login'); // Redirect to the login page
    } else {
      next(); // Continue to the next route
    }
  } else {
    next(); // Continue to the next route (no authentication required)
  }
});


export default router

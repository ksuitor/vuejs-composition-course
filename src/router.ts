import { createRouter, createWebHistory, RouteLocationNormalized, NavigationGuardNext, NavigationGuard } from 'vue-router'

import Home from './Home.vue'
import NewPost from './NewPost.vue'
import EditPost from './EditPost.vue'
import ShowPost from './ShowPost.vue'
import { store, Store } from './store'

const routes = [
  {
    name: 'Home',
    path: '/',
    component: Home
  },
  {
    name: 'ShowPost',
    path: '/posts/:id',
    component: ShowPost
  },
  {
    name: 'NewPost',
    path: '/posts/new',
    component: NewPost,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'EditPost',
    path: '/posts/:id/edit',
    component: EditPost,
    meta: {
      requiresAuth: true
    }
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

export const makeRouter = () => createRouter({
  history: createWebHistory(),
  routes
})

export const createBeforeEach = (store: Store) => {
  return (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    if (to.meta.requiresAuth && !store.getState().authors.currentUserId) {
      next({
        name: 'Home'
      })
    } else {
      next()
    }
  }
}

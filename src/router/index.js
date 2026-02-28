import { createRouter, createWebHistory } from 'vue-router'
import LoginUser from '../components/LoginUser.vue'
import CadastroUser from '../components/CadastroUser.vue'
import PaginaMain from '../components/PaginaMain.vue'
import PaginaAgendamento from '../components/PaginaAgendamento.vue'

const routes = [
  { path: '/', component: PaginaMain },
  { path: '/login', component: LoginUser },
  { path: '/cadastro', component: CadastroUser },
  { path: '/agendamento', component: PaginaAgendamento, meta: {requiresAuth: true} }  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token')

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login') 
  } else {
    next() 
  }
})

export default router
import { createRouter, createWebHistory } from 'vue-router'
import LoginUser from '../components/LoginUser.vue'
import CadastroUser from '../components/CadastroUser.vue'
import PaginaMain from '../components/PaginaMain.vue'
import PaginaAgendamento from '../components/PaginaAgendamento.vue'
import GerenciamentoConsultas from '@/components/GerenciamentoConsultas.vue'

const routes = [
  { path: '/', component: PaginaMain },
  { path: '/login', component: LoginUser },
  { path: '/cadastro', component: CadastroUser },
  { path: '/gerenciamento', component: GerenciamentoConsultas, meta: { requiresAuth: true, requiresAdmin: true } },
  { path: '/agendamento', component: PaginaAgendamento, meta: { requiresAuth: true} }  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token')
  const role = localStorage.getItem('role')


  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login') 
  } else if (to.meta.requiresAdmin && role !== "admin") {
    next('/')
  } 
  
  else {
    next() 
  }
})

export default router
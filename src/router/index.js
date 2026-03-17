import { createRouter, createWebHistory } from 'vue-router'
import LoginUser from '../components/LoginUser.vue'
import CadastroUser from '../components/CadastroUser.vue'
import PaginaMain from '../components/PaginaMain.vue'
import PaginaAgendamento from '../components/PaginaAgendamento.vue'
import GerenciamentoConsultas from '@/components/GerenciamentoConsultas.vue'
import UserProfile from '@/components/UserProfile.vue'
import { jwtDecode } from 'jwt-decode';
import LancarDatas from '@/components/LancarDatas.vue'

const routes = [
  { path: '/', component: PaginaMain },
  { path: '/login', component: LoginUser },
  { path: '/cadastro', component: CadastroUser },
  { path: '/gerenciamento', component: GerenciamentoConsultas, meta: { requiresAuth: true, requiresAdmin: true } },
  { path: '/agendamento', component: PaginaAgendamento, meta: { requiresAuth: true} },
  {path: '/perfil', component: UserProfile, meta: {requiresAuth: true}},
  { path: '/lancar-datas', component: LancarDatas, meta: { requiresAuth: true, requiresDentista: true } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  const isAuthenticated = !!token;

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
    return;
  }

  if (to.meta.requiresAdmin) {
    if (!token) {
      next('/');
      return;
    }
    const decoded = jwtDecode(token);
    if (decoded.role !== 'admin') {
      next('/');
      return;
    }
  }

  if (to.meta.requiresDentista) {
  if (!token) {
    next('/');
    return;
  }
  const decoded = jwtDecode(token);
  if (decoded.role !== 'Dentista') {
    next('/');
    return;
  }
}

  next();
});

export default router
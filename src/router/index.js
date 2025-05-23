import { createRouter, createWebHistory } from 'vue-router';
import MainLayout from '../layouts/MainLayout.vue';
import AuthLayout from '../layouts/AuthLayout.vue';
import Login from '../views/Login.vue';
import CreateAccount from '../views/CreateAccount.vue';
import ForgotPassword from '../views/ForgotPassword.vue';
import MainMenu from '../views/MainMenu.vue';
import MainBusiness from '@/views/MainBusiness.vue';
import BusinessProfile from '../views/BusinessProfile.vue';
import TaxCentralization from '../views/TaxCentralization.vue';
import BusinessCardLayout from '../layouts/BusinessCardLayout.vue';

const routes = [
  {
    path: '/', // Ruta principal
    component: AuthLayout,
    children: [
      { path: 'login', component: Login }, // Ruta para iniciar sesión
      { path: 'create-account', component: CreateAccount }, // Ruta para crear cuenta
      { path: 'forgot-password', component: ForgotPassword }, // Ruta para recuperar contraseña
    ]
  },
  {
    path: '/mainmenu', component: MainMenu,
  },
  {
    path: '/', // Ruta para el menú principal
    component: MainLayout,
    children: [
      {
        path: 'mainbusiness/:slug', component: MainBusiness, children: [
          {  path: '0', component: BusinessCardLayout, name: 'MainBusiness' },
        ]
      },
      { path: 'businessprofile/:slug', component: BusinessProfile, name: 'BusinessProfile' },
      {
        path: 'taxcentralization', component: TaxCentralization, children: [
          { path: '0', component: BusinessCardLayout }
        ]
      },
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
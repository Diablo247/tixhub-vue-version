import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import Dashboard from "../views/Dashboard.vue";
import Tickets from "../views/Tickets.vue";
import About from '../views/About.vue';

const routes = [
  { path: "/", component: LandingPage },
  { path: "/about", component: About },
  { path: "/signup", component: Signup, meta: { hideNavbar: true } },
  { path: "/login", component: Login, meta: { hideNavbar: true } },
  { path: "/dashboard", component: Dashboard, meta: { requiresAuth: true } },
  { path: "/tickets", component: Tickets, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// ✅ Global navigation guard
router.beforeEach((to, from, next) => {
  const session = JSON.parse(localStorage.getItem("ticketapp_session"));

  if (to.meta.requiresAuth && !session) {
    // user not logged in
    next("/login");
  } else if (
    (to.path === "/login" || to.path === "/signup") &&
    session
  ) {
    // logged-in user should not see auth pages
    next("/dashboard");
  } else {
    next();
  }
});

export default router;

<template>
  <nav class="navbar" ref="navRef">
    <div class="nav-container">
      <div class="nav-logo">
        <img src="@/assets/logo.png" alt="TixHub Logo" />
      </div>

      <!-- Navigation links -->
      <div :class="['nav-links', { 'active-m': menuOpen }]">
        <RouterLink
          to="/dashboard"
          class="nav-item"
          :class="{ active: route.path === '/dashboard' }"
        >
          Dashboard
        </RouterLink>

        <RouterLink
          to="/tickets"
          class="nav-item"
          :class="{ active: route.path === '/tickets' }"
        >
          Tickets
        </RouterLink>

        <RouterLink
          to="/about"
          class="nav-item"
          :class="{ active: route.path === '/about' }"
        >
          About
        </RouterLink>

        <!-- Mobile actions -->
        <div class="nav-actions mobile">
          <button
            v-if="isLoggedIn"
            class="logout-btn"
            @click="handleLogout"
          >
            Logout
          </button>
          <RouterLink
            v-else
            to="/login"
            class="login-btn"
          >
            Login
          </RouterLink>
        </div>
      </div>

      <!-- Desktop actions -->
      <div class="nav-actions desktop">
        <button
          v-if="isLoggedIn"
          class="logout-btn"
          @click="handleLogout"
        >
          Logout
        </button>
        <RouterLink
          v-else
          to="/login"
          class="login-btn"
        >
          Login
        </RouterLink>
      </div>

      <!-- Hamburger -->
      <div
        :class="['menu-toggle', { open: menuOpen }]"
        @click="toggleMenu"
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import "../assets/css/navbar.css"; // Reuse your React CSS

const menuOpen = ref(false);
const isLoggedIn = ref(false);
const navRef = ref(null);

const route = useRoute();
const router = useRouter();

// ✅ Check localStorage for session
onMounted(() => {
  const session = localStorage.getItem("ticketapp_session");
  isLoggedIn.value = !!session;
});

// ✅ Close menu when clicking outside
function handleClickOutside(e) {
  if (navRef.value && !navRef.value.contains(e.target)) {
    menuOpen.value = false;
  }
}

watch(menuOpen, (open) => {
  if (open) {
    document.addEventListener("click", handleClickOutside);
  } else {
    document.removeEventListener("click", handleClickOutside);
  }
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});

// ✅ Close menu on route change
watch(
  () => route.path,
  () => {
    menuOpen.value = false;
  }
);

// ✅ Toggle menu
function toggleMenu() {
  menuOpen.value = !menuOpen.value;
}

// ✅ Logout
function handleLogout() {
  localStorage.removeItem("ticketapp_session");
  isLoggedIn.value = false;
  router.push("/login");
}
</script>

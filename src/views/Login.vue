<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="handleSubmit" class="login-form">
      <p>Welcome back</p>

      <p v-if="errors.general" class="error-text">{{ errors.general }}</p>

      <div class="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          v-model="formData.email"
          tabindex="1"
        />
        <p v-if="errors.email" class="error-msg">{{ errors.email }}</p>
      </div>

      <div class="form-group">
        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          v-model="formData.password"
          tabindex="2"
        />
        <p v-if="errors.password" class="error-msg">{{ errors.password }}</p>
      </div>

      <button type="submit" class="submit-btn" tabindex="3">
        Login
      </button>

      <p class="redirect">
        Don’t have an account?
        <RouterLink to="/signup">Sign up</RouterLink>
      </p>
    </form>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import "../assets/css/auth.css";

const router = useRouter();

const formData = reactive({
  email: "",
  password: "",
});

const errors = reactive({
  email: "",
  password: "",
  general: "",
});

const handleSubmit = () => {
  const { email, password } = formData;
  errors.email = "";
  errors.password = "";
  errors.general = "";

  if (!email.trim()) errors.email = "Email is required";
  if (!password.trim()) errors.password = "Password is required";

  if (errors.email || errors.password) return;

  const users = JSON.parse(localStorage.getItem("ticketapp_users")) || [];
  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    errors.general = "Invalid email or password";
    return;
  }

  // ✅ Save user session
  localStorage.setItem(
    "ticketapp_session",
    JSON.stringify({ user, loggedIn: true })
  );

  router.push("/dashboard");
};
</script>

<style scoped>
/* You can reuse your same CSS from auth.css */
</style>

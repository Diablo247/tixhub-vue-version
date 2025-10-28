<template>
  <div class="signup-container">
    <h2>Signup</h2>
    <form @submit.prevent="handleSubmit" class="signup-form">
      <p>Create an account</p>

      <div class="form-group">
        <label for="name">Full Name</label>
        <input
          type="text"
          id="name"
          name="name"
          v-model="formData.name"
          placeholder="Enter your full name"
        />
        <p v-if="errors.name" class="error-msg">{{ errors.name }}</p>
      </div>

      <div class="form-group">
        <label for="email">Email Address</label>
        <input
          type="email"
          id="email"
          name="email"
          v-model="formData.email"
          placeholder="you@example.com"
        />
        <p v-if="errors.email" class="error-msg">{{ errors.email }}</p>
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          v-model="formData.password"
          placeholder="Enter a strong password"
        />
        <p v-if="errors.password" class="error-msg">{{ errors.password }}</p>
      </div>

      <button type="submit" class="submit-btn">Sign Up</button>

      <p v-if="successMessage" class="success-msg">{{ successMessage }}</p>

      <p class="redirect">
        Already have an account?
        <RouterLink to="/login">Log in</RouterLink>
      </p>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import "../assets/css/auth.css";

const router = useRouter();

const formData = reactive({
  name: "",
  email: "",
  password: "",
});

const errors = reactive({});
const successMessage = ref("");

// ✅ Validation logic
const validate = () => {
  const newErrors = {};

  if (!formData.name.trim()) newErrors.name = "Name is required.";
  if (!formData.email.trim()) {
    newErrors.email = "Email is required.";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.email = "Enter a valid email address.";
  }

  if (!formData.password.trim()) {
    newErrors.password = "Password is required.";
  } else if (formData.password.length < 5) {
    newErrors.password = "Password must be at least 5 characters.";
  }

  return newErrors;
};

// ✅ Form submission
const handleSubmit = () => {
  Object.keys(errors).forEach((key) => delete errors[key]);
  const validationErrors = validate();

  if (Object.keys(validationErrors).length > 0) {
    Object.assign(errors, validationErrors);
    return;
  }

  const existingUsers =
    JSON.parse(localStorage.getItem("ticketapp_users")) || [];

  const emailExists = existingUsers.some(
    (user) => user.email === formData.email
  );

  if (emailExists) {
    errors.email = "Email is already registered.";
    return;
  }

  const newUser = {
    name: formData.name,
    email: formData.email,
    password: formData.password,
  };

  const updatedUsers = [...existingUsers, newUser];
  localStorage.setItem("ticketapp_users", JSON.stringify(updatedUsers));

  successMessage.value = "Account created successfully! Redirecting to login...";
  setTimeout(() => router.push("/login"), 2000);
};
</script>

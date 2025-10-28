<template>
  <div class="landing-container">
    <img class="landing-img" src="@/assets/preview-img.png" alt="App preview" />
    <img class="landing-imgtwo" src="@/assets/preview-img.png" alt="App preview" />

    <div class="landing-content">
      <h1 class="landing-title">Tix-Hub</h1>

      <p class="landing-tagline">
        <span class="landing-highlight">
          “Simplifying ticket management, one at a time.”
        </span>
        <br />
        <span class="landing-subtext">
          Manage your tickets with ease and efficiency.
          <br />
          Track and resolve issues seamlessly.
        </span>
      </p>

      <RouterLink to="/signup" class="landing-button">
        Get Started →
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import "../assets/css/LandingPage.css"; // Reuse same CSS
</script>

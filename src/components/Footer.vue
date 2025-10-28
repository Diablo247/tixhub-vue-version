<template>
  <div class="footer">
    <div class="footer-container">
      <img :src="logo" alt="logo" />
      <div class="left-side">
        <p class="builtby">Built by Holy.dev</p>
        <p class="copyrights">&copy; 2025, All Rights Reserved</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import logo from "../assets/logo.png";
</script>

<style scoped src="../assets/css/footer.css"></style>

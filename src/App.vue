<template>
  <div id="app">
    <Background />
    <Footer />
    <!-- ✅ Only show Navbar when route doesn’t have hideNavbar -->
    <Navbar v-if="!$route.meta.hideNavbar" />
    <RouterView />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import Background from './components/background.vue'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

const route = useRoute()
</script>

<style>
/* global layout tweaks */
</style>

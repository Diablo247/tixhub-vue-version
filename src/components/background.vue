<template>
  <div class="background-container">
    <!-- Circles -->
    <div class="circle one"></div>
    <div class="circle two"></div>
    <div class="circle three"></div>

    <!-- Wave SVG -->
    <div class="wave one">
      <svg
        width="2085"
        height="299"
        viewBox="0 0 2085 299"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 152.288L69.5 132.757C139 112.859 278 74.3473 417 74.0722C556 74.3473 695 112.859 834 113.134C973 112.859 1147 34.546 1286 14.6482C1425 -4.88286 1529 -4.88265 1668 14.6484C1807 34.5462 1946 112.859 2015.5 132.757L2085 152.288V299H2015.5C1946 299 1807 299 1668 299C1529 299 1390 299 1251 299C1112 299 973 299 834 299C695 299 556 299 417 299C278 299 139 299 69.5 299H0V152.288Z"
          fill="#FF872B"
        />
      </svg>
    </div>

    <div class="wave two">
      <svg
        width="2085"
        height="919"
        viewBox="0 0 2085 919"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 468.069L69.5 408.039C139 346.882 278 228.512 417 227.667C556 228.512 695 346.882 834 347.727C973 346.882 1147 106.18 1286 45.0223C1425 -15.0079 1529 -15.0072 1668 45.0229C1807 106.18 1946 346.882 2015.5 408.039L2085 468.069V919H2015.5C1946 919 1807 919 1668 919C1529 919 1390 919 1251 919C1112 919 973 919 834 919C695 919 556 919 417 919C278 919 139 919 69.5 919H0V468.069Z"
          fill="#FF872B"
        />
      </svg>
    </div>
  </div>
</template>

<script setup>
// Optionally import the CSS file here if you prefer component-local import
import '../assets/css/background.css'
</script>

<!-- No scoped styles here — use your existing background.css -->

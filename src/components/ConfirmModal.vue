<template>
  <div class="confirm-overlay">
    <div class="confirm-modal">
      <p>{{ message }}</p>
      <div class="modal-actions">
        <button class="confirm-btn" @click="$emit('confirm')">Yes</button>
        <button class="cancel-btn" @click="$emit('cancel')">No</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import "../assets/css/tickets.css";

defineProps({
  message: {
    type: String,
    default: "Are you sure?",
  },
});

defineEmits(["confirm", "cancel"]);
</script>

<style scoped>

</style>

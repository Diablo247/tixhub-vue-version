<template>
  <div class="ticket-list-container">
    <div class="filters">
      <input
        type="text"
        placeholder="Search by name..."
        v-model="search"
      />
      <select v-model="priorityFilter">
        <option>All</option>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
      <select v-model="statusFilter">
        <option>All</option>
        <option value="open">Open</option>
        <option value="in_progress">In Progress</option>
        <option value="closed">Closed</option>
      </select>
    </div>

    <p v-if="filteredTickets.length === 0" class="no-tickets">No tickets found</p>

    <div v-else class="ticket-grid">
      <div class="ticket-card" v-for="t in filteredTickets" :key="t.id">
        <div class="ticket-card-header">
          <h3>{{ t.name }}</h3>

          <div class="tags">
            <p class="priority" :class="t.priority.toLowerCase()">{{ t.priority }}</p>
            <span class="status" :style="{ backgroundColor: statusColors[t.status] }">
              {{ t.status }}
            </span>
          </div>
        </div>

        <p class="desc">{{ t.description }}</p>

        <div class="ticket-bottom">
          <p><strong>Due:</strong> {{ t.dueDate }}</p>
        </div>

        <div class="actions">
          <button @click="$emit('edit', t)">edit</button>
          <button class="del" @click="$emit('delete', t.id)">delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import "../assets/css/tickets.css";

const props = defineProps({
  tickets: { type: Array, default: () => [] },
});

const emits = defineEmits(["edit", "delete"]);

const search = ref("");
const priorityFilter = ref("All");
const statusFilter = ref("All");

const statusColors = {
  open: "green",
  in_progress: "orange",
  closed: "gray",
};

const filteredTickets = computed(() => {
  return props.tickets.filter((t) => {
    const matchesSearch = t.name.toLowerCase().includes(search.value.toLowerCase());
    const matchesPriority =
      priorityFilter.value === "All" || t.priority === priorityFilter.value;
    const matchesStatus =
      statusFilter.value === "All" || t.status === statusFilter.value;
    return matchesSearch && matchesPriority && matchesStatus;
  });
});
</script>

<style scoped>

</style>

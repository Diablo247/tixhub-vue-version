<template>
  <form class="ticket-form" @submit.prevent="handleSubmit">
    <h2>{{ ticket.id ? "Edit Ticket" : "Create Ticket" }}</h2>

    <!-- ✅ Title -->
    <div class="form-group">
      <label for="name">Title</label>
      <input
        type="text"
        name="name"
        v-model="ticket.name"
        placeholder="Enter title"
        class="input name"
        :class="{ error: errors.name }"
      />
      <p v-if="errors.name" class="error-msg">{{ errors.name }}</p>
    </div>

    <!-- ✅ Description -->
    <div class="form-group">
      <label for="description">Description</label>
      <textarea
        name="description"
        v-model="ticket.description"
        placeholder="Enter description"
        class="input desc"
        :class="{ error: errors.description }"
      />
      <p v-if="errors.description" class="error-msg">{{ errors.description }}</p>
    </div>

    <!-- ✅ Priority -->
    <div class="form-group">
      <label for="priority">Priority</label>
      <select
        name="priority"
        v-model="ticket.priority"
        class="input priority"
      >
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
    </div>

    <!-- ✅ Status -->
    <div class="form-group">
      <label for="status">Status</label>
      <select
        name="status"
        v-model="ticket.status"
        class="input status"
      >
        <option value="open">Open</option>
        <option value="in_progress">In Progress</option>
        <option value="closed">Closed</option>
      </select>
    </div>

    <!-- ✅ Due Date -->
    <div class="form-group">
      <label for="duedate">Due Date</label>
      <input
        type="date"
        name="dueDate"
        v-model="ticket.dueDate"
        class="input date"
        :class="{ error: errors.dueDate }"
      />
      <p v-if="errors.dueDate" class="error-msg">{{ errors.dueDate }}</p>
    </div>

    <!-- ✅ Buttons -->
    <div class="actions">
      <button type="submit">Save</button>
      <button type="button" class="cancel" @click="$emit('cancel')">
        Cancel
      </button>
    </div>
  </form>
</template>

<script setup>
import { reactive, watch, defineProps, defineEmits } from "vue";
import "../assets/css/tickets.css";

// ✅ Props and emits
const props = defineProps({
  existing: {
    type: Object,
    default: null,
  },
});
const emit = defineEmits(["save", "cancel"]);

// ✅ Ticket state
const ticket = reactive(
  props.existing
    ? { ...props.existing }
    : {
        name: "",
        description: "",
        priority: "Low",
        status: "open",
        dueDate: "",
      }
);

// ✅ Validation errors
const errors = reactive({
  name: "",
  description: "",
  dueDate: "",
});

// ✅ Watch for changes to existing ticket (for edit mode)
watch(
  () => props.existing,
  (newVal) => {
    if (newVal) Object.assign(ticket, newVal);
  }
);

// ✅ Submit handler
function handleSubmit() {
  errors.name = !ticket.name.trim() ? "Title is required" : "";
  errors.description = !ticket.description.trim()
    ? "Description is required"
    : "";
  errors.dueDate = !ticket.dueDate ? "Due date is required" : "";

  if (errors.name || errors.description || errors.dueDate) return;

  emit("save", { ...ticket });
  emit("cancel");
}
</script>

<style scoped>

</style>

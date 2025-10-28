<template>
  <div class="ticket-manager">
    <!-- ✅ Ticket Form -->
    <TicketForm
      v-if="editingTicket"
      :existing="editingTicket"
      @save="handleSave"
      @cancel="() => (editingTicket = null)"
    />

    <!-- ✅ Ticket List + Header -->
    <template v-else>
      <div class="ticket-header">
        <h2>My Tickets</h2>
        <button
          class="add-btn"
          @click="
            editingTicket = {
              name: '',
              description: '',
              priority: 'Low',
              status: 'open',
              dueDate: ''
            }
          "
        >
          + Add Ticket
        </button>
      </div>

      <TicketList
        :tickets="tickets"
        @edit="setEditingTicket"
        @delete="handleDeleteClick"
      />

      <ConfirmModal
        v-if="deleteId"
        message="Are you sure you want to delete this ticket?"
        @confirm="confirmDelete"
        @cancel="cancelDelete"
      />
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import TicketList from "../components/TicketList.vue";
import TicketForm from "../components/TicketForm.vue";
import ConfirmModal from "../components/ConfirmModal.vue";
import "../assets/css/tickets.css";

const router = useRouter();
const tickets = ref([]);
const editingTicket = ref(null);
const isLoaded = ref(false);
const deleteId = ref(null);

const session = JSON.parse(localStorage.getItem("ticketapp_session"));
const userEmail = session?.user?.email;

if (!userEmail) {
  router.push("/login");
}

const ticketsKey = `ticketapp_tickets_${userEmail}`;

// ✅ Load tickets
onMounted(() => {
  if (!userEmail) return;

  const stored = localStorage.getItem(ticketsKey);
  if (stored) {
    try {
      tickets.value = JSON.parse(stored);
    } catch {
      tickets.value = [];
    }
  } else {
    tickets.value = [];
  }
  isLoaded.value = true;
});

// ✅ Persist tickets
watch(
  tickets,
  (newTickets) => {
    if (isLoaded.value) {
      localStorage.setItem(ticketsKey, JSON.stringify(newTickets));
    }
  },
  { deep: true }
);

// ✅ Save ticket
function handleSave(ticket) {
  const updated = ticket.id
    ? tickets.value.map((t) => (t.id === ticket.id ? ticket : t))
    : [
        ...tickets.value,
        { ...ticket, id: Date.now(), createdAt: new Date().toISOString() },
      ];

  tickets.value = updated;
  editingTicket.value = null;
}

// ✅ Delete flow
function handleDeleteClick(id) {
  deleteId.value = id;
}

function confirmDelete() {
  tickets.value = tickets.value.filter((t) => t.id !== deleteId.value);
  deleteId.value = null;
}

function cancelDelete() {
  deleteId.value = null;
}

function setEditingTicket(ticket) {
  editingTicket.value = ticket;
}
</script>

<style scoped>

</style>

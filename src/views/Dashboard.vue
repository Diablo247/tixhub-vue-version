<template>
  <div class="dashboard">
    <div class="dashboard-container">
      <div class="dashboard-header">
        <h1>Dashboard</h1>

        <div class="header-container">
          <div class="header-content">
            <h3>Welcome, {{ userName }}!</h3>
            <p>Here’s a quick overview of your tickets.</p>
          </div>

          <div class="dashboard-actions">
            <button @click="goToTickets('all')" class="btn-primary">Tickets</button>
            <button @click="handleLogout" class="btn-secondary">Logout</button>
          </div>
        </div>
      </div>

      <!-- ✅ Stats Grid -->
      <div class="stats-container">
        <div class="stat-card total grid-item" @click="goToTickets('all')">
          <p>{{ stats.total }}</p>
          <h3>Total Tickets</h3>
        </div>

        <div class="stat-card open grid-item" @click="goToTickets('open')">
          <p>{{ stats.open }}</p>
          <h3>Open</h3>
        </div>

        <div class="stat-card in-progress grid-item" @click="goToTickets('in_progress')">
          <p>{{ stats.inProgress }}</p>
          <h3>In Progress</h3>
        </div>

        <div class="stat-card closed grid-item" @click="goToTickets('closed')">
          <p>{{ stats.closed }}</p>
          <h3>Closed</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import "../assets/css/dashboard.css";
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const stats = ref({
  total: 0,
  open: 0,
  inProgress: 0,
  closed: 0,
})

const userName = ref('')

// ✅ Load session and tickets
onMounted(() => {
  const session = JSON.parse(localStorage.getItem('ticketapp_session'))
  const user = session?.user || session

  if (!user) {
    // if not logged in, redirect to login
    router.push('/login')
    return
  }

  userName.value = user.name || 'User'

  const userTickets = JSON.parse(localStorage.getItem(`ticketapp_tickets_${user.email}`)) || []

  const total = userTickets.length
  const open = userTickets.filter((t) => t.status === 'open').length
  const inProgress = userTickets.filter((t) => t.status === 'in_progress').length
  const closed = userTickets.filter((t) => t.status === 'closed').length

  stats.value = { total, open, inProgress, closed }
})

// ✅ Logout
function handleLogout() {
  localStorage.removeItem('ticketapp_session')
  router.push('/login')
}

// ✅ Navigate to tickets with filter
function goToTickets(status) {
  router.push({ path: '/tickets', query: { filter: status } })
}
</script>

<style scoped>

</style>

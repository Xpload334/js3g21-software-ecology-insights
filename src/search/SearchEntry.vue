<script>
export default {
  name: 'SearchEntry',
  props: ['name', 'owner', 'description', 'url', 'openDashboardHandler'],
  methods: {
    openDashboard(owner, repoName) {
      console.log(`Opening dashboard ${owner}/${repoName}`);
      this.openDashboardHandler(owner, repoName);
    }
  }
}
</script>

<template>
  <div class="card">
    <div class="card-body">
      <div class="row">
        <div class="col-md-10">
          <!-- Your card content here -->
          <h5 class="card-title">{{ name }}</h5>
          <p class="card-text">{{ description }}</p>
          <p class="card-link"><a :href="url">{{url}}</a></p>
        </div>

        <div class="col-md-2">
          <!-- New button for opening the dashboard -->
          <button @click="openDashboard(owner, name)" class="btn btn-primary mt-2">Open Dashboard</button>
        </div>
      </div>
    </div>

    
  </div>
</template>

<style scoped>
.card {
  /* Your card styles here */
}
</style>

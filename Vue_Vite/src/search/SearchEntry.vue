<script>
  import {storeMain} from "../js/storeMain.js";

  export default {
    name: 'SearchEntry',
    props: ['name', 'description', 'url'],
    methods: {
      openDashboard(repoName){
        console.log(`Opening dashboard ${storeMain.owner}/${repoName}`)
        storeMain.openDashboard(storeMain.owner, repoName)
      }
    }
  }
</script>
<template>
  <div class="card">
    <!-- Your card content here -->
    <p><strong>Name:</strong> {{ name }}</p>
    <p><strong>Description:</strong> {{ description }}</p>
    <p><strong>URL:</strong>{{url}}</p>
    
      <!-- New button for opening the dashboard -->
      <button @click="openDashboard(name)">Open Dashboard</button>
  </div>
</template>

<style scoped>
.card {
  /* Your card styles here */
}
</style>

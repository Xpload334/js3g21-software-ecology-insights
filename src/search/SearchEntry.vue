<script>
import DataConvertUtils from "../js/dataConvertUtils.js";

export default {
  props: {
    name : String,
    owner : String,
    description : String,
    url : String,
    html_url : String,
    created_at : String,
    updated_at : String,
    topics : Array,
    private : Boolean,
    openDashboardHandler : Function
  },
  methods: {
    openDashboard(owner, repoName) {
      console.log(`Opening dashboard ${owner}/${repoName}`);
      this.openDashboardHandler(owner, repoName);
    },
    formatDate(inputDate){
      return DataConvertUtils.formatDate(inputDate);
    },
    relativeDate(inputDate){
      return DataConvertUtils.timeAgo(inputDate);
    }
  }
}
</script>

<template>
  <div class="card h-100">
    <div class="card-header">
      <div class="row">
        <h5 class="card-title col">{{ name }}</h5>
        <!-- TOPICS -->
        <div v-if="topics.length > 0">
          <div v-for="topic in topics">
            <span class="badge rounded-pill bg-primary">{{topic}}</span> &nbsp
          </div>
        </div>
        <div v-else>
          <span class="badge rounded-pill bg-secondary">No Topics</span> &nbsp
        </div>
        
        
      </div>
      
    </div>
    
    
    <div class="card-body">
      <div class="d-flex flex-column mb-3">
        <p class="card-text">{{ description }}</p>
        <p class="card-link"><a :href="html_url">{{html_url}}</a></p>
        
      </div>
    </div>
    
    <div class="card-footer">
      <div class="card-text text-muted text-wrap">
        <span class="badge bg-light text-dark text-muted">Created {{ relativeDate(created_at) }}</span>
        <br>
        <span class="badge bg-light text-dark text-muted">Last updated {{ relativeDate(updated_at) }}</span>
      </div>
      <div class="d-grid">
        <!-- New button for opening the dashboard -->
        <button @click="openDashboard(owner, name)" class="btn btn-outline-primary">Open</button>
      </div>
      
    </div>

    
  </div>
</template>

<style scoped>
.card {
  /* Your card styles here */
}
</style>

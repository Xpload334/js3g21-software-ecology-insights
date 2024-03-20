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
        <h5 class="card-title col-md-9">{{ name }}</h5>
        <!-- TOPICS -->
        <div class="col align-content-end">
          <!-- PRIVATE/PUBLIC -->
          <span v-if="private">
            <span class="badge rounded-pill bg-danger">Private</span> &nbsp
          </span>
          <span v-else>
            <span class="badge rounded-pill bg-success">Public</span> &nbsp
          </span>
          
          
          <span v-for="topic in topics">
            <span class="badge rounded-pill bg-primary">{{topic}}</span> &nbsp
          </span>
        </div>
        
      </div>
      
    </div>
    
    
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-center">
        <div class="col-md-5">
          <p class="card-text">{{ description }}</p>
          
          <p class="card-link"><a :href="html_url">{{html_url}}</a></p>
        </div>

        <div class="col-md-4">
          <p class="card-text text-muted">Created:<br>{{ formatDate(created_at) }}</p>
          <p class="card-text text-muted">Last Updated:<br>{{ relativeDate(updated_at) }}</p>
        </div>

        <div class="col-md-auto">
          <!-- New button for opening the dashboard -->
          <button @click="openDashboard(owner, name)" class="btn btn-primary">Open</button>
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

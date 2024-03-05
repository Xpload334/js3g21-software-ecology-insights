<template>
  <!-- Commits count -->
  <div class="card">
    <div class="card-header">
      <h5 class="card-title">Commits Overview</h5>
    </div>
    
    <div class="card-body">
      <!-- Overview -->
      <div>
        <p class="card-text"><b>{{commits_count}}</b> Commits</p>
        <p class="card-text"><b>{{authors_count}}</b> Unique Authors</p>
      </div>
    </div>
    <div class="card-header">
      <h5 class="card-title">Most Recent Commit</h5>
    </div>
    <div class="card-body">
      <!-- Most recent commit-->
      <div>
        <p class="card-text">Author: <b>{{last_commit_name}}</b></p>
        <p class="card-text text-muted">"{{last_commit_message}}"</p>
        <p class="card-text text-muted">{{last_commit_date}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    commits_count: Number,
    authors_count: Number,
    
    last_commit_name : String,
    last_commit_message : String,
    last_commit_date : String,
  }
}
</script>

<style scoped>

</style>
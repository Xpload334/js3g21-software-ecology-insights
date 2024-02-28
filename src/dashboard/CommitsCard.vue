<template>
  <!-- Commits count -->
  <div class="card">
    <div class="card-body">
      <!-- Overview -->
      <div>
        <h5 class="card-title">Commits Overview</h5>
        <p class="card-text"><b>{{commits_count}}</b> Commits</p>
        <p class="card-text"><b>{{authors_count}}</b> Unique Authors</p>
      </div>
      
      <br>
      <!-- Most recent commit-->
      <div>
        <h5 class="card-title">Most Recent Commit</h5>
        <p class="card-text">Author: <b>{{last_commit.author.name}}</b></p>
        <p class="card-text text-muted">"{{last_commit.message}}"</p>
        <p class="card-text text-muted">{{last_commit.author.date}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    commits_count: Number,
    authors_count: Number,
    last_commit: Object
  }
}
</script>

<style scoped>

</style>
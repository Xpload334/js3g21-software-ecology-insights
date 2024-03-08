<template>
  <div class="card">
    <div class="card-header">
      <h5 class="card-title">Most Recent Commit</h5>
    </div>
    <div class="card-body">
      <!-- Check if last_commit_name is available before displaying -->
      <p class="card-text" v-if="author">Author: <b>{{ author }}</b></p>
      <!-- Check if last_commit_message is available before displaying -->
      <p class="card-text text-muted" v-if="message">"{{ message }}"</p>
      <!-- Check if last_commit_date is available before displaying -->
      <p class="card-text text-muted" v-if="date">{{ date }}</p>
      <div v-else>
        <p>No recent commit information available.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // mostRecentCommit: Object,
    author : String,
    message : String,
    date : String,
  }
}
</script>

<style scoped>
/* Your styles here */
</style>

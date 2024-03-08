<template>
  <!-- Commits count -->
  <div class="card">
    <div class="card-header">
      <h5 class="card-title">Commits Overview</h5>
    </div>

    <div class="card-body">
      <!-- Overview -->
      <div v-if="commits_count !== null && authors_count !== null">
        <p class="card-text"><b>{{ commits_count }}</b> Commits</p>
        <p class="card-text"><b>{{ authors_count }}</b> Unique Authors</p>
      </div>
      <div v-else>
        <p class="card-text"><b>Loading...</b></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    commits_count: {
      type: Number,
      default: null,
    },
    authors_count: {
      type: Number,
      default: null,
    },
  },
};
</script>

<style scoped>
/* Your styles here */
</style>

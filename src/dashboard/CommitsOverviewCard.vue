<template>
  <!-- Commits count -->
  <div class="card">
    <div class="card-header">
      <h5 class="card-title">Commits Overview</h5>
    </div>

    <div class="card-body">
      <!-- Overview -->
      <div class="d-flex justify-content-between flex-wrap">
<!--        <p class="card-text"><b>{{ commits_count }}</b> Commits</p>-->
        <div class="placeholder-wave">
          <span v-if="commits_count !== null" class="badge bg-light text-dark fs-5">
            <span>{{ commits_count }}</span>
          </span>
          <span v-else class="placeholder col-12"></span>
          <p>Total Commits</p>
        </div>
        
        <div class="placeholder-wave">
          <span v-if="authors_count !== null" class="badge bg-light text-dark fs-5">
            <span>{{ authors_count }}</span>
          </span>
          <span v-else class="placeholder col-12"></span>
          <p>Unique Authors</p>
        </div>
<!--        <p class="card-text"><b>{{ authors_count }}</b> Unique Authors</p>-->
        
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

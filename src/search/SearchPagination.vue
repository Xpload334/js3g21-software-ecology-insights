<template>
  <div class="overflow-auto">
    <!-- PAGINATION -->
    <ul class="pagination justify-content-center">
      <li class="page-item">
        <button @click="previousPage" :disabled="currentPage <= 1 || isLoading"
                class="btn btn-outline-primary">&laquo;</button>
      </li>
      <li class="page-item disabled">
        <a class="page-link">{{ currentPage }} / {{ totalPages }}</a>
      </li>
      <li class="page-item">
        <button @click="nextPage" :disabled="currentPage >= totalPages || isLoading"
                class="btn btn-outline-primary">&raquo;</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    currentPage : Number,
    totalPages : Number,
    
    isLoading : Boolean,
    
    previousPage : Function,
    nextPage : Function,
  },
}
</script>

<style scoped>

</style>
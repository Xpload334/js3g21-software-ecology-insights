<template>
  <div class="card">
    <div class="card-header">
      <div class="d-flex justify-content-between align-items-center">
        <h5 class="card-title">Licensing</h5>
        
        <div v-if="url">
          <a :href="url" class="btn btn-primary">License Info</a>
        </div>
      </div>
      
    </div>

    <div class="card-body">
      <div v-if="name && url">
        <p class="card-text">{{ name }}</p>
        
      </div>
      <div v-else>
        <p class="card-text">No license information available.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: null,
    },
    url: {
      type: String,
      default: null,
    },
  },
};
</script>

<style scoped>
/* Your styles here */
</style>

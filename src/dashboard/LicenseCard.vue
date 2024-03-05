<template>
  <div class="card">
    <div class="card-header">
      <h5 class="card-title">Licensing</h5>
    </div>
    
    <div class="card-body">
      <div v-if="name && url">
        <p class="card-text">{{name}}</p> <!-- FIX -->
        <div v-if="url">
          <a :href="url" class="btn btn-primary">License Info</a>
        </div>
      </div>
      <div v-else>
        <p class="card-text">No license information available.</p>
      </div>
      
    </div>
  </div>
</template>

<script>
export default {
  props:{
    name: String,
    url: String,
  }
}
</script>

<style scoped>

</style>
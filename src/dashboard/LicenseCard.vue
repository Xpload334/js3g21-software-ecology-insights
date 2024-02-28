<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">Licensing</h5>
        <p class="card-text">{{name}}</p> <!-- FIX -->
        <div v-if="url">
          <a :href="url" class="btn btn-primary">License Info</a>
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
<template>
  <div class="card">
    <h2 class="card-title">README Content</h2>
    <div v-if="readmeContent" v-html="readmeContent"></div>
  </div>
</template>

<script>
export default {
  props:{
    readmeContent: Object,
  }
}
</script>

<style scoped>

</style>
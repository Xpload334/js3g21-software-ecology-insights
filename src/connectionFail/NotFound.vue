<!-- Error404.vue -->
<template>
  <div>
    <MainTitle :state="'search'"/>
  </div>
  
  <div>
    <h1>404 - Not Found</h1>
    <h2>:(</h2>
    <p>Sorry, the page you are looking for does not exist.</p>
  </div>
</template>

<script>
import MainTitle from "../components/MainTitle.vue";
export default {
  name: "NotFound",
  components: {MainTitle}
}
</script>

<style scoped>

</style>
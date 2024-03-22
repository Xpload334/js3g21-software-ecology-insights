<template>
  <div class="card">
    <div class="row g-0">
      <div class="col-md-3">
        <!-- Check if avatar_url is available -->
        <div v-if="avatar_url">
          <!-- Display user's avatar with a link to their GitHub profile -->
          <a :href="html_url" target="_blank">
            <img :src="avatar_url" class="img-fluid rounded-start" :alt="login">
          </a>
        </div>
        <!-- If avatar_url is not available, display a placeholder image -->
        <div v-else>
          <img src="https://placehold.co/400" class="img-fluid rounded-start" alt="placeholder">
        </div>
      </div>
      
      
      <div class="col-md-9">
        <div class="card-body">
          <!-- Display user's login with a placeholder if unavailable -->
          <h5 class="card-title placeholder-wave">
            <span v-if="login">{{ login }}</span>
            <span v-else class="placeholder col-8"></span>
            
          </h5>
          <!-- Display user's type with a placeholder if unavailable -->
          <p class="card-text placeholder-wave">
            <span v-if="type">{{ type }}</span>
            <span v-else class="placeholder col-6"></span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    avatar_url: String,
    login: String,
    type: String,
    html_url: String,
  }
}
</script>

<style scoped>
/* Add your styles here */
</style>

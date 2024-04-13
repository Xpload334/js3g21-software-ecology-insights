<template>
  <div class="card">
<!--    <div class="d-grid d-md-flex mb-3 flex-wrap justify-content-between">-->
    <div class="row">
      <div class="col-3">
        <!-- Check if avatar_url is available -->
        <div v-if="user">
          <!-- Display user's avatar with a link to their GitHub profile -->
          <a :href="user.html_url" target="_blank">
            <img :src="user.avatar_url" class="img-fluid rounded-start" :alt="user.login">
          </a>
        </div>
        <!-- If avatar_url is not available, display a placeholder image -->
        <div v-else>
          <img src="https://placehold.co/400" class="img-fluid rounded-start" alt="placeholder">
        </div>
      </div>
      
      <div class="col-5">
        <div class="card-body">
          <!-- Display user's login with a placeholder if unavailable -->
          <h5 class="card-title placeholder-wave" v-if="user">
            <span v-if="user.login">{{ user.login }}</span>
            <span v-else class="placeholder col"></span>

          </h5>
          <!-- Display user's type with a placeholder if unavailable -->
          <p class="card-text placeholder-wave" v-if="user">
            <span v-if="user.type">{{ user.type }}</span>
            <span v-else class="placeholder col"></span>
          </p>
        </div>
      </div>


      <div class="col-auto">
        <div v-if="user">
          <div class="d-grid gap-2">
            <a class="btn btn-outline-primary" data-bs-toggle="offcanvas" href="#offcanvasScrolling"
               role="button" aria-controls="offcanvasScrolling" @click="getUserData(user.login)">
              View More
            </a>
          </div>
          
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user:{
      avatar_url: String,
      login: String,
      type: String,
      html_url: String,
    },
    
    getUserData : {
      type: Function,
      required : true
    }
  }
}
</script>

<style scoped>
/* Add your styles here */
</style>

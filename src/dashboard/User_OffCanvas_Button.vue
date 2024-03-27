<template>
  <!-- REQUIRES A MATCHING HREF FOR OFFCANVAS TO FUNCTION-->
  <div>
    <a class="btn btn-primary" data-bs-toggle="offcanvas" href="#offcanvasScrolling"
       role="button" aria-controls="offcanvasScrolling" @click="getUserData(username)">
      View [{{username}}]
    </a>
  </div>
</template>

<script>

export default {
  props:{
    username: {
      type: String,
      required: true
    },
    
    getUserData : {
      type: Function,
      required: true,
    },
  },
}
</script>

<style scoped>

</style>
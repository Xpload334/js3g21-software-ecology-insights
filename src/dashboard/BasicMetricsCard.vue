<template>
  <div class="card">
    <div class="card-header">
      <h5 class="card-title">Basic Stats</h5>
    </div>
    
    <div class="card-body">
      <div class="d-flex flex-xl-wrap">
<!--      <div class="row row-cols-1 row-cols-md-3 g-4">-->
        <div class="col placeholder-wave">
          <span v-if="language" class="badge bg-light text-dark fs-5">
            <span>{{ language }}</span>
          </span>
          <span v-else class="placeholder col-12"></span>
          
          <p>Language</p>
        </div>
        
        <div class="col placeholder-wave">
          <span v-if="watchers_count" class="badge bg-light text-dark fs-5">
            <span>{{ watchers_count }}</span>
          </span>
          <span v-else class="placeholder col-12"></span>
          
          <p>Watchers</p>
        </div>

        <div class="col placeholder-wave">
          <span v-if="subscribers_count" class="badge bg-light text-dark fs-5">
            <span>{{ subscribers_count }}</span>
          </span>
          <span v-else class="placeholder col-12"></span>
          
          <p>Subscribers</p>
        </div>

        <div class="col placeholder-wave">
          <span v-if="stargazers_count" class="badge bg-light text-dark fs-5">
            <span>{{ stargazers_count }}</span>
          </span>
          <span v-else class="placeholder col-12"></span>
          
          <p>Stargazers</p>
        </div>

        <div class="col placeholder-wave">
          <span v-if="forks_count" class="badge bg-light text-dark fs-5">
            <span>{{ forks_count }}</span>
          </span>
          <span v-else class="placeholder col-12"></span>
          
          <p>Forks</p>
        </div>
      </div>
    </div>
  </div>
</template>

<!--<script setup>-->
<!--import {dashboardStore} from "./dashboardStore.js";-->

<!--</script>-->
<script>
export default {
  props:{
    language: String,
    watchers_count: Number,
    subscribers_count: Number,
    stargazers_count: Number,
    forks_count: Number
  }
}
</script>

<style scoped>

</style>
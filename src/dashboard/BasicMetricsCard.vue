<template>
  <div class="card">
    <div class="card-header">
      <h5 class="card-title">Basic Stats</h5>
    </div>
    
    <div class="card-body">
      <div class="row row-cols-1 row-cols-md-3 g-4">
        <div class="col card-text">
          <p>Language: <b>{{language}}</b></p>
        </div>
        
        <div class="col card-text">
          <p><b>{{watchers_count}}</b> Watching</p>
        </div>

        <div class="col card-text">
          <p><b>{{subscribers_count}}</b> Subscribed</p>
        </div>

        <div class="col card-text">
          <p><b>{{stargazers_count}}</b> Starred</p>
        </div>

        <div class="col card-text">
          <p><b>{{forks_count}}</b> Forks</p>
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
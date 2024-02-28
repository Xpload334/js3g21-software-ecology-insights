<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">Basic Stats</h5>
      <p class="card-text">Language: <b>{{language}}</b></p>
      <p class="card-text"><b>{{watchers_count}}</b> Watching</p>
      <p class="card-text"><b>{{subscribers_count}}</b> Subscribed</p>
      <p class="card-text"><b>{{stargazers_count}}</b> Starred</p>
      <p class="card-text"><b>{{forks_count}}</b> Forks</p>
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
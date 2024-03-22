<template>
  <div class="card">
    <div class="card-header">
      <h5 class="card-title">Most Recent Commit</h5>
    </div>
    <div class="card-body">
      <div class="row">
        <div v-if="author" class="col-md-4">
          <span class="badge bg-light ">
            <span class="text-dark fs-5">{{ author }}</span>
          </span>
<!--          <p>Author</p>-->
        </div>
        
        <div v-if="message" class="col-md-auto">
          <span class="card-text text-muted">"{{ message }}"</span>
        </div>
      </div>
      
      <div v-if="date">
        <br>
        <span class="badge bg-light text-dark text-muted">{{relativeDate(date)}}</span>
      </div>
      
<!--      <p class="card-text" v-if="author">Author: <b>{{ author }}</b></p>-->
<!--      -->
<!--      <p class="card-text text-muted" v-if="message">"{{ message }}"</p>-->
<!--      -->
<!--      <p class="card-text text-muted" v-if="date">{{ date }}</p>-->
<!--      <div v-else>-->
<!--        <p>No recent commit information available.</p>-->
<!--      </div>-->
    </div>
  </div>
</template>

<script>
import DataConvertUtils from "../js/dataConvertUtils.js";


export default {
  props: {
    author : String,
    message : String,
    date : String,
    // avatar_url : String,
    // html_url : String,
  },
  methods: {
    formatDate(inputDate){
      return DataConvertUtils.formatDate(inputDate);
    },
    relativeDate(inputDate){
      return DataConvertUtils.timeAgo(inputDate);
    }
  }
}
</script>

<style scoped>
/* Your styles here */
</style>

<template>
  <div class="card h-100">
    
    <div class="card-header azur-gradient">
      <h5 class="card-title">Most Recent Commit</h5>
    </div>
    
    <div class="card-body">
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
      <div class="card-footer">
        <span class="badge bg-light text-dark text-muted">{{relativeDate(date)}}</span>
      </div>
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

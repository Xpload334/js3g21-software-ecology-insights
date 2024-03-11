<template>
  <div class="card">
    <h1 class="card-header text-center">
      {{name}}
    </h1>
    
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <!-- DESCRIPTION -->
          <div v-if="description">
            <p class="card-text">{{description}}</p>
          </div>
          <div v-else>
            <span class="placeholder placeholder-glow col-md-auto"></span>
          </div>
          
          <br>

          <!-- HTML URL -->
          <div>
            <div v-if="html_url">
              <a :href="html_url" class="btn btn-primary">See On GitHub</a>
            </div>
            <div v-else>
              <a :href="'/'" class="btn btn-primary disabled placeholder col-md-auto">See On GitHub</a>
            </div>
          </div>
        </div>

        <!-- DATES -->
        <div class="card-text text-muted text-end">
          <p>Created:<br>{{ formatDate(created_at) }}</p>
          <p>Last Updated:<br>{{ relativeDate(updated_at) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DataConvertUtils from "../js/dataConvertUtils.js";

export default {
  props:{
    name: String,
    description: String,
    html_url: String,
    created_at: String,
    updated_at: String,
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

</style>
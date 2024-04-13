<template>
  <div class="card">
    <h1 class="card-header text-center azur-gradient">
      <span v-if="name !== null">
        <b>{{name}}</b>
      </span>
      <span v-else class="placeholder-wave placeholder-lg col-6"></span>
    </h1>
    
    <div class="card-body">
      <div>
        <!-- DESCRIPTION -->
        <div v-if="description" class="card-text">
          {{description}}
        </div>
        <div v-else>
          <span class="placeholder col-12"/>
          <span class="placeholder col-12"/>
        </div>

        <br>

        <!-- HTML URL -->
        <div>
          <div v-if="html_url">
            <a :href="html_url" class="btn btn-outline-primary" target="_blank">See On GitHub</a>
          </div>
          <div v-else>
            <a :href="'/'" class="btn btn-primary disabled placeholder col-md-auto">See On GitHub</a>
          </div>
        </div>
      </div>
    </div>
    
    <div class="card-footer">
      <!-- DATES -->
      <div class="card-text text-muted">
        <span class="badge bg-light text-dark text-muted">Created {{ formatDate(created_at) }}</span>
        &nbsp;
        <span class="badge bg-light text-dark text-muted">Last updated {{ formatDate(updated_at) }}</span>
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
<template>
  <div class="card">
    <!-- Header -->
    <div class="card-header">
      <h2 class="card-title text-center">Commit Activity</h2>
      <ul class="nav nav-tabs card-header-tabs">

        <!-- Lifetime -->
        <li class="nav-item">
          <div v-if="chartState === 'lifetime'">
            <a class="nav-link active" aria-current="true">Lifetime</a>
          </div>
          <div v-else>
            <a class="nav-link" aria-current="true" @click="changeChartState('lifetime')">Lifetime</a>
          </div>
        </li>

        <!-- Last Year -->
        <li class="nav-item">
          <div v-if="chartState === 'year'">
            <a class="nav-link active" aria-current="true">Last Year</a>
          </div>
          <div v-else>
            <a class="nav-link" aria-current="true" @click="changeChartState('year')">Last Year</a>
          </div>
        </li>
        
        <!-- Last 3 Months -->
        <li class="nav-item">
          <div v-if="chartState === 'threeMonths'">
            <a class="nav-link active" aria-current="true">Last 3 Months</a>
          </div>
          <div v-else>
            <a class="nav-link" aria-current="true" @click="changeChartState('threeMonths')">Last 3 Months</a>
          </div>
        </li>

        <!-- Last Month -->
        <li class="nav-item">
          <div v-if="chartState === 'month'">
            <a class="nav-link active" aria-current="true">Last Month</a>
          </div>
          <div v-else>
            <a class="nav-link" aria-current="true" @click="changeChartState('month')">Last Month</a>
          </div>
        </li>

        <!-- Last Week -->
        <li class="nav-item">
          <div v-if="chartState === 'week'">
            <a class="nav-link active" aria-current="true">Last Week</a>
          </div>
          <div v-else>
            <a class="nav-link" aria-current="true" @click="changeChartState('week')">Last Week</a>
          </div>
        </li>
        
        <!-- Refresh Button-->
        <li class="nav-item">
          <div id="commits-refresh-button">
            <button @click="refreshCommits()" class="btn btn-outline-primary" :disabled="is_loading">Refresh</button>
          </div>
        </li>
      </ul>
    </div>
    
    <!-- Body -->
    <div class="card-body">
      <div v-if="chartData !== null && Object.keys(chartData).length > 0">
        <!-- Chart Lifetime -->
        <div v-if="chartState === 'lifetime'">
          <CommitsChart :chart-data="chartData.lifetime"/>
        </div>

        <!-- Chart Last Year -->
        <div v-else-if="chartState === 'year'">
          <CommitsChart :chart-data="chartData.year"/>
        </div>

        <!-- Chart Last 3 Months -->
        <div v-else-if="chartState === 'threeMonths'">
          <CommitsChart :chart-data="chartData.threeMonths"/>
        </div>

        <!-- Chart Last Month -->
        <div v-else-if="chartState === 'month'">
          <CommitsChart :chart-data="chartData.month"/>
        </div>

        <!-- Chart Last Week -->
        <div v-else-if="chartState === 'week'">
          <CommitsChart :chart-data="chartData.week"/>
        </div>
        <div v-else>
          <p>No commits data available.</p>
        </div>
      </div>
      <div v-else>
        <p>Loading...</p> <!-- Placeholder while data is being loaded -->
      </div>
    </div>
  </div>
      
</template>

<script>
// import {dashboardStore} from "./dashboardStore.js";
import CommitsChart from "./CommitsChart.vue";

export default {
  props:{
    chartState: String,
    chartData: Object,
    //UNFINISHED
    change_chart_state : {
      type : Function
    },
    is_loading : [Boolean, String]
  },
  components:{
    CommitsChart
  },
  methods: {
    changeChartState(newState){
      //Emit an event to notify parent
      this.$emit('change-activity-chart-state', newState);
    },
    refreshCommits(){
      this.$emit('refresh-commits');
    }
  }
}
</script>

<style scoped>

</style>
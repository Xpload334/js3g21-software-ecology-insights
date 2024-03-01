<template>
  <div class="card">
    <!-- Header -->
    <div class="card-header">
      <h2 class="card-title text-center">Commit Activity</h2>
      <ul class="nav nav-tabs card-header-tabs">

        <!-- Lifetime -->
        <li class="nav-item">
          <div v-if="dashboardStore.chartState === 'lifetime'">
            <a class="nav-link active" aria-current="true">Lifetime</a>
          </div>
          <div v-else>
            <a class="nav-link" aria-current="true" @click="dashboardStore.setChartState('lifetime')">Lifetime</a>
          </div>
        </li>

        <!-- Last Year -->
        <li class="nav-item">
          <div v-if="dashboardStore.chartState === 'year'">
            <a class="nav-link active" aria-current="true">Last Year</a>
          </div>
          <div v-else>
            <a class="nav-link" aria-current="true" @click="dashboardStore.setChartState('year')">Last Year</a>
          </div>
        </li>
        
        <!-- Last 3 Months -->
        <li class="nav-item">
          <div v-if="dashboardStore.chartState === 'threeMonths'">
            <a class="nav-link active" aria-current="true">Last 3 Months</a>
          </div>
          <div v-else>
            <a class="nav-link" aria-current="true" @click="dashboardStore.setChartState('threeMonths')">Last 3 Months</a>
          </div>
        </li>

        <!-- Last Month -->
        <li class="nav-item">
          <div v-if="dashboardStore.chartState === 'month'">
            <a class="nav-link active" aria-current="true">Last Month</a>
          </div>
          <div v-else>
            <a class="nav-link" aria-current="true" @click="dashboardStore.setChartState('month')">Last Month</a>
          </div>
        </li>

        <!-- Last Week -->
        <li class="nav-item">
          <div v-if="dashboardStore.chartState === 'week'">
            <a class="nav-link active" aria-current="true">Last Week</a>
          </div>
          <div v-else>
            <a class="nav-link" aria-current="true" @click="dashboardStore.setChartState('week')">Last Week</a>
          </div>
        </li>
      </ul>
    </div>
    
    <!-- Body -->
    <div class="card-body">
      <div v-if="dashboardStore.chartData">
        <!-- Chart Lifetime -->
        <div v-if="dashboardStore.chartState === 'lifetime'">
          <CommitsChart :chart-data="dashboardStore.chartData.lifetime"/>
        </div>

        <!-- Chart Last Year -->
        <div v-else-if="dashboardStore.chartState === 'year'">
          <CommitsChart :chart-data="dashboardStore.chartData.year"/>
        </div>

        <!-- Chart Last 3 Months -->
        <div v-else-if="dashboardStore.chartState === 'threeMonths'">
          <CommitsChart :chart-data="dashboardStore.chartData.threeMonths"/>
        </div>

        <!-- Chart Last Month -->
        <div v-else-if="dashboardStore.chartState === 'month'">
          <CommitsChart :chart-data="dashboardStore.chartData.month"/>
        </div>

        <!-- Chart Last Week -->
        <div v-else-if="dashboardStore.chartState === 'week'">
          <CommitsChart :chart-data="dashboardStore.chartData.week"/>
        </div>
      </div>
      <div v-else>
        <p>No commits data available.</p>
      </div>
      
      
      
    </div>
  </div>
      
</template>

<script setup>
import {dashboardStore} from "./dashboardStore.js";
import CommitsChart from "./CommitsChart.vue";
</script>

<style scoped>

</style>
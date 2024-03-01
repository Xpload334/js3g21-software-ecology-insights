<template>
  <div class="card">
    <div class="card-header">
      <h2 class="card-title text-center">Top Contributors</h2>
      <p>Last 100 Weeks</p>
    </div>
    
    <div class="card-body">
      <!-- Check if contributorsChartData is defined and has at least one entry -->
      <div v-if="dashboardStore.contributorsTop">
        <div class="row row-cols-1 row-cols-md-3 g-4">
          <!-- For each contributor card -->
          <div v-for="item in dashboardStore.contributorsTop">
            <div class="col">
              <div class="card">
                <UserCard v-bind="item.author"/>
                <CommitsChart :chart-data="chartDataContributors.convertContributorToChartJSData(item)"/>
              </div>
            </div>
          </div>
        </div>

        <!--      <div class="row">-->
        <!--        <div v-for="item in dashboardStore.contributorsTop">-->
        <!--          <div class="col-md-4">-->
        <!--            <UserCard v-bind="item.author"/>-->
        <!--          </div>-->
        <!--          <div class="col-md-4">-->
        <!--            <CommitsChart :chart-data="chartDataContributors.convertContributorToChartJSData(item)"/>-->
        <!--          </div>-->
        <!--        </div>-->
        <!--      </div>-->
      </div>
      <div v-else>
        <p>No contributors data available.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { dashboardStore } from "./dashboardStore.js";
import {chartDataContributors} from "../js/chartDataContributors.js";
import CommitsChart from "./CommitsChart.vue";
import UserCard from "./UserCard.vue";

</script>

<style scoped>
/* Add your styles here */
</style>

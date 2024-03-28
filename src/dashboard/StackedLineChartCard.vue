<template>
  <div class="card">
    <div class="card-header">
      <h2 class="card-title text-center">Contributors Stacked</h2>
      <p class="card-subtitle text-center">Last 100 Weeks</p>
    </div>

    <div class="card-body">
      <div v-if="chartData !== null && Object.keys(chartData).length > 0">
        <!-- CommitsChart component for contributor's commit chart -->
        <StackedLineChart
            :chart-data="chartData"
            :suggested-max-y="suggestedMax"
        />
      </div>
      <div v-else>
        <p>No contributors data available. Please try again.</p>
      </div>
    </div>
  </div>
</template>

<script>
import CommitsChart from "./CommitsChart.vue";
import StackedLineChart from "../components/charts/StackedLineChart.vue";
export default {
  components: {StackedLineChart, CommitsChart},
  props: {
    chartData: Object,
    suggestedMax: Number,
  },
}
</script>

<style scoped>

</style>
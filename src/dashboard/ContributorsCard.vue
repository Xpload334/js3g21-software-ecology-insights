<template>
  <div class="card">
    <div class="card-header">
      <h2 class="card-title text-center">Top Contributors</h2>
      <p class="card-subtitle text-center">Last 100 Weeks</p>
      <ul class="nav nav-tabs card-header-tabs">

        <!-- Multi -->
        <li class="nav-item">
          <div v-if="chartState === 'multi'">
            <a class="nav-link active" aria-current="true">Top {{contributorsTop.length}}</a>
          </div>
          <div v-else>
            <a class="nav-link" aria-current="true" @click="changeChartState('multi')">Top {{contributorsTop.length}}</a>
          </div>
        </li>

        <!-- Stacked -->
        <li class="nav-item">
          <div v-if="chartState === 'stacked'">
            <a class="nav-link active" aria-current="true">Stacked</a>
          </div>
          <div v-else>
            <a class="nav-link" aria-current="true" @click="changeChartState('stacked')">Stacked</a>
          </div>
        </li>
      </ul>
    </div>

    <div class="card-body">
      <!-- Check if contributorsTop is defined and has at least one entry -->
      <div v-if="chartState==='multi'">
        <div v-if="contributorsTop && contributorsTop.length > 0">
          <ContributorsChartCard_Multi
              :contributors-top="contributorsTop"
              :suggested-max="suggestedMax"
              :suggested-max-y1="suggestedMaxY1"
          />
          <!--        <div class="row row-cols-1 row-cols-md-2 g-4">-->
          <!--          &lt;!&ndash; For each contributor card &ndash;&gt;-->
          <!--          <div v-for="item in contributorsTop">-->
          <!--            <div class="col">-->
          <!--              <div class="card">-->
          <!--                &lt;!&ndash; UserCard component to display contributor info &ndash;&gt;-->
          <!--                <UserCard v-bind="item.author"/>-->

          <!--                &lt;!&ndash; CommitsChart component for contributor's commit chart &ndash;&gt;-->
          <!--                <LineChart_DualYAxes-->
          <!--                    :chart-data="item.chartData"-->
          <!--                    :suggested-max-y="suggestedMax"-->
          <!--                    :suggested-max-y1="suggestedMaxY1"-->
          <!--                />-->
          <!--              </div>-->
          <!--            </div>-->
          <!--          </div>-->
          <!--        </div>-->
        </div>
        <div v-else>
          <p>No contributors data available. Please try again.</p>
        </div>
      </div>
      
      <div v-else-if="chartState==='stacked'">
        <div v-if="contributorsChartDataStacked !== null && Object.keys(contributorsChartDataStacked).length > 0">
          <!-- CommitsChart component for contributor's commit chart -->
          <StackedLineChart
              :chart-data="contributorsChartDataStacked"
              :suggested-max-y="suggestedMaxStacked"
          />
        </div>
        <div v-else>
          <p>No contributors data available. Please try again.</p>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
// Import necessary components
import UserCard from "../components/cards/UserCard.vue";
import CommitsChart from "./CommitsChart.vue";
import LineChart_DualYAxes from "./LineChart_DualYAxes.vue";
import ContributorsChartCard_Multi from "./ContributorsChartCard_Multi.vue";
import StackedLineChart from "../components/charts/StackedLineChart.vue";

export default {
  props: {
    chartState : {
      type: String,
      default: "multi"
    },
    
    contributorsTop: Object,
    suggestedMax: Number,
    suggestedMaxY1: Number,

    contributorsChartDataStacked : Object,
    suggestedMaxStacked : Number,
    
    changeChartState : Function
    
  },
  components: {
    StackedLineChart,
    ContributorsChartCard_Multi,
    LineChart_DualYAxes,
    CommitsChart,
    UserCard
  }
}
</script>

<style scoped>
/* Add your styles here */
</style>

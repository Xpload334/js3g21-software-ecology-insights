<template>
  <div class="card">
    <div class="card-header azur-gradient">
      <h2 class="card-title text-center">Top Contributors</h2>
      <p class="card-subtitle text-center">Last 100 Weeks</p>
      
      <br>
      
      <ul class="nav nav-tabs card-header-tabs flex-column flex-sm-row">

        <!-- Multi -->
        <li class="flex-sm-fill text-sm-center nav-item">
          <div v-if="chartState === 'multi'">
            <a class="nav-link active text-dark" aria-current="true">Top
              <span v-if="contributorsTop.length >= 0"> {{contributorsTop.length}}</span>
            </a>
          </div>
          <div v-else>
            <a class="nav-link text-dark" aria-current="true" @click="changeChartState('multi')">Top
              <span v-if="contributorsTop.length >= 0"> {{contributorsTop.length}}</span>
            </a>
          </div>
        </li>

        <!-- Stacked -->
        <li class="flex-sm-fill text-sm-center nav-item">
          <div v-if="chartState === 'stacked'">
            <a class="nav-link active text-dark" aria-current="true">Stacked Commits</a>
          </div>
          <div v-else>
            <a class="nav-link text-dark" aria-current="true" @click="changeChartState('stacked')">Stacked Commits</a>
          </div>
        </li>

        <!-- Reload Button -->
        <li class="text-sm-center nav-item">
          <div v-if="isLoading">
            <a class="nav-link active" aria-current="true">
              <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>

              <span class="badge text-bg-dark">Refresh Contributors</span>
            </a>
<!--            <button class="btn btn-outline-light" type="button" disabled>-->
<!--              <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>-->
<!--              Refresh Contributors-->
<!--            </button>-->
          </div>
          <div v-else>
            <a class="nav-link" aria-current="true" @click="refreshContributors()">
              <span class="badge text-bg-dark">Refresh Contributors</span>
            </a>
<!--            <button @click="refreshContributors()" class="btn btn-outline-light" :disabled="isLoading">Refresh Contributors</button>-->
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
              
              :get-user-data="getUserData"
          />
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
    isLoading : Boolean,
    chartState : {
      type: String,
      default: "multi"
    },
    
    contributorsTop: Object,
    suggestedMax: Number,
    suggestedMaxY1: Number,

    contributorsChartDataStacked : Object,
    suggestedMaxStacked : Number,
    
    changeChartState : Function,
    getUserData : {
      type: Function,
      required : true
    }
    
  },
  components: {
    StackedLineChart,
    ContributorsChartCard_Multi,
    LineChart_DualYAxes,
    CommitsChart,
    UserCard
  },
  methods: {
    refreshContributors(){
      this.$emit('refresh-contributors');
    }
  }
}
</script>

<style scoped>
/* Add your styles here */
</style>

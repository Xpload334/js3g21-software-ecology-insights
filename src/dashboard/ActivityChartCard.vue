<template>
  <div class="card">
    <!-- Header -->
    <div class="card-header">
      <h2 class="card-title text-center">Activity</h2>
      <ul class="nav nav-tabs card-header-tabs justify-content-center">

        <!-- Lifetime -->
        <li class="nav-item">
          <div v-if="chartState === 'lifetime'">
            <a class="nav-link active" aria-current="true">Lifetime
              <span v-if="commitsChartData.lifetime">
                <span class="badge bg-primary">{{sumArray(commitsChartData.lifetime.datasets[0].data)}}</span>
              </span>
              &nbsp
              <span v-if="issuesChartData.lifetime">
                <span class="badge bg-warning" >{{sumArray(issuesChartData.lifetime.datasets[0].data)}}</span>
              </span>
            </a>
          </div>
          <div v-else>
            <a class="nav-link" aria-current="true" @click="changeChartState('lifetime')">Lifetime</a>
          </div>
        </li>

        <!-- Last Year -->
        <li class="nav-item">
          <div v-if="chartState === 'year'">
            <a class="nav-link active" aria-current="true">Last Year
              <span v-if="commitsChartData.year">
                <span class="badge bg-primary">{{sumArray(commitsChartData.year.datasets[0].data)}}</span>
              </span>
              &nbsp
              <span v-if="issuesChartData.year">
                <span class="badge bg-warning" >{{sumArray(issuesChartData.year.datasets[0].data)}}</span>
              </span>
            </a>
          </div>
          <div v-else>
            <a class="nav-link" aria-current="true" @click="changeChartState('year')">Last Year</a>
          </div>
        </li>
        
        <!-- Last 3 Months -->
        <li class="nav-item">
          <div v-if="chartState === 'threeMonths'">
            <a class="nav-link active" aria-current="true">Last 3 Months
              <span v-if="commitsChartData.threeMonths">
                <span class="badge bg-primary">{{sumArray(commitsChartData.threeMonths.datasets[0].data)}}</span>
              </span>
              &nbsp
              <span v-if="issuesChartData.threeMonths">
                <span class="badge bg-warning" >{{sumArray(issuesChartData.threeMonths.datasets[0].data)}}</span>
              </span>
            </a>
          </div>
          <div v-else>
            <a class="nav-link" aria-current="true" @click="changeChartState('threeMonths')">Last 3 Months</a>
          </div>
        </li>

        <!-- Last Month -->
        <li class="nav-item">
          <div v-if="chartState === 'month'">
            <a class="nav-link active" aria-current="true">Last Month
              <span v-if="commitsChartData.month">
                <span class="badge bg-primary">{{sumArray(commitsChartData.month.datasets[0].data)}}</span>
              </span>
              &nbsp
              <span v-if="issuesChartData.month">
                <span class="badge bg-warning" >{{sumArray(issuesChartData.month.datasets[0].data)}}</span>
              </span>
            </a>
          </div>
          <div v-else>
            <a class="nav-link" aria-current="true" @click="changeChartState('month')">Last Month</a>
          </div>
        </li>

        <!-- Last Week -->
        <li class="nav-item">
          <div v-if="chartState === 'week'">
            <a class="nav-link active" aria-current="true">Last Week
              <span v-if="commitsChartData.week">
                <span class="badge bg-primary">{{sumArray(commitsChartData.week.datasets[0].data)}}</span>
              </span>
              &nbsp
              <span v-if="issuesChartData.week">
                <span class="badge bg-warning" >{{sumArray(issuesChartData.week.datasets[0].data)}}</span>
              </span>
            </a>
          </div>
          <div v-else>
            <a class="nav-link" aria-current="true" @click="changeChartState('week')">Last Week</a>
          </div>
        </li>
        
<!--        &lt;!&ndash; Refresh Button&ndash;&gt;-->
<!--        <li class="nav-item">-->
<!--          <div id="commits-refresh-button">-->
<!--            <button @click="refreshCommits()" class="btn btn-outline-primary" :disabled="is_loading">Refresh</button>-->
<!--          </div>-->
<!--        </li>-->
        <!-- Reload Button -->
        <li class="nav-item">
          <div v-if="is_loading">
            <button class="btn btn-primary" type="button" disabled>
              <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              Refresh
            </button>
          </div>
          <div v-else>
            <button @click="refreshCommits()" class="btn btn-primary" :disabled="is_loading">Reload</button>
          </div>
        </li>
        
        
      </ul>
    </div>
    
    <!-- Body -->
    <div class="card-body">
      <div v-if="commitsChartData !== null && Object.keys(commitsChartData).length > 0">
        <!-- Chart Lifetime -->
        <div v-if="chartState === 'lifetime'">
          <LineChart_DualYAxes
              :chart-data="combineChartData(commitsChartData.lifetime, issuesChartData.lifetime)"
              :suggested-max-y="getSuggestedMaxY(commitsChartData.lifetime)"
              :suggested-max-y1="getSuggestedMaxY(issuesChartData.lifetime)"
          />
        </div>

        <!-- Chart Last Year -->
        <div v-else-if="chartState === 'year'">
          <LineChart_DualYAxes 
              :chart-data="combineChartData(commitsChartData.year, issuesChartData.year)"
              :suggested-max-y="getSuggestedMaxY(commitsChartData.year)"
              :suggested-max-y1="getSuggestedMaxY(issuesChartData.year)"
          />
        </div>

        <!-- Chart Last 3 Months -->
        <div v-else-if="chartState === 'threeMonths'">
          <LineChart_DualYAxes
              :chart-data="combineChartData(commitsChartData.threeMonths, issuesChartData.threeMonths)"
              :suggested-max-y="getSuggestedMaxY(commitsChartData.threeMonths)"
              :suggested-max-y1="getSuggestedMaxY(issuesChartData.threeMonths)"
          />
        </div>

        <!-- Chart Last Month -->
        <div v-else-if="chartState === 'month'">
          <LineChart_DualYAxes
              :chart-data="combineChartData(commitsChartData.month, issuesChartData.month)"
              :suggested-max-y="getSuggestedMaxY(commitsChartData.month)"
              :suggested-max-y1="getSuggestedMaxY(issuesChartData.month)"
          />
        </div>

        <!-- Chart Last Week -->
        <div v-else-if="chartState === 'week'">
          <LineChart_DualYAxes
              :chart-data="combineChartData(commitsChartData.week, issuesChartData.week)"
              :suggested-max-y="getSuggestedMaxY(commitsChartData.week)"
              :suggested-max-y1="getSuggestedMaxY(issuesChartData.week)"
          />
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
// <div v-if="chartData !== null && Object.keys(chartData).length > 0">
// import {dashboardStore} from "./dashboardStore.js";
import CommitsChart from "./CommitsChart.vue";
import LineChart_DualYAxes from "./LineChart_DualYAxes.vue";
import DataConvertUtils from "../js/dataConvertUtils.js";

let maxYLeft = 0;

export default {
  props:{
    chartState: String,
    commitsChartData : Object,
    issuesChartData : Object,
    // chartData: {
    //   commits : Object,
    //   issues : Object
    // },
    //UNFINISHED
    change_chart_state : {
      type : Function
    },
    is_loading : [Boolean, String],
  },
  components:{
    LineChart_DualYAxes,
    CommitsChart
  },
  methods: {
    setMaxY(newVal=100){
      maxYLeft = newVal
    },
    changeChartState(newState){
      //Emit an event to notify parent
      this.$emit('change-activity-chart-state', newState);
    },
    refreshCommits(){
      this.$emit('refresh-commits');
    },
    combineChartData(commitsData, issuesData){
      // if(!commitsData.labels) return null;
      // if(!issuesData.labels) return null;
      //
      // if(commitsData.labels !== issuesData.labels){
      //   console.log("Labels do not match", commitsData.labels, issuesData.labels)
      // }
      
      try{
        return {
          labels : commitsData.labels,
          datasets: [
            commitsData.datasets[0], issuesData.datasets[0]
          ]
        }
      } catch(e){
        
        try{
          return commitsData;
        } catch(e){
          return {
            labels: [],
            datasets: []
          };
        }
        
      }
    },

    getSuggestedMaxY(chartData) {
      try{
        const datasets = chartData.datasets;

        if (datasets.length === 0) {
          return 0; // No datasets available
        }

        // Find the maximum value among all datasets
        const maxValues = datasets.map(dataset => Math.max(...dataset.data));
        const absoluteMax = Math.max(...maxValues);

        // Provide a buffer (e.g., 10%) to ensure better visual representation
        const bufferPercentage = 0;
        const buffer = absoluteMax * bufferPercentage;

        return absoluteMax + buffer;
      } catch(e){
        console.error("Broken chart data", chartData);
        console.error(e.stack);
        return 100;
      }
      
    },
    sumArray(numberArray){
      return DataConvertUtils.sumArray(numberArray);
    }
    
  }
}
</script>

<style scoped>

</style>
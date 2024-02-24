<template>
  <div v-if="storeMain.state === 'search'">
    <SearchView/>
  </div>
  <div v-else-if="storeMain.state === 'dashboard'">
    <DashboardView/>
  </div>
  
  
  
<!--  <StoreTest />-->
  
  
  <p>LINE CHART</p>
  <div class="container py-4 px-3 mx-auto">
    <LineChart id="lineTest" :data="data" :options="options"/>
  </div>
  <p>LINE CHART</p>
  
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'

import {ChartData} from 'chart.js'
import * as chartConfig from './chartConfig.js'
import LineChart from './components/LineChart.vue'
import SearchView from "./search/SearchView.vue";

import {storeMain} from "./js/storeMain";
import DashboardView from "./dashboard/DashboardView.vue";


const options = chartConfig.options
const data = ref<ChartData<'bar'>>({
  datasets: []
})


onMounted(() => {
  setInterval(() => {
    data.value = chartConfig.randomData()
  }, 3000)
})
</script>

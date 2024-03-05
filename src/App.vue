<template>
  <SearchViewSFC/>
<!--  <button @click="storeMain.openDashboard('openai', 'openai-cookbook')">QUICK DB</button>-->
  
  
  
  <!--  <div v-else-if="storeMain.state === 'dashboard'">-->
<!--&lt;!&ndash;    <p>DASHBOARD VIEW</p>&ndash;&gt;-->
<!--    <DashboardView/>-->
<!--  </div>-->
  
</template>

<script lang="ts" setup>
// import {storeMain} from "./js/storeMain";
// import DashboardView from "./dashboard/DashboardView.vue";
// import {dashboardStore} from "./dashboard/dashboardStore";
import SearchViewSFC from "./search/SearchViewSFC.vue";

// const data = ref<ChartData<'bar'>>({
//   datasets: []
// })
//
//
// onMounted(() => {
//   setInterval(() => {
//     data.value = chartConfig.randomData()
//   }, 3000)
// })
</script>

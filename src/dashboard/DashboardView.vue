<template>
  <div v-if="dashboardStore.hasRepoData">
    <h1>{{pageTitle}}</h1>
  </div>
  
  
  <!-- Title -->
  <RepoTitleCard v-bind="dashboardStore.repoData"/>
  
  <br>
  
  <div class="row">
    <!-- OWNER/ORGANISATION -->
    <div class="col-md-6">
      <div v-if="dashboardStore.repoData.owner">
        <UserCard v-bind="dashboardStore.repoData.owner"/>
      </div>
      <div v-if="dashboardStore.repoData.organization && dashboardStore.repoData.organization.name !== dashboardStore.repoData.owner.name">
        <UserCard v-bind="dashboardStore.repoData.organization"/>
      </div>
    </div>

    <!-- LICENSE -->
    <div class="col-md-4">
      <LicenseCard v-bind="dashboardStore.repoData.license"/>
    </div>
  </div>
  
  <br>
  
  <div class="row">
    <!-- Stats card-->
    <div class="col-md-6">
      <BasicMetricsCard v-bind="dashboardStore.repoData"/>
    </div>

    <!-- COMMITS -->
    <div class="col-md-6">
      <CommitsCard
          :commits_count="dashboardStore.commitsCount"
          :authors_count="dashboardStore.uniqueAuthors"
          :last_commit="dashboardStore.mostRecentCommit"
      />
    </div>
  </div>
  
  <br>
  
  <div class="col-md-auto">
    <ChartCard/>
  </div>
  
  
  
</template>

<script setup>
import RepoTitleCard from "./RepoTitleCard.vue";
import {dashboardStore} from "./dashboardStore.js";
import BasicMetricsCard from "./BasicMetricsCard.vue";
import UserCard from "./UserCard.vue";
import LicenseCard from "./LicenseCard.vue";
import CommitsCard from "./CommitsCard.vue";
import CommitsChart from "./CommitsChart.vue";
import ChartCard from "./ChartCard.vue";

const pageTitle = "GitHub Dashboard"


// export default {
//   name: "DashboardView"
//   // components: {TitleCard}
// }
</script>

<style scoped>

</style>
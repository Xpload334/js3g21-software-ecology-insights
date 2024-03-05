<!--<template>-->
<!--  <div v-if="dashboardStore.hasRepoData">-->
<!--    <h1>{{pageTitle}}</h1>-->
<!--  </div>-->
<!--  -->
<!--  -->
<!--  &lt;!&ndash; Title &ndash;&gt;-->
<!--  <RepoTitleCard v-if="dashboardStore.repoData" v-bind="dashboardStore.repoData"/>-->
<!--  -->
<!--  <br>-->
<!--  -->
<!--  &lt;!&ndash; Basic Metrics &ndash;&gt;-->
<!--  <div class="row row-cols-1 row-cols-md-2 g-4">-->
<!--    &lt;!&ndash; OWNER/ORGANISATION &ndash;&gt;-->
<!--    <div class="col">-->
<!--        <div v-if="dashboardStore.repoData.owner">-->
<!--          <UserCard v-bind="dashboardStore.repoData.owner"/>-->
<!--        </div>-->
<!--        <div v-if="dashboardStore.repoData.organization && dashboardStore.repoData.organization.name !== dashboardStore.repoData.owner.name">-->
<!--          <UserCard v-bind="dashboardStore.repoData.organization"/>-->
<!--        </div>-->
<!--    </div>-->

<!--    &lt;!&ndash; LICENSE &ndash;&gt;-->
<!--    <div class="col">-->
<!--      <LicenseCard v-bind="dashboardStore.repoData.license"/>-->
<!--    </div>-->

<!--    &lt;!&ndash; Stats card&ndash;&gt;-->
<!--    <div class="col">-->
<!--      <BasicMetricsCard v-if="dashboardStore.repoData" v-bind="dashboardStore.repoData"/>-->
<!--    </div>-->

<!--    &lt;!&ndash; COMMITS &ndash;&gt;-->
<!--    <div class="col">-->
<!--      <CommitsCard-->
<!--          v-if="dashboardStore.commitsData"-->
<!--          :commits_count="dashboardStore.commitsCount"-->
<!--          :authors_count="dashboardStore.uniqueAuthors"-->
<!--          :last_commit="dashboardStore.mostRecentCommit"-->
<!--      />-->
<!--    </div>-->
<!--  </div>-->
<!--  -->
<!--  <br>-->
<!--  -->
<!--  <div class="col-md-auto">-->
<!--    <ChartCard v-if="dashboardStore.chartData"/>-->
<!--  </div>-->
<!--  -->
<!--  <br>-->
<!--  -->
<!--  <div class="col-md-auto">-->
<!--    <ContributorsCard v-if="dashboardStore.contributorsChartData"/>-->
<!--  </div>-->
<!--  -->
<!--&lt;!&ndash;  <div class="col-md-auto">&ndash;&gt;-->
<!--&lt;!&ndash;    <ReadmeCard :readme-content="dashboardStore.htmlReadme"/>&ndash;&gt;-->
<!--&lt;!&ndash;  </div>&ndash;&gt;-->
<!--  -->
<!--  -->
<!--  -->
<!--</template>-->

<!--<script setup>-->
<!--import RepoTitleCard from "./RepoTitleCard.vue";-->
<!--import {dashboardStore} from "./dashboardStore.js";-->
<!--import BasicMetricsCard from "./BasicMetricsCard.vue";-->
<!--import UserCard from "./UserCard.vue";-->
<!--import LicenseCard from "./LicenseCard.vue";-->
<!--import CommitsCard from "./CommitsCard.vue";-->
<!--import CommitsChart from "./CommitsChart.vue";-->
<!--import ChartCard from "./ChartCard.vue";-->
<!--import ContributorsCard from "./ContributorsCard.vue";-->
<!--import ReadmeCard from "./ReadmeCard.vue";-->

<!--const pageTitle = "GitHub Dashboard"-->


<!--// export default {-->
<!--//   name: "DashboardView"-->
<!--//   // components: {TitleCard}-->
<!--// }-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->
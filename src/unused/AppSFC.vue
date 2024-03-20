<!--<template>-->
<!--  <div>-->
<!--    <p>APP SFC</p>-->
<!--    <div v-if="appState.state === 'search'">-->
<!--      <SearchViewSFC :appState="appState"/>-->
<!--      <button @click="appState.openDashboard('openai', 'openai-cookbook')">QUICK DB</button>-->
<!--    </div>-->
<!--    <div v-else-if="appState.state === 'dashboard'">-->
<!--      &lt;!&ndash; <p>DASHBOARD VIEW</p> &ndash;&gt;-->
<!--      <DashboardViewSFC :appState="appState"/>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script setup>-->
<!--import { ref, provide } from 'vue';-->
<!--import SearchViewSFC from "./search/SearchViewSFC.vue";-->
<!--import DashboardViewSFC from "./dashboard/DashboardViewSFC.vue"-->

<!--// const state = ref("search");-->
<!--// const owner = ref("");-->
<!--// const repoName = ref("");-->
<!--// const isLoading = ref(false);-->
<!--//-->
<!--// const openDashboard = (owner, repo) => {-->
<!--//   console.log("Changing state to dashboard");-->
<!--//   state.value = "dashboard";-->
<!--//   owner.value = owner;-->
<!--//   repoName.value = repo;-->
<!--// };-->


<!--const appState = ref({-->
<!--  connected: false,-->
<!--  state: "search", // Search ||| Stats ||| Commits-->

<!--  owner: "",-->
<!--  repoName: "",-->
<!--  isLoading: false,-->
<!--  errorMessage: "",-->
<!--  successMessage: "",-->

<!--  // openDashboard(owner, repo) {-->
<!--  //   console.log("Changing state to dashboard");-->
<!--  //   this.state = "dashboard";-->
<!--  //   this.owner = owner;-->
<!--  //   this.repoName = repo;-->
<!--  // },-->
<!--  openDashboard(owner, repo) {-->
<!--    console.log("Changing state to dashboard");-->
<!--    this.state = "dashboard";-->
<!--    this.owner = owner;-->
<!--    this.repoName = repo;-->
<!--    -->
<!--    DashboardViewSFC.dashboardStart(owner, repo);-->
<!--  },-->
<!--  openSearch() {-->
<!--    console.log("Changing state to search");-->
<!--    this.state = "search";-->
<!--  },-->
<!--  success(message) {-->
<!--    this.successMessage = message;-->
<!--    setTimeout(() => {-->
<!--      this.successMessage = null;-->
<!--    }, 3000);-->
<!--  },-->
<!--  fail(message) {-->
<!--    this.errorMessage = message;-->
<!--    setTimeout(() => {-->
<!--      this.errorMessage = null;-->
<!--    }, 3000);-->
<!--  },-->
<!--});-->

<!--provide('appState', appState);-->
<!--</script>-->

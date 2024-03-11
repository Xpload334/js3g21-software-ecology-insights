
<template>
  <div>
<!--    <SearchViewSFC v-if="!$route.params.owner" />-->
    <DashboardViewSFC
        :owner="$route.params.owner"
        :repo="$route.params.repo"
    />
    
<!--    <MainFooter/>-->
  </div>
</template>

<script>
// import SearchViewSFC from "./SearchViewSFC.vue";
import DashboardViewSFC from "./DashboardViewSFC.vue";
import MainFooter from "../components/MainFooter.vue";


export default {
  components: {
    MainFooter,
    DashboardViewSFC,
    // SearchViewSFC
    
  },
};
</script>

<style>
/* Your styles here */
</style>

<!-- /src/views/Home.vue -->
<template>
  <div>
    <SearchViewSFC v-if="!$route.params.owner" />
    <DashboardViewSFC
        v-else
        :owner="$route.params.owner"
        :repo="$route.params.repo"
    />
  </div>
</template>

<script>

import SearchViewSFC from "./SearchViewSFC.vue";
import DashboardViewSFC from "./DashboardViewSFC.vue";


export default {
  components: {
    DashboardViewSFC,
    SearchViewSFC
    
  },
};
</script>

<style>
/* Your styles here */
</style>

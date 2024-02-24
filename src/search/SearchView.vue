<template>
  <h3 class="text-center mt-5">Search for Repos</h3>
  
  <div class="container" id="search">
    <!-- Search bar -->
    <form id="gitHubForm" class="form-inline mx-auto" style="width: 300px" @submit.prevent="searchStore.getReposByUsername()">
      <input v-model="searchStore.username" id="usernameInput" class="form-control mb-5" type="text" name="username" placeholder="GitHub Username">
      <input type="submit" class="btn btn-primary ml-2 mb-5" value="Submit">
    </form>

    <!-- Pagination Buttons -->
    <div id="paginationButtons" v-if="searchStore.hasSearchData">
      <button @click="searchStore.previousPage" :disabled="searchStore.currentPage <= 1 || searchStore.isLoading">Previous</button>
      <span>{{ searchStore.currentPage }} / {{ searchStore.totalPages }}</span>
      <button @click="searchStore.nextPage" :disabled="searchStore.currentPage >= searchStore.totalPages || searchStore.isLoading">Next</button>
    </div>
    
    <!-- Reload Button -->
    <button @click="searchStore.displaySearchResults" class="btn btn-primary mt-2" :disabled="searchStore.isLoading">
      Reload
    </button>
    
    <!-- Search Results-->
    <div id="scrollPane" class="scroll-pane overflow-auto">
      <div v-if="searchStore.currentResults">
        <SearchEntry v-for="item in searchStore.currentResults" :key="item.name"
                     :name="item.name"
                     :description="item.description"
                     :url="item.html_url"
        />
      </div>
        
      
      
      
<!--      <ul id="resultList" class="repo-list">-->
<!--        &lt;!&ndash; Result list items will be dynamically added here &ndash;&gt;-->
<!--        <li v-for="item in searchStore.currentResults" :key="item.name">-->
<!--          <p>TEST</p>-->
<!--&lt;!&ndash;          <SearchEntry :repo=item>&ndash;&gt;-->
<!--&lt;!&ndash;            &lt;!&ndash; New button for opening the dashboard &ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;            <button @click="openDashboard(item.owner, item.name)">Open Dashboard</button>&ndash;&gt;-->
<!--&lt;!&ndash;          </SearchEntry>&ndash;&gt;-->
<!--        </li>-->
<!--      </ul>-->
    </div>
    
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import {searchStore} from "./repoSearchStore.js";
import SearchEntry from './SearchEntry.vue';

const openDashboard = (owner, repo) => {
  // const dashboardUrl = `/dashboard?user=${owner}&repo=${repo}`;
  // window.open(dashboardUrl, '_blank');
  
  //Open dashboard view
  console.log(`Opening dashboard for ${owner}/${repo}`)
};

</script>

<style scoped>

</style>
<template>
  <div>
    <MainTitle :state="'search'"/>
  </div>
  
  <div class="container" id="searchView">
    <h2 class="title text-center mt-5">Search for Repos</h2>
    <button @click="openDashboard('openai', 'openai-cookbook')">QUICK DB</button>
    <div class="col-md-6 align-self-center">
      <!-- Search bar -->
      <form @submit.prevent="getReposByUsername">
        <input v-model="currentUsername" class="form-control mb-5" type="text" name="username" placeholder="GitHub Username">
        <input type="submit" class="btn btn-primary ml-2 mb-5" value="Submit">
      </form>
    </div>


    <!-- Pagination Buttons -->
    <div v-if="hasSearchData">
<!--      &lt;!&ndash; BootstrapVue Pagination &ndash;&gt;-->
<!--      <b-pagination-->
<!--          v-model="currentPage"-->
<!--          :total-rows="searchResults.length"-->
<!--          :per-page="itemsPerPage"-->
<!--          class="mt-4"-->
<!--      ></b-pagination>-->
    </div>
    
    <div v-if="hasSearchData">
      <button @click="previousPage" :disabled="currentPage <= 1 || isLoading">Previous</button>
      <span>{{ currentPage }} / {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage >= totalPages || isLoading">Next</button>
    </div>

    <!-- Reload Button -->
    <button @click="displaySearchResults" class="btn btn-primary mt-2" :disabled="isLoading">Reload</button>

    <!-- Search Results-->
    <div id="scrollPane" class="scroll-pane overflow-auto">
      <div v-if="currentResults">
        <SearchEntry
            v-for="item in currentResults"
            :key="item.name"
            :owner="lastUsername"
            :name="item.name"
            :description="item.description"
            :url="item.html_url"
            :openDashboardHandler="openDashboard"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import {searchRepos} from "../js/requests/searchForRepos.js";
import SearchEntry from "../search/SearchEntry.vue";
import MainTitle from "../components/MainTitle.vue";

// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

const isLoading = ref(false);
let currentUsername = ref("");
const lastUsername = ref("");

// Search Results
const hasSearchData = ref(false);
const searchResults = ref([]);
const currentResults = ref([]);

// Page
const currentPage = ref(1);
const itemsPerPage = ref(30);
const totalPages = ref(10);

const getReposByUsername = () => {
  let shouldSearch = lastUsername.value !== currentUsername.value;

  if (shouldSearch) {
    // Search page 1
    searchResults.value = [];
    getRepos(currentUsername.value, 1);
  } else {
    console.log("Searching for the same username, cancelling search");
  }
};

const getRepos = (username, pageNum) => {
  disableButton();
  lastUsername.value = username;

  searchRepos.listReposForUser(username, pageNum).then((r) => {
    console.log("Repos data received", r);
    currentUsername = username
    handleRepos(r);
  });

};

const handleRepos = (data) => {
  searchResults.value[currentPage.value - 1] = data.repos;
  itemsPerPage.value = data.itemsPerPage;
  totalPages.value = data.totalPages;
  hasSearchData.value = true;
  displaySearchResults();
};

const displaySearchResults = () => {
  console.log(`Displaying page ${currentPage.value}`);
  clearDisplayedResults();
  currentResults.value = searchResults.value[currentPage.value - 1];
  console.log('CURRENT Results', currentResults.value);
};

const clearDisplayedResults = () => {
  // Clear previous content
  // currentResults.value = [];
  // const resultList = document.getElementById('resultList');
  // while(resultList.firstChild){
  //     resultList.removeChild(resultList.firstChild);
  // }
};

const disableButton = () => {
  if (isLoading.value) return;

  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
  }, 2000);
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;

    if (currentPage.value > searchResults.value.length) {
      console.log("Retrieving data for next page from server");
      getRepos(lastUsername.value, currentPage.value);
    } else {
      console.log("Already has data for this page");
      displaySearchResults();
    }
  }
};

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    displaySearchResults();
  }
};

const openDashboard = (owner, repo) => {
  const dashboardUrl = `/dashboard/${owner}/${repo}`;
  window.open(dashboardUrl, '_blank');
  
  // appState.value.openDashboard(owner, repo);
};

// Handle pagination change event
function handlePaginationChange(page) {
  // Update the current page and display search results
  currentPage.value = page;
  if (currentPage.value > searchResults.value.length) {
    console.log("Retrieving data for next page from server");
    getRepos(lastUsername.value, currentPage.value);
  } else {
    console.log("Already has data for this page");
    displaySearchResults();
  }
  // displaySearchResults();
}

</script>

<style scoped>
/* Add your styles here */
</style>

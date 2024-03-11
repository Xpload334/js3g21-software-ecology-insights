<template>
  <div>
    <MainTitle :state="'search'"/>
  </div>
  
  <div class="container" id="searchView">
    <h1 class="title text-center mt-5">Search for Repos</h1>
    
    <button @click="openDashboard('openai', 'openai-cookbook')">QUICK DB</button>
    <div>
      
      <!-- Search bar (@submit.prevent="getReposByUsername")-->
      <form class="row justify-content-center">
        <!-- Form Text -->
        <div class="col-md-6">
          <input v-model="currentUsername" class="form-control col" type="text" name="username" placeholder="GitHub Username" :disabled="isLoading">
        </div>


        <div class="col-md-auto">
          <!-- Submit button -->
          <div v-if="isLoading">
            <button class="btn btn-primary" type="button" disabled>
              <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              Submit
            </button>
          </div>
          <div v-else>
            <button @click="getReposByUsername" class="btn btn-primary" :disabled="isLoading">Submit</button>
          </div>
        </div>
        
        <div class="col-md-auto">
          <!-- Reload Button -->
          <div v-if="isLoading">
            <button class="btn btn-primary" type="button" disabled>
              <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              Reload
            </button>
          </div>
          <div v-else>
            <button @click="displaySearchResults" class="btn btn-primary" :disabled="isLoading">Reload</button>
          </div>
          
        </div>
      </form>
      
      
      
<!--      <form @submit.prevent="getReposByUsername">-->
<!--        <input v-model="currentUsername" class="form-control" type="text" name="username" placeholder="GitHub Username">-->
<!--        <div v-if="isLoading" class="col">-->
<!--          <div class="spinner-grow" role="status">-->
<!--            <span class="visually-hidden">Loading...</span>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div v-else>-->
<!--          <input type="submit" class="btn btn-primary ml-2 mb-5" value="Submit">-->
<!--        </div>-->
<!--      </form>-->
    </div>
    
    <br>


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
    
    <!-- PAGINATION -->
    <ul v-if="hasSearchData" class="pagination justify-content-center">
      <li class="page-item">
        <button @click="previousPage" :disabled="currentPage <= 1 || isLoading" 
                class="btn btn-outline-primary">&laquo;</button>
      </li>
      <li class="page-item disabled">
        <a class="page-link">{{ currentPage }} / {{ totalPages }}</a>
      </li>
      <li class="page-item">
        <button @click="nextPage" :disabled="currentPage >= totalPages || isLoading" 
                class="btn btn-outline-primary">&raquo;</button>
      </li>
    </ul>
    

    <!-- Search Results-->
    <div id="scrollPane" class="scroll-pane overflow-auto">
      <div v-if="isLoading && !currentResults">
        <div class="d-flex justify-content-center">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
      <div v-if="currentResults">
        <div v-for="item in currentResults">
          <SearchEntry
              v-bind="item"
              :openDashboardHandler="openDashboard"/>
          <br>
        </div>
        
      </div>
    </div>
    
    <!-- PAGINATION -->
    <ul v-if="hasSearchData" class="pagination justify-content-center">
      <li class="page-item">
        <button @click="previousPage" :disabled="currentPage <= 1 || isLoading"
                class="btn btn-outline-primary">&laquo;</button>
      </li>
      <li class="page-item disabled">
        <a class="page-link">{{ currentPage }} / {{ totalPages }}</a>
      </li>
      <li class="page-item">
        <button @click="nextPage" :disabled="currentPage >= totalPages || isLoading"
                class="btn btn-outline-primary">&raquo;</button>
      </li>
    </ul>
    
<!--    <MainFooter/>-->
  </div>
</template>

<script setup>
import {ref} from 'vue'
import {searchRepos} from "../js/requests/searchForRepos.js";
import SearchEntry from "../search/SearchEntry.vue";
import MainTitle from "../components/MainTitle.vue";
import MainFooter from "../components/MainFooter.vue";

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
  if(currentUsername.value === ""){
    return;
  }
  
  
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
  if(lastUsername.value === ""){
    return;
  }
  
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

<template>
  <div>
    <MainTitle :state="'search'"/>
  </div>
  
  <div class="container" id="searchView">
    
    <div class="card">
      <div class="card-header">
        <h1 class="title text-center mt-3">Search for Repos</h1>
        
        <button @click="openDashboard('openai', 'openai-cookbook')" style="opacity: 0">QUICK DB</button>
      </div>
      
      
      <div class="card-body">
        <!-- Intro Text -->
        <div class="card-group">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Find a Creator</h5>
              <p class="card-text">Search for a user or organisation on GitHub!</p>
<!--              <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>-->
            </div>
          </div>
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Launch the Dashboard</h5>
              <p class="card-text">Dashboards display quick stats about a project! Who were the most influential users? </p>
<!--              <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>-->
            </div>
          </div>
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Easily Find Trends</h5>
              <p class="card-text">What went well and what didn't? What sources were used in the project? How can we use this information to make our projects even better?</p>
<!--              <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>-->
            </div>
          </div>
        </div>
        
        <br>

        <!-- SEARCH BAR -->
        <div class="input-group col-md-6">
          <!-- Dropdown -->
          <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" :disabled="isLoading">
            {{searchTypeDisplayName[searchTypeIndex]}}
          </button>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" @click="setSearchType(0)">{{searchTypeDisplayName[0]}}</a></li>
            <li><a class="dropdown-item" @click="setSearchType(1)">{{searchTypeDisplayName[1]}}</a></li>
          </ul>
          
          <input v-model="currentUsername" 
                 type="text" class="form-control" :placeholder="searchBoxDisplayName[searchTypeIndex]" :disabled="isLoading">
          
          <!-- Submit button -->
          <div>
            <div v-if="isLoading">
              <button class="btn btn-primary" type="button" :disabled="isLoading">
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Search
              </button>
            </div>
            <div v-else>
              <button type="submit" @click="getReposByUsername" class="btn btn-primary" :disabled="isLoading">Search</button>
            </div>
          </div>

          <div v-if="hasSearchData">
            <!-- Reload Button -->
            <div v-if="isLoading">
              <button class="btn btn-primary" type="button" disabled>
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Reload
              </button>
            </div>
            <div v-else>
              <button type="button" @click="displaySearchResultsPaged" class="btn btn-primary" :disabled="isLoading">Reload</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- PAGINATION -->
    <div v-if="hasSearchData">
      <br>
      
      <SearchPagination
          :is-loading="isLoading"
          :current-page="currentPage"
          :previous-page="previousPage"
          :next-page="nextPage"
          :total-pages="totalPages"
      />
    </div>
    
    <div v-if="errorMessage !== ''">
      <p class="text-bg-danger">{{errorMessage}}</p>
    </div>
    
    
    <!-- Search Results-->
    <div id="scrollPane">
<!--    <div id="scrollPane" class="scroll-pane overflow-auto h-50">-->
      <div v-if="isLoading && !currentResults">
        <div class="d-flex justify-content-center">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
      
      <div v-if="currentResults !== undefined" class="row row-cols-1 row-cols-md-2 g-4">
        <div v-for="item in currentResults">
          <SearchEntry
              v-bind="item"
              :openDashboardHandler="openDashboard"/>
          <br>
        </div>
      </div>
      <div v-else>
        <p class="text-danger text-md-center">No results found.</p>
      </div>
    </div>
    
    
    <!-- PAGINATION -->
    <div v-if="hasSearchData">
      <br>
      
      <SearchPagination
          :is-loading="isLoading"
          :current-page="currentPage"
          :previous-page="previousPage"
          :next-page="nextPage"
          :total-pages="totalPages"
      />
    </div>
    
<!--    <MainFooter/>-->
  </div>
</template>

<script setup>
import {ref} from 'vue'
import SearchForRepos from "../js/requests/searchForRepos.js";
import SearchEntry from "../search/SearchEntry.vue";
import MainTitle from "../components/MainTitle.vue";
import MainFooter from "../components/MainFooter.vue";
import SearchPagination from "../search/SearchPagination.vue";

// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

const isLoading = ref(false);
let currentUsername = ref("");
const lastUsername = ref("");

// Search Results
const hasSearchData = ref(false);
// const searchResults = ref([]);
const currentResults = ref([]);
const searchResultsPaged = ref([]);

const searchTypeIndex = ref(0); //"user" || "orgs"
const lastSearchTypeIndex = ref(0);
const searchTypeDisplayName = ref([
    "Users",
    "Organisation"
]);
const searchBoxDisplayName = ref([
   "Search Users...",
   "Search Organisations..." 
]);

// Page
const currentPage = ref(1);
const itemsPerPage = ref(30);
const totalPages = ref(10);

//Errors
const errorMessage = ref("");

const getReposByUsername = () => {
  resetError();
  
  if(currentUsername.value === ""){
    return;
  }
  
  lastUsername.value = currentUsername.value;
  lastSearchTypeIndex.value = searchTypeIndex.value;
  getRepos(lastUsername.value, lastSearchTypeIndex.value);
  
  
  // let shouldSearch = lastUsername.value !== currentUsername.value;
  //
  // if (shouldSearch) {
  //   // Search page 1
  //   // searchResults.value = [];
  //   getRepos(currentUsername.value);
  // } else {
  //   console.log("Searching for the same username, cancelling search");
  // }
};

function getRepos(username, searchIndex=0){
  resetError();
  // disableButton();
  // lastUsername.value = username;

  // searchRepos.listReposForUser(username, pageNum).then((r) => {
  //   console.log("Repos data received", r);
  //   currentUsername = username
  //   handleRepos(r);
  // });
  loading(true)

  SearchForRepos.getReposPages(username, searchIndex).then((r) => {
    console.log("Repos data received", r);
    currentUsername = username
    handleReposPaged(r);
    loading(false)
  }).catch((error) => {
    console.warn(error);
    errorMessage.value = "User or organisation not found, try again!";
    loading(false)
  })

}

function handleReposPaged(data){
  searchResultsPaged.value = data;
  totalPages.value = data.length;
  hasSearchData.value = true;
  
  displaySearchResultsPaged();
}

function displaySearchResultsPaged() {
  resetError();
  if(lastUsername.value === ""){
    return;
  }

  console.log(`Displaying page ${currentPage.value}`);
  clearDisplayedResults();
  currentResults.value = searchResultsPaged.value[currentPage.value - 1];
  console.log('CURRENT Results', currentResults.value);
}

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

function nextPage(){
  if(currentPage.value < totalPages.value){
    currentPage.value++;
    displaySearchResultsPaged()
  }
}

function previousPage(){
  if (currentPage.value > 1) {
    currentPage.value--;
    // displaySearchResults();
    displaySearchResultsPaged();
  }
}

const openDashboard = (owner, repo) => {
  const dashboardUrl = `/dashboard/${owner}/${repo}`;
  window.open(dashboardUrl, '_blank');
  
  // appState.value.openDashboard(owner, repo);
};

function setSearchType(newType){
  searchTypeIndex.value = newType;
}

function loading(state=true){
  isLoading.value = state;
}

function resetError(){
  errorMessage.value = "";
}

</script>

<style scoped>
/* Add your styles here */
</style>

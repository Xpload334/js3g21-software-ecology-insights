﻿<template>
  <div>
    <MainTitle :state="'search'"/>
  </div>
  
  <div class="bg-image">
    <div class="container search-container" id="searchView" style="height: calc(100vh - 120px); overflow-y: auto;">
      <!-- Title Card -->
      <div class="card anim-slidein-down-1">
        <div class="card-header azur-gradient">
          <h1 class="title text-center mt-3">Search for Repositories</h1>

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
                <button class="btn btn-outline-primary" type="button" :disabled="isLoading">
                  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  Search
                </button>
              </div>
              <div v-else>
                <button type="submit" @click="getReposByUsername" class="btn btn-outline-primary" :disabled="isLoading">Search</button>
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
      
      <br>
      
      <!-- Search Results-->
      <div class="card" v-if="hasSearchData">
        <div class="card-header">
          <!-- PAGINATION -->
          <div v-if="hasSearchData">
<!--            <br>-->

            <SearchPagination
                :is-loading="isLoading"
                :current-page="currentPage"
                :previous-page="previousPage"
                :next-page="nextPage"
                :total-pages="totalPages"
            />
          </div>
        </div>
        <div class="card-body">
          <div v-if="isLoading && !currentResults">
            <div class="d-flex justify-content-center">
              <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
          
          <div v-if="currentResults !== undefined"
               class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-3"
          >
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
        <div class="card-footer">
          <!-- PAGINATION -->
          <div v-if="hasSearchData">
<!--            <br>-->

            <SearchPagination
                :is-loading="isLoading"
                :current-page="currentPage"
                :previous-page="previousPage"
                :next-page="nextPage"
                :total-pages="totalPages"
            />
          </div>
        </div>
      </div>
    </div>
    
    
  </div>
  <div class="container" style="height: 50px;">
    <div class="row">
      <div class="col-6">
        <p class="text-muted">
          Photo by <a href="https://unsplash.com/@towfiqu999999?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Towfiqu barbhuiya</a> on <a href="https://unsplash.com/photos/person-in-black-suit-jacket-holding-white-tablet-computer-nApaSgkzaxg?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
        </p>
      </div>
      <div class="col">
        <div v-if="toastMessages.length > 0">
          <div class="card overflow-auto" style="height: 50px">
            <div v-for="item in toastMessages">
              <p class="text-bg-danger text-end">{{item}}</p>
            </div>
          </div>
          
        </div>
        
      </div>
    </div>
    
  </div>
  
  
</template>

<script setup>
import {ref} from 'vue'
import SearchForRepos from "../js/requests/searchForRepos.js";
import SearchEntry from "../search/SearchEntry.vue";
import MainTitle from "../components/MainTitle.vue";
import MainFooter from "../components/MainFooter.vue";
import SearchPagination from "../search/SearchPagination.vue";
// import Toast_BottomRight from "../components/toasts/Toast_BottomRight.vue";

// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

const isLoading = ref(false);
let currentUsername = ref("");
let lastUsername = ref("");

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
const toastMessages = ref([]);
const errorMessage = ref("");

function getReposByUsername(){
  console.log("Usernames", `${currentUsername.value} (+ ${lastUsername.value})`);
  resetError();
  
  if(currentUsername.value === ""){
    return;
  }
  
  lastUsername.value = currentUsername.value;
  lastSearchTypeIndex.value = searchTypeIndex.value;
  getRepos(lastUsername.value, lastSearchTypeIndex.value);
  // console.log("Usernames", `${currentUsername.value} (+ ${lastUsername.value})`);
}

function getRepos(username, searchIndex=0){
  resetError();
  
  loading(true)

  SearchForRepos.getReposPages(username, searchIndex).then((r) => {
    console.log("Repos data received", r);
    // currentUsername = username
    handleReposPaged(r);
    loading(false)
  }).catch((error) => {
    console.error(error);
    errorMessage.value = "User or organisation not found, check your internet connection. " +
        "If there have been a lot of requests made, the rate limit may have been exceeded, please try again later.";
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
  // clearDisplayedResults();
  currentResults.value = searchResultsPaged.value[currentPage.value - 1];
  console.log('CURRENT Results', currentResults.value);
}

const clearDisplayedResults = () => {
  // Clear previous content
  currentResults.value = [];
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

console.log(toastMessages.value)

</script>

<style scoped>
/* Add your styles here */
</style>

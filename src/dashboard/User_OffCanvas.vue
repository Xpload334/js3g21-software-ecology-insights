<template>
<!--  <button class="btn btn-primary" type="button" @click="openOffcanvas(username)">-->
<!--    View User [{{username}}]-->
<!--  </button>-->

<!--  <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" -->
<!--          data-bs-target="#offcanvasScrolling" -->
<!--          aria-controls="offcanvasScrolling">-->
<!--    Enable body scrolling-->
<!--  </button>-->
  
<!--  <a class="btn btn-primary" data-bs-toggle="offcanvas" href="#offcanvasScrolling" -->
<!--     role="button" aria-controls="offcanvasScrolling" @click="getUserData(username)">-->
<!--    View User [{{username}}]-->
<!--  </a>-->

  <!-- User card -->
  <div class="offcanvas offcanvas-start w-50" data-bs-scroll="true" data-bs-backdrop="true" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasScrollingLabel">User Details</h5>
      <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <!-- User details here -->
      <div class="card">
        <div class="card-header">
          <div class="row">
            <div class="col-md-3">
              <!-- Check if avatar_url is available -->
              <div v-if="userData.data">
                <!-- Display user's avatar with a link to their GitHub profile -->
                <a :href="userData.data.html_url" target="_blank">
                  <img :src="userData.data.avatar_url" class="img-fluid rounded-start" :alt="userData.data.login">
                </a>
              </div>
              <!-- If avatar_url is not available, display a placeholder image -->
              <div v-else>
                <img src="https://placehold.co/400" class="img-fluid rounded-start" alt="placeholder">
              </div>
            </div>
            
            <div class="col-md">
              <!-- Name -->
<!--              <h2 class="card-title">{{userData.data.name}}</h2>-->
              <h2 class="card-title placeholder-wave">
                <span v-if="userData.data">{{ userData.data.name }}</span>
                <span v-else class="placeholder col-6"></span>
              </h2>
              
              
              <!-- Login placeholder -->
              <p class="card-text text-muted placeholder-wave">
                <span v-if="userData.data">{{ userData.data.login }}</span>
                <span v-else class="placeholder col-8"></span>

              </p>
              <!-- type placeholder-->
              <p class="card-text text-muted placeholder-wave">
                <span v-if="userData.data">{{ userData.data.type }}</span>
                <span v-else class="placeholder col-6"></span>
              </p>

              <!-- DATES -->
              <p class="card-text text-muted text-end placeholder-wave">
                <span v-if="userData.data" class="badge bg-light text-dark text-muted fs-6">
                  Created {{ formatDate(userData.data.created_at) }}</span>
                <span v-else class="placeholder col-6"></span>
                
                <span v-if="userData.data" class="badge bg-light text-dark text-muted fs-6">
                  Last updated {{ formatDate(userData.data.updated_at) }}</span>
                <span v-else class="placeholder col-6"></span>
                
              </p>
            </div>
          </div>
        </div>
        
        <!-- Body -->
        <div class="card-body">
          <!-- Metrics -->
          <div class="d-flex flex-wrap">
            <!-- Public Repos -->
            <div class="col-md placeholder-wave">
            <span v-if="userData.data" class="badge bg-light text-dark fs-5">
              <span>{{ userData.data.public_repos }}</span>
            </span>
              <span v-else class="placeholder col-12"></span>
              <p>Public Repos</p>
            </div>

            <!-- Followers -->
            <div class="col-md placeholder-wave">
            <span v-if="userData.data" class="badge bg-light text-dark fs-5">
              <span>{{ userData.data.followers }}</span>
            </span>
              <span v-else class="placeholder col-12"></span>
              <p>Followers</p>
            </div>

            <!-- Following -->
            <div class="col-md placeholder-wave">
            <span v-if="userData.data" class="badge bg-light text-dark fs-5">
              <span>{{ userData.data.following }}</span>
            </span>
              <span v-else class="placeholder col-12"></span>
              <p>Following</p>
            </div>
          </div>
          
          <br>
          
          <!-- Below Text -->
          <!-- BIO -->
          <p class="card-text placeholder-wave">
            <span v-if="userData.data">
              <span v-if="userData.data.bio">
                {{userData.data.bio}}
                
                <br>
              </span>
            </span>
            <span v-else>
              <span class="placeholder col-12"></span>
              <span class="placeholder col-12"></span>
              <span class="placeholder col-12"></span>
            </span>
          </p>
          
          
          <!-- EMAIL -->
          <p class="card-text placeholder-wave">
            <span v-if="userData.data">
              <span v-if="userData.data.email">
                Email: <a :href="'mailto:' + userData.data.email" target="_blank">{{userData.data.email}}</a>
              </span>
            </span>
            <span v-else class="placeholder col-12"></span>
          </p>
          
          <!-- Blog -->
          <p class="card-text placeholder-wave">
            <span v-if="userData.data">
              <span v-if="userData.data.blog">
                Blog: <a :href=userData.data.blog target="_blank">{{userData.data.blog}}</a>
              </span>
            </span>
            <span v-else class="placeholder col-12"></span>
          </p>

          <!-- Location -->
          <p class="card-text placeholder-wave">
            <span v-if="userData.data">
              <span v-if="userData.data.location">
                Location: {{userData.data.location}}
              </span>
            </span>
            <span v-else class="placeholder col-12"></span>
          </p>


          <br>
          <h5 class="card-title text-center">Similar Projects By This User</h5>
          
          <!-- Search Results-->
          <div id="scrollPane">
            <!--    <div id="scrollPane" class="scroll-pane overflow-auto h-50">-->
<!--            <div v-if="loadingRepos && !userData.repos">-->
<!--              <div class="d-flex justify-content-center">-->
<!--                <div class="spinner-border" role="status">-->
<!--                  <span class="visually-hidden">Loading...</span>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
            <div v-if="userData.repos" class="row row-cols-1 row-cols-md-1 g-4">
              <div v-if="userData.repos.length <= 0">
                <p class="text-danger text-md-center">No results found.</p>
              </div>
              <div v-else v-for="item in userData.repos">
                <SearchEntry
                    v-bind="item"
                    :openDashboardHandler="openDashboard"/>
                <br>
              </div>
            </div>
            <div v-else>
<!--              <p class="text-danger text-md-center">No results found.</p>-->
              <div class="d-flex justify-content-center">
                <div class="spinner-border" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
            </div>
          </div>
<!--          <div v-for="item in userData.repos">-->
<!--            <SearchEntry-->
<!--                v-bind="item"-->
<!--                :openDashboardHandler="openDashboard"/>-->
<!--            <br>-->
<!--          </div>-->
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import GetUser from "../js/requests/getUser.js";
import "bootstrap"
import DataConvertUtils from "../js/dataConvertUtils.js";
import SearchEntry from "../search/SearchEntry.vue";

export default {
  components: {SearchEntry},
  props:{
    username: {
      type: String,
      required: true
    },
    
    userData : Object,
    loadingRepos : Boolean,
    
    getUserData : {
      type: Function,
      required: true,
    },
    
    openDashboard : {
      type: Function,
      required : true,
    },

    dataBsToggle : {
      type : String,
      default : "offcanvas"
    },

    offCanvasHref : {
      type : String,
      default : "#offcanvasScrolling"
    },
  },
  methods: {
    formatDate(inputDate){
      return DataConvertUtils.formatDate(inputDate);
    },
    relativeDate(inputDate){
      return DataConvertUtils.timeAgo(inputDate);
    }
  }
}
</script>

<style scoped>

</style>

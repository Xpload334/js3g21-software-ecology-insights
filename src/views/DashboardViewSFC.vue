<template>
  <div>
    <MainTitle :state="'dashboard'"/>
  </div>
  
  <div class="container" id="dashboard">
    <!-- Title -->
    <RepoTitleCard v-bind="repoData" />

    <br>
    
    <User_OffCanvas_Button
        :username="owner"
        :get-user-data="getUserData"
    />

    <User_OffCanvas_Button
        username="github"
        :get-user-data="getUserData"
    />
    
    <br>

    <!-- Basic Metrics -->
    <div class="row row-cols-1 row-cols-md-3 g-4">
      
      <!-- OWNER/ORGANISATION -->
      <div class="col">
        
        <!-- Owner -->
<!--        <div class="card" v-if="Object.keys(repoData).length > 0">-->
<!--          <div class="card-header">-->
<!--            <h5 class="card-title">Owner</h5>-->
<!--          </div>-->
<!--          <div class="card-body">-->
<!--            <UserCard v-if="repoData.owner" v-bind="repoData.owner" />-->
<!--          </div>-->
<!--        </div>-->
        <!-- Owner -->
        <div class="card">
          <div class="card-header">
            <h5 class="card-title">Owner</h5>
          </div>
          <div class="card-body">
            <UserCard :user="repoData.owner" :get-user-data="getUserData"/>
          </div>
        </div>
        
        <br>
        
        <!-- Organisation -->
        <div class="card" v-if="hasRepoData">
          <div v-if="repoData.organization && repoData.organization.name !== repoData.owner.name">
            <div class="card-header">
              <h5 class="card-title">Organisation</h5>
            </div>
            <div class="card-body">
              <UserCard :user="repoData.organization" :get-user-data="getUserData"/>
            </div>
          </div>
          
        </div>
      </div>
      
      <!-- Stats card-->
      <div class="col">
        <BasicMetricsCard v-bind="repoData" />
      </div>
      
      <!-- LICENSE -->
      <div class="col">
        <LicenseCard v-bind="licenseData" />
      </div>

      <!-- COMMITS -->
      <div class="col">
        <CommitsOverviewCard
            :commits_count="commitsCount"
            :authors_count="uniqueAuthors"
        />
      </div>
      
      <!-- Most Recent Commit -->
      <div class="col">
        <MostRecentCommitCard v-bind="mostRecentCommit"/>
      </div>
      
      <!-- TOPICS -->
      <div class="col">
        <TopicsCard
            :topics="repoData.topics"
        />
      </div>
    </div>

    <br>

    <!-- ACTIVITY CHART -->
    <div class="col-md-auto">
      <ActivityChartCard
          :chart-state="commitsChartState"
          :commits-chart-data="commitsChartData"
          :issues-chart-data="issuesChartData"
          :is-loading="isLoadingCommits"
          @change-activity-chart-state="setActivityChartState"
          @refresh-commits="refreshCommits"
      />
    </div>

    <br>
    
    <!-- CONTRIBUTORS CARD -->
    <div class="col-md-auto">
      <ContributorsCard
          :chart-state="contributorChartState"
          :contributors-top="contributorsChartData"
          :suggested-max="ChartDataContributors.getSuggestedMaxY(contributorsTop)"
          :suggested-max-y1="ChartDataContributors.getSuggestedMaxYCommits(contributorsTop)"
          
          :contributors-chart-data-stacked="contributorsChartDataStacked"
          :suggested-max-stacked="ChartDataContributors.getSuggestedMaxYCommits(contributorsTop)"
          :change-chart-state="changeContributorChartState"
          
          :get-user-data="getUserData"
      />
    </div>
    
    
  </div>

  <!-- Offcanvas -->
  <User_OffCanvas
      :username="owner"
      :user-data="currentUserData"
      :get-user-data="getUserData"
      :open-dashboard="openDashboard"
      :loading-repos="isLoadingUserData"
  />
  
  <!-- Toasts -->
<!--  <Toast_BottomRight -->
<!--      v-if="showToast"-->
<!--      :message="toastMessage"-->
<!--      :lifetime="toastLifetime"-->
<!--      @close="showToast = false"-->
<!--  />-->
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

//Components
import RepoTitleCard from "../dashboard/RepoTitleCard.vue";
import BasicMetricsCard from "../dashboard/BasicMetricsCard.vue";
import UserCard from "../components/cards/UserCard.vue";
import LicenseCard from "../dashboard/LicenseCard.vue";
import CommitsOverviewCard from "../dashboard/CommitsOverviewCard.vue";
import ContributorsCard from "../dashboard/ContributorsCard.vue";
import TopicsCard from "../dashboard/TopicsCard.vue";
import MostRecentCommitCard from "../dashboard/MostRecentCommitCard.vue";
import MainTitle from "../components/MainTitle.vue";
import Toast_BottomRight from "../components/toasts/Toast_BottomRight.vue";
import ActivityChartCard from "../dashboard/ActivityChartCard.vue";

//Requests modules
import GetRepoStats from "../js/requests/getRepoStats.js"
import GetRepoCommits from "../js/requests/getRepoCommits.js";
import GetRepoContributors from "../js/requests/getRepoContributors.js";
import {getReadmeReactive} from "../js/requests/getRepoReadme.js";
import GetRepoIssues from "../js/requests/getRepoIssues.js";


//Chart modules
import ChartDataUtils from "../js/chart/chartDataUtils.js";
import ChartDataContributors from "../js/chart/chartDataContributors.js";
import ChartDataIssues from "../js/chart/chartDataIssues.js";
import GetRepoLicense from "../js/requests/getRepoLicense.js";
import User_OffCanvas from "../dashboard/User_OffCanvas.vue";
import GetUser from "../js/requests/getUser.js";
import SearchForRepos from "../js/requests/searchForRepos.js";
import SortReposUtils from "../js/sortReposUtils.js";
import User_OffCanvas_Button from "../dashboard/User_OffCanvas_Button.vue";

const USING_TEST_DATA = true;

const route = useRoute();
//Base
const owner = ref("");
const repoName = ref("");

//Repo Data
const repoData = ref({});
const hasRepoData = ref(false);
const isLoadingRepo = ref(false);

//Commits data
const commitsData = ref({});
const hasCommitsData = ref(false);
const commitsCount = ref(0);
const uniqueAuthors = ref(0);
// const mostRecentCommit = ref({
//   author:{
//     name : null,
//     date : null
//   },
//   message : null
// });
const mostRecentCommit = ref({});
const hasMostRecentCommit = ref(false);
const isLoadingCommits = ref(false);

//Commits chart data
const commitsChartState = ref('year');
// const commitsChartData = ref({
//   lifetime: [],
//   year: [],
//   threeMonths: [],
//   month: [],
//   week: [],
// });
const commitsChartData = ref({});
const hasCommitsChartData = ref(false);

//Contributors data
const contributorsData = ref({});
const NUM_TOP_CONTRIBUTORS = 5;
const contributorsTop = ref([]);
const contributorsChartData = ref([]);
const contributorsSuggestedMax = ref(0);
const hasContributorsTop = ref(false);
const isLoadingContributors = ref(false);
const contributorsChartDataStacked = ref({});
const contributorChartState = ref("multi");

//Issues
const issuesData = ref({});
const hasIssuesData = ref(false);
const issuesChartData = ref({});
const hasIssuesChartData = ref(false);
const isLoadingIssues = ref(false);

//License data
const licenseData = ref({});
const hasLicenseData = ref(false)
const isLoadingLicenseData = ref(false);

//Users data
const usersData = ref({});
const currentUserData = ref({
  data: null,
  repos: null,
});
const isLoadingUserData = ref(false);


//Toasts
let showToast = ref(false);
const toastMessage = ref("");
const toastLifetime = ref(5000);

/**
 * Function to trigger on component mounted
 */
onMounted(() => {
  //START
  console.log("MOUNTED TRIGGER")
  // setTimeout(function() {
  //   dashboardStart(route.params.owner, route.params.repo);
  // }, 500)
  
  dashboardStart(route.params.owner, route.params.repo);
});

// watch(
//     () => [route.params.owner, route.params.repo],
//     ([newOwner, newRepo]) => {
//       console.log("WATCH TRIGGER")
//       dashboardStart(newOwner, newRepo);
//     }
// );

/**
 * Function to call on dashboard start, gets main repository endpoint, which contains further links.
 * @param newUsername username of repo owner
 * @param newRepoName name of the repo
 */
const dashboardStart = (newUsername, newRepoName) => {
  console.log("DASHBOARD START")
  
  owner.value = newUsername;
  repoName.value = newRepoName;

  displayToast(`Loading dashboard for ${newUsername}/${newRepoName}`)
  getRepoStats(owner.value, repoName.value);
};

/**
 * Retrieve the repo stats, then use the links to retrieve further information.
 * @param username username of repo owner
 * @param repoName name of the repo
 */
const getRepoStats = (username, repoName) => {
  isLoadingRepo.value = true;
  
  fetchStats(username, repoName).then((data) => {
    console.log("Stats Response (Full)", data);
    repoData.value = data;
    
    handleRepoLinks();
  }).catch((error) => {
    console.warn(error);
  }).finally(() => {
    isLoadingRepo.value = false
  });
};

/**
 * Retrieve the commit history of the repo. Get the number of unique authors, the most recent commit, and aggregated chart data for
 * the necessary timeframes.
 * @param username username of repo owner
 * @param repoName name of the repo
 */
function getCommits(username, repoName){
  isLoadingCommits.value = true;
  // commitsChartData.value = null;
  
  // mostRecentCommit.value = null;
  hasMostRecentCommit.value = false;
  
  hasCommitsChartData.value = false;
  hasCommitsData.value = false;
  commitsCount.value = 0;
  uniqueAuthors.value = 0;
  
  fetchCommits(username, repoName).then((data) => {
    // console.log("Commits Response (Full)", data);
    commitsData.value = data;
    hasCommitsData.value = true;

    //Unique authors
    commitsCount.value = commitsData.value.length;
    uniqueAuthors.value = countUniqueAuthors();

    //Most recent commit
    const mostRecentCommitFull = findMostRecentCommit();
    console.log("Most recent commit", mostRecentCommitFull);
    mostRecentCommit.value = {
      author : mostRecentCommitFull.author.name,
      // avatar_url : mostRecentCommitFull.author.avatar_url,
      // html_url : mostRecentCommitFull.author.html_url,
      message : mostRecentCommitFull.message,
      date : mostRecentCommitFull.author.date
    };
    
    hasMostRecentCommit.value = true

    // //Use chart data module to transform into chart data
    commitsChartData.value = {
      lifetime    : ChartDataUtils.chartDataLifetime(commitsData.value),
      year        : ChartDataUtils.chartDataTwelveMonths(commitsData.value),
      threeMonths : ChartDataUtils.chartDataThreeMonths(commitsData.value),
      month       : ChartDataUtils.chartDataMonth(commitsData.value),
      week        : ChartDataUtils.chartDataWeek(commitsData.value)
    };

    // commitsChartData.value = {
    //   lifetime    : chartDataAggregate.chartDataLifetime(commitsData.value),
    //   year        : chartDataAggregate.chartDataTwelveMonths(commitsData.value),
    //   threeMonths : chartDataAggregate.chartDataThreeMonths(commitsData.value),
    //   month       : chartDataAggregate.chartDataMonth(commitsData.value),
    //   week        : chartDataAggregate.chartDataWeek(commitsData.value)
    // };

    hasCommitsChartData.value = true;
  }).catch((error) => {
    console.error(error.stack);
  }).finally(() => {
    isLoadingCommits.value = false
  });
}

/**
 * Retrieve the contributor history for the repo. Get the top N contributors and transform this data into an
 * array of chart data.
 * @param username username of repo owner
 * @param repoName name of the repo
 */
const getContributors = (username, repoName) => {
  isLoadingContributors.value = true;
  
  fetchContributors(username, repoName).then((data) => {
    // console.log("Contributors Response (Full)", data)
    contributorsData.value = data;

    contributorsTop.value = ChartDataContributors.getTopNContributors(contributorsData.value, NUM_TOP_CONTRIBUTORS);
    contributorsChartData.value = ChartDataContributors.convertToChartJSData(contributorsTop.value);
    console.log(`Top ${NUM_TOP_CONTRIBUTORS} Contributors`, contributorsTop.value)

    contributorsSuggestedMax.value = ChartDataContributors.getSuggestedMaxY(contributorsTop.value);
    console.log("Suggested Max Y", contributorsSuggestedMax.value);
    // contributorsSuggestedMaxCommits.value = chartDataContributors.getSuggestedMaxYCommits(contributorsTop.value);
    
    // contributorsChartDataStacked.value = chartDataContributors.chartDataContributorsStacked(contributorsData.value, NUM_TOP_CONTRIBUTORS);
    contributorsChartDataStacked.value = ChartDataContributors.generateStackedLineChartData(contributorsData.value, NUM_TOP_CONTRIBUTORS);
    
    hasContributorsTop.value = true;
  }).catch((error) => {
    console.error(error);
  }).finally(() => {
    isLoadingContributors.value = false
  });
};


function getIssues(username, repoName){
  isLoadingIssues.value = true;
  
  fetchIssues(username, repoName).then((data) => {
    console.log("Received issues data")
    issuesData.value = data;
    hasIssuesData.value = true;
    
    //Get issues chart data
    issuesChartData.value = {
      lifetime    : ChartDataIssues.chartDataLifetime(issuesData.value),
      year        : ChartDataIssues.chartDataTwelveMonths(issuesData.value),
      threeMonths : ChartDataIssues.chartDataThreeMonths(issuesData.value),
      month       : ChartDataIssues.chartDataMonth(issuesData.value),
      week        : ChartDataIssues.chartDataWeek(issuesData.value)
    };
    
    console.log("ISSUES CHART DATA", issuesChartData.value)
    
    hasIssuesChartData.value = true;
  }).catch((error) => {
    console.error(error);
    //
  }).finally(() => {
    isLoadingIssues.value = false
  });
}

function getLicense(repoData){
  if(!repoData.hasOwnProperty("license")){
    console.error("No license found!");
  }
  
  const licenseKey = repoData.license.key;
  
  isLoadingLicenseData.value = true;
  
  fetchLicense(licenseKey).then((data) => {
    console.log("Received license data");
    
    licenseData.value = data;
    hasLicenseData.value = true;
  }).catch((error) => {
    console.error(error);
    //
  }).finally(() => {
    isLoadingLicenseData.value = false;
  });
}

/**
 * Call when getting a user details for the side panel
 * @param username
 */
function getUserData(username){
  if(usersData[username]){
    console.log(`Data for ${username} already exists`)
    // return usersData[username].data;
    currentUserData.value = usersData[username];
    return;
  }
  
  isLoadingUserData.value = true;
  currentUserData.value = {
    data: null,
    repos: null,
  };
  
  //Get user details
  fetchUser(username).then((data) => {
    console.log(`Received user data for ${username}`)
    
    usersData[username] = {
      data : data,
      repos : []
    };
    currentUserData.value.data = data;
    
    //Then, get list of repos for that user
    SearchForRepos.getReposPages(username, 0).then((data) => {
      console.log(`Repo search for user ${username} returned, sorting`, data)
      //On repos, sort by matching topics
      const reposSorted = SortReposUtils.sortByMatchingTopics(data, repoData.value.topics).slice(0, 10);
      console.log("Matching repos", reposSorted);
      
      usersData[username].repos = reposSorted;
      currentUserData.value.repos = reposSorted;
      
    })
    isLoadingUserData.value = false;
    
    //     .catch((error) => {
    //   console.error(error);
    // })
    
  })
    //   .catch((error) => {
    // console.error(error);
  // }).finally(() => {
  //   isLoadingUserData.value = false;
  // });
  
  //Get user repos
  
  //Sort repos by matching tags with this project
  //And by last updated
}

/**
 * Once the repo stats are retrieved, call requests to other endpoints.
 */
const handleRepoLinks = () => {
  //Get commits
  getCommits(owner.value, repoName.value)
  
  //Get contributors
  getContributors(owner.value, repoName.value);
  
  //Get issues
  getIssues(owner.value, repoName.value);
  
  //Get License
  getLicense(repoData.value);
};


async function fetchStats(username, repoName){
  const skipIfDataExists = false;
  
  //Check if data exists
  if(skipIfDataExists && hasRepoData){
    console.log("Commits data exists, skipping return", commitsData)
    return repoData;
  }
  
  const data = await GetRepoStats.getRepoStats(username, repoName, USING_TEST_DATA);
  hasRepoData.value = true;
  return data;
}

async function fetchCommits(username, repoName){
  const skipIfDataExists = false;

  //Check if data exists
  if(skipIfDataExists && hasCommitsData){
    console.log("Commits data exists, skipping return", commitsData)
    return commitsData;
  }

  const data = await GetRepoCommits.getCommits(username, repoName, USING_TEST_DATA);
  console.log("Commits Response (Full)", data);
  
  hasCommitsData.value = true;
  return data;
}

async function fetchContributors(username, repoName){
  const skipIfDataExists = false;

  //Check if data exists
  if(skipIfDataExists && hasContributorsTop){
    console.log("Contributors data exists, skipping return", contributorsData)
    return commitsData;
  }

  const data = await GetRepoContributors.getContributorData(username, repoName, USING_TEST_DATA);
  console.log("Contributors Response (Full)", data);

  // hasCommitsData.value = true;
  return data;
}

async function fetchIssues(username, repoName){
  const skipIfDataExists = false;

  //Check if data exists
  if(skipIfDataExists && hasIssuesData){
    console.log("Issues data exists, skipping return", issuesData)
    return issuesData;
  }

  const data = await GetRepoIssues.getIssues(username, repoName, USING_TEST_DATA);
  console.log("Issues Response (Full)", data);

  hasIssuesData.value = true;
  return data;
}

async function fetchLicense(licenseKey){
  
  const data = await GetRepoLicense.getRepoLicenseFromKey(licenseKey, USING_TEST_DATA);
  console.log("License Response (Full)", data);
  
  // hasLicenseData.value = true;
  return data;
}

async function fetchUser(username){
  const data = await GetUser.getUser(username, USING_TEST_DATA);
  console.log(`${username} Data Response (Full)`, data)
  
  return data;
}

const countUniqueAuthors = () => {
  return GetRepoCommits.countUniqueAuthors(commitsData.value);
};

const findMostRecentCommit = () => {
  return GetRepoCommits.findMostRecentCommit(commitsData.value);
};

const setActivityChartState = (newState) => {
  commitsChartState.value = newState;
};

const refreshCommits = () => {
  if(isLoadingCommits){
    return;
  }
  
  //Get commits
  displayToast("Refreshing commits...")
  getCommits(owner.value, repoName.value);
};

const refreshContributors = () => {
  if(isLoadingContributors){
    return;
  }
  
  displayToast("Refreshing contributors...")
  getContributors(owner.value, repoName.value);
}

function changeContributorChartState(newState="multi"){
  contributorChartState.value = newState
}

const displayToast= (message) => {
  toastMessage.value = message;
  showToast.value = true;
  
  //Start timer for lifetime
  if(toastLifetime.value){
    setTimeout(() => {
      closeToast();
    }
    , toastLifetime.value)
  }
}

const openDashboard = (owner, repo) => {
  const dashboardUrl = `/dashboard/${owner}/${repo}`;
  window.open(dashboardUrl, '_blank');

  // appState.value.openDashboard(owner, repo);
};

const closeToast = () => {
  showToast.value = false
}

</script>

<style scoped>
/* Your styles here */
</style>

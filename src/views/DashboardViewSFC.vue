<template>
  <div>
    <MainTitle :state="'dashboard'"/>
  </div>
  
  <div class="container" id="dashboard">
    <!-- Title -->
    <RepoTitleCard v-if="hasRepoData" v-bind="repoData" />

    <br>

    <!-- Basic Metrics -->
    <div class="row row-cols-1 row-cols-md-2 g-4">
      <!-- OWNER/ORGANISATION -->
      <div class="col">
        <div v-if="Object.keys(repoData).length > 0">
          <UserCard v-bind="repoData.owner" />
        </div>
        <div v-if="Object.keys(repoData).length > 0 && repoData.organization.name !== repoData.owner.name">
          <UserCard v-bind="repoData.organization" />
        </div>
      </div>

      <!-- LICENSE -->
      <div class="col">
        <LicenseCard v-bind="repoData.license" />
      </div>

      <!-- Stats card-->
      <div class="col">
        <BasicMetricsCard v-if="Object.keys(repoData).length > 0" v-bind="repoData" />
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

    <div class="col-md-auto">
      <CommitsChartCard
          :chart-state="commitsChartState" 
          :chart-data="commitsChartData"
          :is-loading="isLoadingCommits"
          @change-activity-chart-state="setChartState"
          @refresh-commits="refreshCommits"
      />
    </div>

    <br>

    <div class="col-md-auto">
      <ContributorsCard
          :contributors-top="contributorsChartData"
          :suggested-max="contributorsSuggestedMax"
      />
    </div>
  </div>
  
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
import CommitsChartCard from "../dashboard/CommitsChartCard.vue";
import ContributorsCard from "../dashboard/ContributorsCard.vue";

//Reactive modules
import {getStatsReactive} from "../js/requests/getRepoStats.js";
import {chartDataUtils} from "../js/chart/chartDataUtils.js";
import {chartDataContributors} from "../js/chart/chartDataContributors.js";
import {getReadmeReactive} from "../js/requests/getRepoReadme.js";
import {getCommitsReactive} from "../js/requests/getRepoCommits.js";
import {getContributorsReactive} from "../js/requests/getRepoContributors.js";
import TopicsCard from "../dashboard/TopicsCard.vue";
import MostRecentCommitCard from "../dashboard/MostRecentCommitCard.vue";
import MainTitle from "../components/MainTitle.vue";
import Toast_BottomRight from "../components/toasts/Toast_BottomRight.vue";
import {getIssuesReactive} from "../js/requests/getRepoIssues.js";
import {chartDataIssues} from "../js/chart/chartDataIssues.js";

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

//Issues
const issuesData = ref({});
const hasIssuesData = ref(false);
const issuesChartData = ref([]);
const hasIssuesChartData = ref(false);
const isLoadingIssues = ref(false);

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
  dashboardStart(route.params.owner, route.params.repo);
});

watch(
    () => [route.params.owner, route.params.repo],
    ([newOwner, newRepo]) => {
      console.log("WATCH TRIGGER")
      dashboardStart(newOwner, newRepo);
    }
);

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
  fetchStats(username, repoName).then((data) => {
    repoData.value = data;
    handleRepoLinks();
  }).catch((error) => {
    console.warn(error);
  });
  
  // getStatsReactive.getRepoStats(username, repoName).then((response) => {
  //   console.log("Stats Response", response.data);
  //   repoData.value = response.data;
  //  
  //   handleRepoLinks();
  // });
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
      message : mostRecentCommitFull.message,
      date : mostRecentCommitFull.author.date
    };
    
    hasMostRecentCommit.value = true

    //Use chart data module to transform into chart data
    commitsChartData.value = {
      lifetime    : chartDataUtils.chartDataLifetime(commitsData.value),
      year        : chartDataUtils.chartDataTwelveMonths(commitsData.value),
      threeMonths : chartDataUtils.chartDataThreeMonths(commitsData.value),
      month       : chartDataUtils.chartDataMonth(commitsData.value),
      week        : chartDataUtils.chartDataWeek(commitsData.value)
    };

    hasCommitsChartData.value = true;
  }).catch((error) => {
    console.error(error);
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
  fetchContributors(username, repoName).then((data) => {
    // console.log("Contributors Response (Full)", data)
    contributorsData.value = data;

    contributorsTop.value = chartDataContributors.getTopNContributors(contributorsData.value, NUM_TOP_CONTRIBUTORS);
    contributorsChartData.value = chartDataContributors.convertToChartJSData(contributorsTop.value);
    console.log(`Top ${NUM_TOP_CONTRIBUTORS} Contributors`, contributorsTop.value)

    contributorsSuggestedMax.value = chartDataContributors.getSuggestedMaxY(contributorsTop.value);
    console.log("Suggested Max Y", contributorsSuggestedMax.value);

    hasContributorsTop.value = true;
  }).catch((error) => {
    console.error(error);
  });
  
  // getContributorsReactive.getContributorData(username, repoName, USING_TEST_DATA).then((data) => {
  //   console.log("Contributors Response (Full)", data)
  //   contributorsData.value = data;
  //  
  //   contributorsTop.value = chartDataContributors.getTopNContributors(contributorsData.value, NUM_TOP_CONTRIBUTORS);
  //   contributorsChartData.value = chartDataContributors.convertToChartJSData(contributorsTop.value);
  //   console.log(`Top ${NUM_TOP_CONTRIBUTORS} Contributors`, contributorsTop.value)
  //  
  //   contributorsSuggestedMax.value = chartDataContributors.getSuggestedMaxY(contributorsTop.value);
  //   console.log("Suggested Max Y", contributorsSuggestedMax.value);
  //  
  //   hasContributorsTop.value = true;
  //  
  //   // contributorsChartData.value = chartDataContributors.convertToChartJSData(contributorsTop.value);
  // }).catch((error) => {
  //   console.error(error);
  // });
};


function getIssues(username, repoName){
  fetchIssues(username, repoName).then((data) => {
    issuesData.value = data;
    hasIssuesData.value = true;
    
    //Get issues chart data
    issuesChartData.value = {
      lifetime    : chartDataIssues.chartDataLifetime(issuesData.value),
      year        : chartDataIssues.chartDataTwelveMonths(issuesData.value),
      threeMonths : chartDataIssues.chartDataThreeMonths(issuesData.value),
      month       : chartDataIssues.chartDataMonth(issuesData.value),
      week        : chartDataIssues.chartDataWeek(issuesData.value)
    };
    
    hasIssuesChartData.value = true;
  }).catch((error) => {
    console.error(error);
  }).finally(() => {
    isLoadingIssues.value = false
  });
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
  // getIssues(owner.value, repoName.value);
};


async function fetchStats(username, repoName){
  const skipIfDataExists = false;
  
  //Check if data exists
  if(skipIfDataExists && hasRepoData){
    console.log("Commits data exists, skipping return", commitsData)
    return repoData;
  }
  
  const data = await getStatsReactive.getRepoStats(username, repoName, USING_TEST_DATA);
  console.log("Stats Response (Full)", data);
  
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

  const data = await getCommitsReactive.getCommits(username, repoName, USING_TEST_DATA);
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

  const data = await getContributorsReactive.getContributorData(username, repoName, USING_TEST_DATA);
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

  const data = await getIssuesReactive.getIssues(username, repoName, USING_TEST_DATA);
  console.log("Issues Response (Full)", data);

  hasIssuesData.value = true;
  return data;
}

const countUniqueAuthors = () => {
  return getCommitsReactive.countUniqueAuthors(commitsData.value);
};

const findMostRecentCommit = () => {
  return getCommitsReactive.findMostRecentCommit(commitsData.value);
};

const setChartState = (newState) => {
  commitsChartState.value = newState;
};

const refreshCommits = () => {
  //Get commits
  displayToast("Refreshing commits...")
  getCommits(owner.value, repoName.value);
};

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

const closeToast = () => {
  showToast.value = false
}
</script>

<style scoped>
/* Your styles here */
</style>

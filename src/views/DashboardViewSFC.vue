<template>
  <div class="container" id="dashboard">
    <!-- Title -->
    <RepoTitleCard v-if="hasRepoData" v-bind="repoData" />

    <br>

    <!-- Basic Metrics -->
    <div class="row row-cols-1 row-cols-md-2 g-4">
      <!-- OWNER/ORGANISATION -->
      <div class="col">
        <div v-if="repoData">
          <UserCard v-bind="repoData.owner" />
        </div>
        <div v-if="repoData && repoData.organization.name !== repoData.owner.name">
          <UserCard v-bind="repoData.organization" />
        </div>
      </div>

      <!-- LICENSE -->
      <div class="col">
        <LicenseCard v-if="repoData" v-bind="repoData.license" />
      </div>

      <!-- Stats card-->
      <div class="col">
        <BasicMetricsCard v-if="repoData" v-bind="repoData" />
      </div>

      <!-- COMMITS -->
      <div class="col">
        <CommitsOverviewCard
            v-if="hasCommitsChartData"
            :commits_count="commitsCount.value"
            :authors_count="uniqueAuthors.value"
            :last_commit_name="mostRecentCommit.author.name"
            :last_commit_date="mostRecentCommit.author.date"
            :last_commit_message="mostRecentCommit.message"
        />
      </div>
    </div>

    <br>

    <div class="col-md-auto">
      <CommitsChartCard 
          v-if="hasCommitsChartData" 
          :chart-state="commitsChartState" 
          :chart-data="commitsChartData" 
          @change-activity-chart-state="setChartState"
      />
    </div>

    <br>

    <div class="col-md-auto">
      <ContributorsCard 
          v-if="hasContributorsTop"
          :contributors-top="contributorsChartData"
          :suggested-max="contributorsSuggestedMax"
      />
    </div>
  </div>
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


const route = useRoute();
//Base
const owner = ref("");
const repoName = ref("");
//Repo Data
const repoData = ref(null);
const hasRepoData = ref(false);

//Commits data
const commitsData = ref({});
const hasCommitsData = ref(false);
const commitsCount = ref(0);
const uniqueAuthors = ref(0);
const mostRecentCommit = ref({});
//Commits chart data
const commitsChartState = ref('year');
const commitsChartData = ref({
  lifetime: [],
  year: [],
  threeMonths: [],
  month: [],
  week: [],
});
const hasCommitsChartData = ref(false);

//Contributors data
const contributorsData = ref({});
const NUM_TOP_CONTRIBUTORS = 5;
const contributorsTop = ref([]);
const contributorsChartData = ref([]);
const contributorsSuggestedMax = ref(0);
const hasContributorsTop = ref(false);

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
  getRepoStats(owner.value, repoName.value);
};

/**
 * Retrieve the repo stats, then use the links to retrieve further information.
 * @param username username of repo owner
 * @param repoName name of the repo
 */
const getRepoStats = (username, repoName) => {
  fetchStats(username, repoName).then((response) => {
    repoData.value = response.data;

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
const getCommits = (username, repoName) => {
  fetchCommits(username, repoName).then((data) => {
    // console.log("Commits Response (Full)", data);
    commitsData.value = data;

    //Unique authors
    commitsCount.value = commitsData.value.length;
    uniqueAuthors.value = countUniqueAuthors();

    //Most recent commit
    mostRecentCommit.value = findMostRecentCommit();
    console.log("Most recent commit", mostRecentCommit.value);

    //Use chart data module to transform into chart data
    commitsChartData.value = {
      lifetime    : chartDataUtils.commitsLifetimeForChart(commitsData.value),
      year        : chartDataUtils.commitsLast12MonthsForChart(commitsData.value),
      threeMonths : chartDataUtils.commitsLastThreeMonthsForChart(commitsData.value),
      month       : chartDataUtils.commitsLastMonthForChart(commitsData.value),
      week        : chartDataUtils.commitsLastWeekForChart(commitsData.value)
    };

    hasCommitsChartData.value = true;
  }).catch((error) => {
    console.error(error);
  });
};

/**
 * Retrieve the contributor history for the repo. Get the top N contributors and transform this data into an
 * array of chart data.
 * @param username username of repo owner
 * @param repoName name of the repo
 */
const getContributors = (username, repoName) => {
  getContributorsReactive.getContributorData(username, repoName).then((data) => {
    console.log("Contributors Response (Full)", data)
    contributorsData.value = data;
    
    contributorsTop.value = chartDataContributors.getTopNContributors(contributorsData.value, NUM_TOP_CONTRIBUTORS);
    contributorsChartData.value = chartDataContributors.convertToChartJSData(contributorsTop.value);
    console.log(`Top ${NUM_TOP_CONTRIBUTORS} Contributors`, contributorsTop.value)
    
    contributorsSuggestedMax.value = chartDataContributors.getSuggestedMaxY(contributorsTop.value);
    console.log("Suggested Max Y", contributorsSuggestedMax.value);
    
    hasContributorsTop.value = true;
    
    // contributorsChartData.value = chartDataContributors.convertToChartJSData(contributorsTop.value);
  }).catch((error) => {
    console.error(error);
  });
};

/**
 * Once the repo stats are retrieved, call requests to other endpoints.
 */
const handleRepoLinks = () => {
  //Get commits
  getCommits(owner.value, repoName.value);
  
  //Get contributors
  getContributors(owner.value, repoName.value);
};


async function fetchStats(username, repoName){
  const skipIfDataExists = false;
  
  //Check if data exists
  if(skipIfDataExists && hasRepoData){
    console.log("Commits data exists, skipping return", commitsData)
    return repoData;
  }
  
  const data = await getStatsReactive.getRepoStats(username, repoName);
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

  const data = await getCommitsReactive.getCommits(username, repoName);
  console.log("Commits Response (Full)", data);
  
  hasCommitsData.value = true;
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
</script>

<style scoped>
/* Your styles here */
</style>

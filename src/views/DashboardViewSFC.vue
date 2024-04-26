<template>
  <div>
    <MainTitle :state="'dashboard'" :title-center="repoName"/>
  </div>
  
  <div class="bg-image">
    <div class="container" id="dashboard" style="height: calc(100vh - 100px); overflow-y: auto;">
      <!-- Title -->
      <RepoTitleCard class="anim-slidein-down-1" v-bind="repoData" />

      <br>

      <!-- Basic Metrics -->
      <div class="card bg-opacity-75 bg-white anim-slidein-down-2">
        <div class="card-header azur-gradient">
          <h3 class="card-title text-center">Overview</h3>
        </div>
        <div class="card-body">
          <div class="row g-3">
<!--          <div class="row rows-cols-1 row-cols-md-2 row-cols-lg-3 g-3">-->

            <!-- OWNER/ORGANISATION -->
            <div class="col col-sm-12 col-md-6 col-lg-4">
              <!-- Owner -->
              <div class="card h-100 hover-shadow">
                <div class="card-header azur-gradient">
                  <h5 class="card-title">Owner</h5>
                </div>
                <div class="card-body">
                  <UserCard :user="repoData.owner" :get-user-data="getUserData"/>
                </div>
              </div>

              <!-- Organisation -->
              <div v-if="hasRepoData">
                <div v-if="repoData.organization && repoData.organization.name !== repoData.owner.name">
                  <br>
                  <div class="card h-100">
                    <div class="card-header azur-gradient">
                      <h5 class="card-title">Organisation</h5>
                    </div>
                    <div class="card-body">
                      <UserCard :user="repoData.organization" :get-user-data="getUserData"/>
                    </div>
                  </div>

                </div>

              </div>

            </div>

            <!-- Stats card-->
            <div class="col col-sm-12 col-md-6 col-lg-4">
              <BasicMetricsCard v-bind="repoData" />
            </div>

            <!-- LICENSE -->
            <div class="col col-sm-12 col-md-6 col-lg-4">
              <LicenseCard v-bind="licenseData" />
            </div>

            <!-- TOPICS -->
            <div class="col col-sm-12 col-md-6 col-lg-4">
              <TopicsCard
                  :topics="repoData.topics"
              />
            </div>

            <!-- COMMITS -->
            <div class="col col-sm-12 col-md-6 col-lg-4">
              <CommitsOverviewCard
                  :commits_count="commitsCount"
                  :authors_count="uniqueAuthors"
              />
            </div>
            
            <div class="col col-sm-12 col-md-6 col-lg-4">
              <MostRecentCommitCard v-bind="mostRecentCommit"/>
            </div>

            <!-- Citations -->
            <div class="col col-sm-12 col-md-6 col-lg-6">
              <RepoLinksCard
                  :links="readmeLinks"
              />
            </div>
            
            <!-- Citations -->
            <div class="col col-sm-12 col-md-6 col-lg-6">
              <CitationsCard
                  :citations-data="citationsData"
              />
            </div>
          </div>
        </div>
        
      </div>
      

      <br>

      <!-- ACTIVITY CHART -->
      <div class="col-md-auto">
        <ActivityChartCard class="anim-slidein-down-3"
            :chart-state="commitsChartState"
            :commits-chart-data="commitsChartData"
            :issues-chart-data="issuesChartData"

            :is_loading_commits="isLoadingCommits"
            :is_loading_issues="isLoadingIssues"

            @change-activity-chart-state="setActivityChartState"
            @refresh-commits="refreshCommits"
            @refresh-issues="refreshIssues"
        />
      </div>

      <br>

      <!-- CONTRIBUTORS CARD -->
      <div class="col-md-auto">
        <ContributorsCard class="anim-slidein-down-4"
            :is-loading="isLoadingContributors"
            :chart-state="contributorChartState"
            :contributors-top="contributorsChartData"
            :suggested-max="ChartDataContributors.getSuggestedMaxY(contributorsTop)"
            :suggested-max-y1="ChartDataContributors.getSuggestedMaxYCommits(contributorsTop)"

            :contributors-chart-data-stacked="contributorsChartDataStacked"
            :suggested-max-stacked="ChartDataContributors.getSuggestedMaxYCommits(contributorsTop)"
            :change-chart-state="changeContributorChartState"

            :get-user-data="getUserData"
            @refresh-contributors="refreshContributors"
        />
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
<!--          "Toasts"-->
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
  </div>
  

  <!-- Offcanvas -->
  <User_OffCanvas
      :username="owner"
      :user-data="currentUserData"
      :get-user-data="getUserData"
      :open-dashboard="openDashboard"
      :loading-repos="isLoadingUserData"
  />
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
// import Toast_BottomRight from "../components/toasts/Toast_BottomRight.vue";
import ActivityChartCard from "../dashboard/ActivityChartCard.vue";

//Requests modules
import GetRepoStats from "../js/requests/getRepoStats.js"
import GetRepoCommits from "../js/requests/getRepoCommits.js";
import GetRepoContributors from "../js/requests/getRepoContributors.js";
import GetRepoReadme from "../js/requests/getRepoReadme.js";
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
import GetRepoCitations from "../js/getRepoCitations.js";
import CitationsCard from "../dashboard/CitationsCard.vue";
import RepoLinksCard from "../dashboard/unused/RepoLinksCard.vue";
import RequestUtils from "../js/requests/requestUtils.js";

const USING_TEST_DATA = false;

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

//Citations
const citationsData = ref({});
const hasCitationsData = ref(false);
const isLoadingCitations = ref(false);

//Readme links
const readmeLinks = ref([]);
const hasReadmeLinks = ref(false);
const isLoadingReadmeLinks = ref(false);

//Toasts
// let showToast = ref(false);
// const toastMessage = ref("");
const toastMessages = ref([]);
// const toastLifetime = ref(5000);

// const requestUtils = new RequestUtils();

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
  
  

  // displayToast(`Loading dashboard for ${newUsername}/${newRepoName}`)
  getRepoStats(owner.value, repoName.value);
};

/**
 * Retrieve the repo stats, then use the links to retrieve further information.
 * @param username username of repo owner
 * @param repoName name of the repo
 */
function getRepoStats(username, repoName) {
  isLoadingRepo.value = true;
  
  fetchStats(username, repoName).then((data) => {
    console.log("Stats Response (Full)", data);
    repoData.value = data;
    
    handleRepoLinks();
  }).catch((error) => {
    console.error(error);
    //Display toast
    displayToast(`Error: failed to retrieve repository data, please refresh and try again.`)
  }).finally(() => {
    isLoadingRepo.value = false
  });
}

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
    //Display toast
    displayToast(`Error: failed to get commit data, use the commit refresh button or refresh the page if problems continue.`)
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
function getContributors(username, repoName) {
  isLoadingContributors.value = true;
  
  fetchContributors(username, repoName).then((data) => {
    // console.log("Contributors Response (Full)", data)
    if(data.length <= 0){
      console.error(`Error fetching contributors for ${username}/${repoName}, data empty`)
      isLoadingContributors.value = false
      return;
    }
    
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
    console.error(error.stack);
    //Display toast
    displayToast(`Error: failed to get contributor data, use the commit refresh button or refresh the page if problems continue.`)
  }).finally(() => {
    isLoadingContributors.value = false
  });
}

/**
 * Call to get the issues history for the repo. Calculates the issue frequency per time interval.
 * @param username
 * @param repoName
 */
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
    console.error(error.stack);
    //Display toast
    displayToast(`Error: failed to get issues data, use the commit refresh button or refresh the page if problems continue.`)
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
    console.error(error.stack);
    //Display toast
    displayToast(`Error: failed to retrieve license information, please try again.`)
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
    
  }).catch((error) => {
    console.error(error.stack)
    //Display toast
    displayToast(`Error: failed to retrieve user, please refresh the page and try again.`)
  }). finally(() => {
    isLoadingUserData.value = false;
  })
}

/**
 * Call to get citations for this project
 * @param repoData
 */
function getCitations(repoData){
  const htmlUrl = repoData.html_url;
  
  isLoadingCitations.value = true;
  
  fetchCitations(htmlUrl).then((data) => {
    console.log("Received citations");
    
    citationsData.value = data;
    hasCitationsData.value = true;
  }).catch((error) => {
    console.error(error.stack);
    //Display toast
    displayToast(`Error: failed to retrieve citations, please refresh the page and try again.`)
  }).finally(() => {
    isLoadingCitations.value = false;
  });
}

/**
 * Call to get the links from a project's README.md file
 * @param username name of repository owner
 * @param repoName name of repository
 */
function getReadmeLinks(username, repoName){
  // if(!repoData.hasOwnProperty("license")){
  //   console.error("No license found!");
  // }
  
  isLoadingReadmeLinks.value = true;

  fetchReadmeLinks(username, repoName).then((data) => {
    console.log("Received readme data");

    readmeLinks.value = data;
    hasReadmeLinks.value = true;
  }).catch((error) => {
    console.error(error.stack);
    //Display toast
    displayToast(`Error: failed to retrieve README links, please refresh the page and try again.`)
  }).finally(() => {
    isLoadingReadmeLinks.value = false;
  });
}

/**
 * Once the repo stats are retrieved, call requests to other endpoints.
 */
// const handleRepoLinks = () => {
//   //Get commits
//   getCommits(owner.value, repoName.value)
//  
//   //Get contributors
//   getContributors(owner.value, repoName.value);
//  
//   //Get issues
//   getIssues(owner.value, repoName.value);
//  
//   //Get License
//   getLicense(repoData.value);
//  
//   //Get citations
//   getCitations(repoData.value);
//  
//   //Get links from readme
//   getReadmeLinks(owner.value, repoName.value);
// };

async function handleRepoLinks(){
  const functions = [
    { func: getCommits, args: [owner.value, repoName.value] },
    { func: getContributors, args: [owner.value, repoName.value] },
    { func: getIssues, args: [owner.value, repoName.value] },
    { func: getLicense, args: [repoData.value] },
    { func: getCitations, args: [repoData.value] },
    { func: getReadmeLinks, args: [owner.value, repoName.value] }
  ];

  for (const { func, args } of functions) {
    await new Promise(resolve => {
      setTimeout(async () => {
        await func(...args);
        resolve();
      }, 500); // 500ms delay
    });
  }
}


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
  console.log("Fetching contributors")

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

async function fetchCitations(htmlUrl){
  const data = await GetRepoCitations.getCitations(htmlUrl, USING_TEST_DATA);
  console.log(`${htmlUrl} Citations Data Response (Full)`, data)
  
  return data;
}

async function fetchReadmeLinks(username, repoName){
  const data = await GetRepoReadme.getRepoPublications(username, repoName, USING_TEST_DATA);
  
  console.log(`${username} Readme Links Data Response (Full)`, data)

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
  // console.log(`Loading commits = ${isLoadingCommits.value}`)
  if(isLoadingCommits.value){
    return;
  }
  
  //Get commits
  displayToast("Refreshing commits...")
  getCommits(owner.value, repoName.value);
};

const refreshIssues = () => {
  // console.log(`Loading issues = ${isLoadingIssues.value}`)
  if(isLoadingIssues.value){
    return;
  }

  displayToast("Refreshing issues...")
  getIssues(owner.value, repoName.value);
}

const refreshContributors = () => {
  // console.log(`Loading contributors = ${isLoadingContributors.value}`)
  if(isLoadingContributors.value){
    return;
  }
  
  displayToast("Refreshing contributors...")
  getContributors(owner.value, repoName.value);
}

function changeContributorChartState(newState="multi"){
  contributorChartState.value = newState
}

function displayToast(message){
  console.log(`Displaying toast`, message)
  
  toastMessages.value.push(message);
  // toastMessage.value = message;
  // showToast.value = true;

  // const toastLiveExample = document.getElementById('liveToast')
  // const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
  // toastBootstrap.show()
  // toastTrigger.addEventListener('click', () => {
  //  
  // })
  
  //Start timer for lifetime
  // if(toastLifetime.value){
  //   setTimeout(() => {
  //     closeToast();
  //   }
  //   , toastLifetime.value)
  // }
}

const openDashboard = (owner, repo) => {
  const dashboardUrl = `/dashboard/${owner}/${repo}`;
  window.open(dashboardUrl, '_blank');

  // appState.value.openDashboard(owner, repo);
};

// const closeToast = () => {
//   showToast.value = false
// }

</script>

<style scoped>
/* Your styles here */
</style>

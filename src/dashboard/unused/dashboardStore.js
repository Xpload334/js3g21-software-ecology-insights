// // store.js
// import { reactive } from 'vue'
// import {getStatsReactive} from "../js/getRepoStats.js";
// import {getCommitsReactive} from "../js/getRepoCommits.js";
// import {storeMain} from "../js/storeMain.js";
// import {chartDataUtils} from "../js/chartDataUtils.js";
// import {getContributorsReactive} from "../js/getRepoContributors.js";
// import {chartDataContributors} from "../js/chartDataContributors.js";
// import {getReadmeReactive} from "../js/getRepoReadme.js";
//
// import testCommitData from "../assets/TestCommitData.json";
// import testRepoData from "../assets/TestRepoData.json";
// import testContributorsData from "../assets/TestContributorsData.json";
//
// export const dashboardStore = reactive({
//    
//     lastOwner : "",
//     lastRepoName : "",
//    
//     // repoData: {
//     //     name: "Unknown",
//     //     description : "Cannot find description"
//     // },
//     //TODO: REPLACE WITH CALLS ONCE LIMITATIONS REMOVED
//     repoData : testRepoData,
//     hasRepoData: false,
//    
//     //Commits
//     commitsData: {},
//     commitsCount : 0,
//     uniqueAuthors: 0,
//     mostRecentCommit: {},
//     hasCommitData: false,
//     //Charts
//     chartState : "year", //lifetime | year | threeMonths | month | week
//     chartData : {
//         lifetime :      [],
//         year :          [],
//         threeMonths :   [],
//         month :         [],
//         week :          []
//     },
//    
//     //Contributors
//     contributorsData: {},
//     hasContributorsData: false,
//     contributorsTop : [],
//     contributorsChartData : [],
//    
//     //README
//     htmlReadme : null,
//     /*
//     Call whenever the dashboard needs to be initialised to a new repo
//      */
//    
//     openDashboard(){
//         console.log("Opening dashboard")
//        
//         //Check if owner and repo match
//         if(storeMain.owner === this.lastOwner && storeMain.repoName === this.lastRepoName){
//             //Might not need new data
//             //Check when last accessed
//             return;
//         }
//        
//         this.lastOwner = storeMain.owner;
//         this.lastRepoName = storeMain.repoName;
//         // this.getRepoStats(this.lastOwner, this.lastRepoName)
//        
//         //Handle links
//         this.handleRepoLinks();
//     },
//     getRepoStats(username, repoName){
//         getStatsReactive.getRepoStats(username, repoName).then((response) =>{
//             console.log("Stats", response.data);
//             this.hasRepoData = true;
//             this.repoData = response.data;
//
//             this.handleRepoLinks();
//         });
//     },
//     //GET COMMITS
//     getCommits(username, repoName){
//         console.log(`Retrieving commits for ${username}/${repoName}`)
//         if(this.hasCommitData){
//             console.log("Already has commit data, skipping")
//             return;
//         }
//        
//         this.getTestCommitData()
//         this.hasCommitData = true;
//        
//         //TODO: later when more finished, re-enable
//         // //Make request
//         // getCommitsReactive.getCommits(username, repoName).then((data) => {
//         //     console.log("Commit data", data);
//         //     this.hasCommitData = true;
//         //     this.commitsData = data;
//         // });
//        
//         this.commitsCount = this.commitsData.length;
//         this.uniqueAuthors = this.countUniqueAuthors();
//         this.mostRecentCommit = this.findMostRecentCommit();
//        
//         //Get chart data
//         this.chartData.lifetime = chartDataUtils.commitsLifetimeForChart(this.commitsData);
//         this.chartData.year = chartDataUtils.commitsLast12MonthsForChart(this.commitsData);
//         this.chartData.threeMonths = chartDataUtils.commitsLastThreeMonthsForChart(this.commitsData);
//         this.chartData.month = chartDataUtils.commitsLastMonthForChart(this.commitsData);
//         this.chartData.week = chartDataUtils.commitsLastWeekForChart(this.commitsData);
//     },
//     /**
//      * Get the contributions for the given repository
//      * @param username
//      * @param repoName
//      */
//     getContributors(username, repoName){
//         console.log(`Retrieving contributors for ${username}/${repoName}`);
//         const maxContributors = 5;
//        
//        
//         //USING TEST DATA
//         this.getTestContributorsData();
//         let partialContributors = chartDataContributors.getTopNContributors(this.contributorsData, 5);
//         try {
//             // Transform to chart data
//             this.contributorsTop = partialContributors;
//             // this.contributorsChartData = chartDataContributors.convertToChartJSData(partialContributors);
//             // console.log("Contributors Chart Data", this.contributorsChartData);
//         } catch (error) {
//             console.error('Error converting contributors data to chart data', error);
//         }
//        
//         // //Get data
//         // getContributorsReactive.getContributorData(username, repoName)
//         //     .then(contributorsData => {
//         //         console.log("Contributors Data DASHBOARD_STORE", contributorsData);
//         //
//         //         if (!contributorsData || contributorsData.length === 0) {
//         //             console.warn('Contributors data is empty or undefined.');
//         //             return;
//         //         }
//         //
//         //         let partialContributors = contributorsData.slice(0, maxContributors);
//         //
//         //         if (!partialContributors || partialContributors.length === 0) {
//         //             console.warn('Partial contributors data is empty or undefined.');
//         //             return;
//         //         }
//         //
//         //         try {
//         //             // Transform to chart data
//         //             this.contributorsChartData = chartDataContributors.convertToChartJSData(partialContributors);
//         //             console.log("Contributors Chart Data", this.contributorsChartData);
//         //         } catch (error) {
//         //             console.error('Error converting contributors data to chart data', error);
//         //         }
//         //     })
//         //     .catch(error => {
//         //         console.error('Error getting contributors chart data', error);
//         //     });
//     },
//
//     /**
//      * Request the repo's README file in HTML format
//      * @param username
//      * @param repoName
//      */
//     getReadme(username, repoName){
//         console.log(`Retrieving README for ${username}/${repoName}`);
//         getReadmeReactive.getRepoReadme(username, repoName)
//             .then(content => {
//                 console.log("Repo README", content);
//                 this.htmlReadme = content;
//             })
//     },
//
//     /*
//     Using the URLs inside the stats data, can get even more information.
//     Calls the other data handling functions.
//      */
//     handleRepoLinks(){
//         //Get Commits
//         this.getCommits(this.lastOwner, this.lastRepoName);
//        
//         //Get Contributors
//         this.getContributors(this.lastOwner, this.lastRepoName);
//        
//         //Get README
//         // this.getReadme(this.lastOwner, this.lastRepoName);
//        
//         //Get Comments
//         //Get issues
//         //etc
//     },
//     disableButton() {
//         if (this.isLoading) return;
//
//         this.isLoading = true
//         setTimeout(() => {
//             this.isLoading = false
//         }, 2000)
//     },
//     success(message) {
//         this.successMessage = message;
//         setTimeout(() => {
//             this.successMessage = null;
//         }, 3000);
//     },
//     fail(message) {
//         this.errorMessage = message;
//         setTimeout(() => {
//             this.errorMessage = null;
//         }, 3000);
//     },
//    
//     getTestCommitData(){
//         this.commitsData = testCommitData.commits;
//         console.log("Test Data Applied", this.commitsData)
//     },
//     getTestContributorsData(){
//         this.contributorsData = testContributorsData.contributors;
//         console.log("Test Data Applied", this.commitsData)
//     },
//     countUniqueAuthors(){
//         return getCommitsReactive.countUniqueAuthors(this.commitsData);
//     },
//     findMostRecentCommit(){
//         return getCommitsReactive.findMostRecentCommit(this.commitsData);
//     },
//    
//     setChartState(newState){
//         console.log(`Setting chart state to ${newState}`)
//         this.chartState = newState;
//     }
// })

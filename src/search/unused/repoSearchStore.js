// // store.js
// import { reactive } from 'vue'
// import {searchReposReactive} from "../../js/requests/searchForRepos.js";
//
// let socket = null;
// export const searchStore = reactive({
//     //Fields
//     isLoading: false,
//     username: "",
//     lastUsername: "",
//     errorMessage: "",
//     successMessage: "",
//
//     //Search Results
//     hasSearchData: false,
//     searchResults : [],
//     currentDisplay : {},
//     currentResults : [],
//
//     //Page
//     currentPage: 1,
//     itemsPerPage: 30,
//     totalPages: 10,
//    
//     /*
//     Search for repos by username (initial search)
//      */
//     getReposByUsername() {
//         let shouldSearch = this.lastUsername !== this.username;
//    
//         if (shouldSearch) {
//             //Search page 1
//             this.searchResults = [];
//             this.getRepos(this.username, 1)
//         } else {
//             console.log("Searching for the same username, cancelling search");
//         }
//     },
//     getRepos(username, pageNum){
//         let body = {
//             owner: username,
//             page: pageNum,
//         };
//    
//         this.disableButton();
//         this.lastUsername = username;
//         // console.log("Sending message: ", body);
//         // socket.emit('getRepoList', body);
//        
//         searchReposReactive.listReposForUser(username, pageNum).then(r => {
//             console.log("Repos data received", r)
//             this.handleRepos(r)
//         })
//     },
//    
//     handleRepos(data) {
//         // console.log(data);
//    
//         this.searchResults[this.currentPage-1] = data.repos; //Apply data
//         this.itemsPerPage = data.itemsPerPage;
//         // Update total pages
//         this.totalPages = data.totalPages;
//         this.hasSearchData = true;
//    
//         this.displaySearchResults();
//     },
//    
//     displaySearchResults() {
//         console.log(`Displaying page ${this.currentPage}`);
//        
//         // Clear previous content
//         this.clearDisplayedResults();
//
//         const resultList = document.getElementById('resultList');
//         // Update the displayed results based on pagination
//         this.currentResults = this.searchResults[this.currentPage - 1];
//         console.log('CURRENT Results', this.currentResults);
//     },
//     clearDisplayedResults(){
//         // console.log("Clearing data");
//         // Clear previous content
//         // this.currentResults = []
//        
//         // const resultList = document.getElementById('resultList');
//         // while(resultList.firstChild){
//         //     resultList.removeChild(resultList.firstChild);
//         // }
//     },
//     ////////////////////////////////
//     disableButton() {
//         if (this.isLoading) return;
//    
//         this.isLoading = true
//         setTimeout(() => {
//             this.isLoading = false
//         }, 2000)
//     },
//     nextPage() {
//         if (this.currentPage < this.totalPages) {
//             this.currentPage++;
//    
//             //If does not have content
//             if(this.currentPage > this.searchResults.length){
//                 console.log("Retrieving data for next page from server");
//                 this.getRepos(this.lastUsername, this.currentPage);
//             } else {
//                 console.log("Already has data for this page");
//                 //Use already received data about current page
//                 this.displaySearchResults();
//             }
//    
//         }
//     },
//    
//     previousPage() {
//         if (this.currentPage > 1) {
//             this.currentPage--;
//             //Use already received data about current page
//             this.displaySearchResults();
//         }
//     },
//     openDashboard(owner, repo, full_name) {
//         // Assuming the same origin for the dashboard endpoint
//         const dashboardUrl = `/dashboard?user=${owner}&repo=${repo}`;
//         // const dashboardUrl = `/dashboard?full_name=${full_name}`;
//    
//         // Open a new tab with the dashboard URL
//         window.open(dashboardUrl, '_blank');
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
//     }
// })
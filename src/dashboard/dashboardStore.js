// store.js
import { reactive } from 'vue'
import {getStatsReactive} from "../js/getRepoStats.js";
import {getCommitsReactive} from "../js/getRepoCommits.js";
import {storeMain} from "../js/storeMain.js";

let socket = null;
export const dashboardStore = reactive({
    repoData: {},
    hasRepoData: false,
    
    
    commitsData: {},
    
    onConnected(){
        // // Extract query parameters from the URL
        // const urlParams = new URLSearchParams(window.location.search);
        // this.username = urlParams.get('user');
        // this.repoName = urlParams.get('repo');

        this.getRepoStats(storeMain.username, storeMain.repoName)
    },
    getRepoStats(username, repoName){
        // let body = {
        //     owner: username,
        //     repo: repoName
        // }
        // //Send message to server requesting stats
        // socket.emit('repoStats', body);
        getStatsReactive.getRepoStats(username, repoName).then((data) =>{
            console.log("Stats",data);
            this.hasRepoData = true;
            this.repoData = data;

            this.handleRepoLinks();
        });
    },
    getContributors(){
        if(this.repoData !== {}){
            let body = {
                contributors_url : this.repoData.contributors_url
            }
            socket.emit("getContributors", body);
        } else {
            console.error("Cannot find repo data")
        }
    },
    //GET COMMITS
    getCommits(username, repoName){
        let body = {
            owner: username,
            repo: repoName
        }
        this.disableButton();
        socket.emit('getCommits', body)
    },

    /*
    Using the URLs inside the stats data, can get even more information.
    Calls the other data handling functions.
     */
    handleRepoLinks(){
        this.getCommits(storeMain.username, storeMain.repoName)
    },

    handleCommits(data){
        if(!this.hasCommitData){
            this.hasCommitData = true;
        }
        data.commitData.forEach((item) =>{
            // console.log(item);
            this.commitsData.push(item);
        })
    },
    disableButton() {
        if (this.isLoading) return;

        this.isLoading = true
        setTimeout(() => {
            this.isLoading = false
        }, 2000)
    },
    generateCommitGraph() {
        console.log("Commit Data", this.commitsData);
        // Extract dates and commit counts
        const dates = this.commitsData.map(commit => commit.author.date);
        const commitCounts = this.commitsData.map(() => 1); // Assuming each entry is one commit

        // Create a chart using Chart.js
        const ctx = document.getElementById('commitChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: dates,
                datasets: [{
                    label: 'Commits Over Time',
                    data: commitCounts,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    fill: false,
                }],
            },
            options: {
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'day', // Adjust as needed
                        },
                        title: {
                            display: true,
                            text: 'Date',
                        },
                    },
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Commit Count',
                        },
                    },
                },
            },
        });
    },
    success(message) {
        this.successMessage = message;
        setTimeout(() => {
            this.successMessage = null;
        }, 3000);
    },
    fail(message) {
        this.errorMessage = message;
        setTimeout(() => {
            this.errorMessage = null;
        }, 3000);
    },

    objectHasKey(obj, key) {
        // Check if the object is defined and has the given key, and the value is not null
        return obj !== null && obj !== undefined && obj[key] !== null && Object.prototype.hasOwnProperty.call(obj, key);
    },
})

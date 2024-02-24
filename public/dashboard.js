/*
Dashboard

VIEWS
- Main stats
- Commit graph
- Issues graph
- Contributors
- README and citings
 */

// const LineChart = require('views/dashboard/vueTemplates/LineChart.vue');
// import Vue from 'vue';
// import App from 'views/Dashboard.vue';
// import router from 'router';

// import {Chart} from "chart.js/dist/types";

let socket = null;
let app = new Vue({
    el: "#dashboard",
    components: {
 
    },
    data: {
        connected: false,
        state: 'stats', //"stats", "contributors", 'graphTest'

        //Language
        chosenLanguage: "en", //['en','es','it','sv','ru','id','bg','zh-Hans']

        //Data
        hasRepoData: false,
        repoData: {},
        
        //Contributors
        hasContributorsData: false,
        contributorsData : [],
        
        //Commits
        hasCommitData: false,
        commitsData : [],
        chartTestData: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'Data One',
                    backgroundColor: '#f87979',
                    data: [40, 39, 10, 40, 39, 80, 40]
                }
            ]
        },
        chartTestOptions: {
            responsive: true,
            maintainAspectRatio: false
        },
        
        //Fields
        isLoading: false,
        username: "",
        repoName: "",
        errorMessage: "",
        successMessage: "",
    },
    mounted: function () {
        connect();
    },
    methods: {
        onConnected(){
            // Extract query parameters from the URL
            const urlParams = new URLSearchParams(window.location.search);
            this.username = urlParams.get('user');
            this.repoName = urlParams.get('repo');

            this.getRepoStats(this.username, this.repoName);

            console.log("COMMIT GRAPH")
            const xValues = ["Italy", "France", "Spain", "USA", "Argentina"];
            const yValues = [55, 49, 44, 24, 15];
            const barColors = ["red", "green","blue","orange","brown"];

            let chart = new Chart("myChart", {
                type: "bar",
                data: {
                    labels: xValues,
                    datasets: [{
                        backgroundColor: barColors,
                        data: yValues
                    }]
                },
                options: {
                    legend: {display: false},
                    title: {
                        display: true,
                        text: "World Wine Production 2018"
                    }
                }
            });
        },
        getRepoStats(username, repoName){
            let body = {
                owner: username,
                repo: repoName
            }
            //Send message to server requesting stats
            socket.emit('repoStats', body);
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
        Get commit history of a given repository
         */
        commitHistory(username, repo) {
            let body = {
                owner: username,
                repo: repo,
            };
            this.disableButton();
            console.log("Sending message: ", body);
            socket.emit('commitHistory', body);
        },

        /*
        Get stats of a given repository
         */
        handleStats(data){
            console.log("Stats",data);
            this.hasRepoData = true;
            this.repoData = data;
            
            
            this.handleRepoLinks();
        },
        /*
        Using the URLs inside the stats data, can get even more information.
         */
        handleRepoLinks(){
            this.getCommits(this.username, this.repoName)
        },
        handleContributors(data){
            console.log(data);
            this.hasContributorsData = true;
            this.contributorsData = data;
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
        repoDataHasKey(key){
            return this.objectHasKey(this.repoData, key);
        },
        
        setState(newState){
            console.log(`State set to ${newState}`)
            this.state = newState;
        },
        setStateStats(){
            this.setState("stats")
        },
        setStateCommits(){
            this.setState("commits")
        },
    },
});

function connect() {
    //Prepare web socket
    socket = io();

    //Connect
    socket.on("connect", function () {
        //Set connected state to true
        app.connected = true;
        app.onConnected();
    });

    //Handle connection error
    socket.on("connect_error", function (message) {
        alert("Unable to connect: " + message);
    });

    //Handle disconnection
    socket.on("disconnect", function () {
        alert("Disconnected");
        app.connected = false;
    });

    //Failure
    socket.on("fail", function (message) {
        app.fail(message);
    });

    // Success
    socket.on("success", function (message) {
        app.success(message);
    });
    
    //Stats
    socket.on("stats", function (message){
       app.handleStats(message); 
    });
    
    //Contributors
    socket.on("contributorsData", function (message){
       app.handleContributors(message);
    });
    
    //Commit Data
    socket.on('commitData', function(message){
        app.handleCommits(message);
    });
}

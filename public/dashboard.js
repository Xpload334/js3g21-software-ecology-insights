/*
File to use for the client view
 */
// const Vue = require('vue');

/*
Dashboard


VIEWS
- Main stats
- Commit graph
- Issues graph
- Contributors
- README and citings
 */

let socket = null;
let app = new Vue({
    el: "#dashboard",
    data: {
        connected: false,

        state: 'stats', //"stats", "contributors"

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
            
            this.getRepoStats(this.username, this.repoName)
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

            this.commitsData.push(data);
        },
        disableButton() {
            if (this.isLoading) return;

            this.isLoading = true
            setTimeout(() => {
                this.isLoading = false
            }, 2000)
        },
        constructGraph(data){
            // Example commitsData structure:
            const commitsData = [
                { date: '2022-01-01', count: 5 },
                { date: '2022-01-02', count: 8 },
                // Add more data as needed
            ];

            // Extract dates and commit counts
            const dates = commitsData.map(commit => commit.date);
            const commitCounts = commitsData.map(commit => commit.count);

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

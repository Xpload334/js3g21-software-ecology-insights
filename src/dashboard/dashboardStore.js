// store.js
import { reactive } from 'vue'
import {getStatsReactive} from "../js/getRepoStats.js";
import {getCommitsReactive} from "../js/getRepoCommits.js";
import {storeMain} from "../js/storeMain.js";
import testData from "../assets/TestCommitData.json"
import {chartDataUtils} from "../js/chartDataUtils.js";

let socket = null;
export const dashboardStore = reactive({
    
    lastOwner : "",
    lastRepoName : "",
    
    // repoData: {
    //     name: "Unknown",
    //     description : "Cannot find description"
    // },
    //TODO: REPLACE WITH CALLS ONCE LIMITATIONS REMOVED
    repoData : {
        "id": 468576060,
        "node_id": "R_kgDOG-3nPA",
        "name": "openai-cookbook-PASTVIEW",
        "full_name": "openai/openai-cookbook",
        "private": false,
        "owner": {
            "login": "openai",
            "id": 14957082,
            "node_id": "MDEyOk9yZ2FuaXphdGlvbjE0OTU3MDgy",
            "avatar_url": "https://avatars.githubusercontent.com/u/14957082?v=4",
            "gravatar_id": "",
            "url": "https://api.github.com/users/openai",
            "html_url": "https://github.com/openai",
            "followers_url": "https://api.github.com/users/openai/followers",
            "following_url": "https://api.github.com/users/openai/following{/other_user}",
            "gists_url": "https://api.github.com/users/openai/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/openai/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/openai/subscriptions",
            "organizations_url": "https://api.github.com/users/openai/orgs",
            "repos_url": "https://api.github.com/users/openai/repos",
            "events_url": "https://api.github.com/users/openai/events{/privacy}",
            "received_events_url": "https://api.github.com/users/openai/received_events",
            "type": "Organization",
            "site_admin": false
        },
        "html_url": "https://github.com/openai/openai-cookbook",
        "description": "Examples and guides for using the OpenAI API",
        "fork": false,
        "url": "https://api.github.com/repos/openai/openai-cookbook",
        "forks_url": "https://api.github.com/repos/openai/openai-cookbook/forks",
        "keys_url": "https://api.github.com/repos/openai/openai-cookbook/keys{/key_id}",
        "collaborators_url": "https://api.github.com/repos/openai/openai-cookbook/collaborators{/collaborator}",
        "teams_url": "https://api.github.com/repos/openai/openai-cookbook/teams",
        "hooks_url": "https://api.github.com/repos/openai/openai-cookbook/hooks",
        "issue_events_url": "https://api.github.com/repos/openai/openai-cookbook/issues/events{/number}",
        "events_url": "https://api.github.com/repos/openai/openai-cookbook/events",
        "assignees_url": "https://api.github.com/repos/openai/openai-cookbook/assignees{/user}",
        "branches_url": "https://api.github.com/repos/openai/openai-cookbook/branches{/branch}",
        "tags_url": "https://api.github.com/repos/openai/openai-cookbook/tags",
        "blobs_url": "https://api.github.com/repos/openai/openai-cookbook/git/blobs{/sha}",
        "git_tags_url": "https://api.github.com/repos/openai/openai-cookbook/git/tags{/sha}",
        "git_refs_url": "https://api.github.com/repos/openai/openai-cookbook/git/refs{/sha}",
        "trees_url": "https://api.github.com/repos/openai/openai-cookbook/git/trees{/sha}",
        "statuses_url": "https://api.github.com/repos/openai/openai-cookbook/statuses/{sha}",
        "languages_url": "https://api.github.com/repos/openai/openai-cookbook/languages",
        "stargazers_url": "https://api.github.com/repos/openai/openai-cookbook/stargazers",
        "contributors_url": "https://api.github.com/repos/openai/openai-cookbook/contributors",
        "subscribers_url": "https://api.github.com/repos/openai/openai-cookbook/subscribers",
        "subscription_url": "https://api.github.com/repos/openai/openai-cookbook/subscription",
        "commits_url": "https://api.github.com/repos/openai/openai-cookbook/commits{/sha}",
        "git_commits_url": "https://api.github.com/repos/openai/openai-cookbook/git/commits{/sha}",
        "comments_url": "https://api.github.com/repos/openai/openai-cookbook/comments{/number}",
        "issue_comment_url": "https://api.github.com/repos/openai/openai-cookbook/issues/comments{/number}",
        "contents_url": "https://api.github.com/repos/openai/openai-cookbook/contents/{+path}",
        "compare_url": "https://api.github.com/repos/openai/openai-cookbook/compare/{base}...{head}",
        "merges_url": "https://api.github.com/repos/openai/openai-cookbook/merges",
        "archive_url": "https://api.github.com/repos/openai/openai-cookbook/{archive_format}{/ref}",
        "downloads_url": "https://api.github.com/repos/openai/openai-cookbook/downloads",
        "issues_url": "https://api.github.com/repos/openai/openai-cookbook/issues{/number}",
        "pulls_url": "https://api.github.com/repos/openai/openai-cookbook/pulls{/number}",
        "milestones_url": "https://api.github.com/repos/openai/openai-cookbook/milestones{/number}",
        "notifications_url": "https://api.github.com/repos/openai/openai-cookbook/notifications{?since,all,participating}",
        "labels_url": "https://api.github.com/repos/openai/openai-cookbook/labels{/name}",
        "releases_url": "https://api.github.com/repos/openai/openai-cookbook/releases{/id}",
        "deployments_url": "https://api.github.com/repos/openai/openai-cookbook/deployments",
        "created_at": "2022-03-11T02:08:53Z",
        "updated_at": "2024-02-27T14:51:55Z",
        "pushed_at": "2024-02-27T10:30:51Z",
        "git_url": "git://github.com/openai/openai-cookbook.git",
        "ssh_url": "git@github.com:openai/openai-cookbook.git",
        "clone_url": "https://github.com/openai/openai-cookbook.git",
        "svn_url": "https://github.com/openai/openai-cookbook",
        "homepage": "https://cookbook.openai.com",
        "size": 246467,
        "stargazers_count": 54238,
        "watchers_count": 54238,
        "language": "MDX",
        "has_issues": true,
        "has_projects": false,
        "has_downloads": true,
        "has_wiki": false,
        "has_pages": false,
        "has_discussions": false,
        "forks_count": 8500,
        "mirror_url": null,
        "archived": false,
        "disabled": false,
        "open_issues_count": 71,
        "license": {
            "key": "mit",
            "name": "MIT License",
            "spdx_id": "MIT",
            "url": "https://api.github.com/licenses/mit",
            "node_id": "MDc6TGljZW5zZTEz"
        },
        "allow_forking": true,
        "is_template": false,
        "web_commit_signoff_required": false,
        "topics": [
            "chatgpt",
            "gpt-4",
            "openai",
            "openai-api"
        ],
        "visibility": "public",
        "forks": 8500,
        "open_issues": 71,
        "watchers": 54238,
        "default_branch": "main",
        "temp_clone_token": null,
        "custom_properties": {},
        "organization": {
            "login": "openai",
            "id": 14957082,
            "node_id": "MDEyOk9yZ2FuaXphdGlvbjE0OTU3MDgy",
            "avatar_url": "https://avatars.githubusercontent.com/u/14957082?v=4",
            "gravatar_id": "",
            "url": "https://api.github.com/users/openai",
            "html_url": "https://github.com/openai",
            "followers_url": "https://api.github.com/users/openai/followers",
            "following_url": "https://api.github.com/users/openai/following{/other_user}",
            "gists_url": "https://api.github.com/users/openai/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/openai/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/openai/subscriptions",
            "organizations_url": "https://api.github.com/users/openai/orgs",
            "repos_url": "https://api.github.com/users/openai/repos",
            "events_url": "https://api.github.com/users/openai/events{/privacy}",
            "received_events_url": "https://api.github.com/users/openai/received_events",
            "type": "Organization",
            "site_admin": false
        },
        "network_count": 8500,
        "subscribers_count": 845
    },
    hasRepoData: false,
    
    //Commits
    commitsData: {},
    commitsCount : 0,
    uniqueAuthors: 0,
    mostRecentCommit: {},
    hasCommitData: false,
    //Charts
    chartState : "year", //lifetime | year | threeMonths | month | week
    
    chartData : {
        lifetime :      [],
        year :          [],
        threeMonths :   [],
        month :         [],
        week :          []
    },
    /*
    Call whenever the dashboard needs to be initialised to a new repo
     */
    
    openDashboard(){
        console.log("Opening dashboard")
        
        //Check if owner and repo match
        if(storeMain.owner === this.lastOwner && storeMain.repoName === this.lastRepoName){
            //Might not need new data
            //Check when last accessed
            return;
        }
        
        this.lastOwner = storeMain.owner;
        this.lastRepoName = storeMain.repoName;
        // this.getRepoStats(this.lastOwner, this.lastRepoName)
        
        //Handle links
        this.handleRepoLinks();
    },
    getRepoStats(username, repoName){
        getStatsReactive.getRepoStats(username, repoName).then((response) =>{
            console.log("Stats", response.data);
            this.hasRepoData = true;
            this.repoData = response.data;

            this.handleRepoLinks();
        });
    },
    //GET COMMITS
    getCommits(username, repoName){
        console.log(`Retrieving commits for ${username}/${repoName}`)
        if(this.hasCommitData){
            console.log("Already has commit data, skipping")
            return;
        }
        
        this.getTestCommitData()
        this.hasCommitData = true;
        
        //TODO: later when more finished, re-enable
        // //Make request
        // getCommitsReactive.getCommits(username, repoName).then((data) => {
        //     console.log("Commit data", data);
        //     this.hasCommitData = true;
        //     this.commitsData = data;
        // });
        
        this.commitsCount = this.commitsData.length;
        this.uniqueAuthors = this.countUniqueAuthors();
        this.mostRecentCommit = this.findMostRecentCommit();
        
        //Get chart data
        this.chartData.lifetime = chartDataUtils.commitsLifetimeForChart(this.commitsData);
        this.chartData.year = chartDataUtils.commitsLast12MonthsForChart(this.commitsData);
        this.chartData.threeMonths = chartDataUtils.commitsLastThreeMonthsForChart(this.commitsData);
        this.chartData.month = chartDataUtils.commitsLastMonthForChart(this.commitsData);
        this.chartData.week = chartDataUtils.commitsLastWeekForChart(this.commitsData);
    },

    /*
    Using the URLs inside the stats data, can get even more information.
    Calls the other data handling functions.
     */
    handleRepoLinks(){
        //Get Commits
        this.getCommits(this.lastOwner, this.lastRepoName)
        
        //Get Comments
        //Get issues
        //etc
    },
    disableButton() {
        if (this.isLoading) return;

        this.isLoading = true
        setTimeout(() => {
            this.isLoading = false
        }, 2000)
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
    
    getTestCommitData(){
        this.commitsData = testData.commits;
        console.log("Test Data Applied", this.commitsData)
    },
    countUniqueAuthors(){
        return getCommitsReactive.countUniqueAuthors(this.commitsData);
    },
    findMostRecentCommit(){
        return getCommitsReactive.findMostRecentCommit(this.commitsData);
    },
    
    setChartState(newState){
        console.log(`Setting chart state to ${newState}`)
        this.chartState = newState;
    }
})

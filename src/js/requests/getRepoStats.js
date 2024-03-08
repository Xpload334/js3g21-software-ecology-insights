import {reactive} from "vue";
import {Octokit} from "@octokit/rest";
import testData from "../../assets/TestRepoData.json";

const octokit = new Octokit({
    // auth: process.env.AUTHENTICATION_TOKEN,
    auth : "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"
});

export const getStatsReactive = reactive({
    
    getRepoStats(owner, repo, usingTestData=false){
        if(usingTestData){
            console.log("TEST STATS DATA");
            return testData;
        }
        
        const response = this.requestRepoStats(owner, repo);
        console.log("Repo Stats Request", response);
        return response.data;
    },
    
    
    
    async requestRepoStats(owner, repo) {
        console.log(`Getting stats: GET /repos/${owner}/${repo}`);
        try{
            return await octokit.repos.get({
                owner: owner,
                repo: repo
            });
        } catch (error) {
            // Handle errors
            console.log("Error fetching stats", error);
        }
    }
});








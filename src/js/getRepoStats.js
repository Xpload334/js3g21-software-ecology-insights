import {reactive} from "vue";
import {Octokit} from "@octokit/rest";

const octokit = new Octokit({
    // auth: process.env.AUTHENTICATION_TOKEN,
});

export const getStatsReactive = reactive({
    
    getRepoStats(owner, repo){
        const response = this.requestRepoStats(owner, repo);
        console.log("Repo Stats Request", response);
        return response;
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








import {reactive} from "vue";
import {Octokit} from "@octokit/rest";

const octokit = new Octokit({
    // auth: process.env.AUTHENTICATION_TOKEN,
});

export const getStatsReactive = reactive({
    
    getRepoStats(owner, repo){
        const data = this.requestRepoStats(owner, repo);
        console.log("Repo Stats Request", data);
        return data
    },
    
    
    
    requestRepoStats(owner, repo) {
        console.log(`Getting stats: GET /repos/${owner}/${repo}`);
        return new Promise((resolve, reject) => {
            octokit.repos
                .get({owner, repo})
                .then((response) => {
                    const statistics = response.data;

                    // Resolve the Promise with the statistics
                    resolve(statistics);
                })
                .catch((error) => {
                    // Handle errors and reject the Promise
                    reject(error);
                });
        });
    }
});








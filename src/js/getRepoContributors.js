import {reactive} from "vue";
import {Octokit} from "@octokit/rest";

const octokit = new Octokit({
    // auth: process.env.AUTHENTICATION_TOKEN,
});

export const getContributorsReactive = reactive({
    async getContributorData(owner, repo) {
        const octokit = new Octokit();
    
        try {
            // Fetch data from GitHub API using Octokit
            const response = await octokit.repos.getContributorsStats({
                owner: owner,
                repo: repo,
            });
    
            // Check if the response contains data
            const data = response.data;
            // console.log("Contributors Data GET_UTILS", data);
            return Array.isArray(data) ? data : [];
        } catch (error) {
            console.error('Error fetching contributor data from GitHub API', error);
            return [];
        }
    }
});



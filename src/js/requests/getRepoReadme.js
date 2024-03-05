import {reactive} from "vue";
import {Octokit} from "@octokit/rest";

const octokit = new Octokit({
    // auth: process.env.AUTHENTICATION_TOKEN,
});

export const getReadmeReactive = reactive({
    getRepoReadme(owner, repo){
        const response = this.requestRepoReadme(owner, repo);
        // console.log("Repo README", response);
        return response;
    },
    
    async requestRepoReadme(owner, repo) {
        console.log(`Getting readme: GET /repos/${owner}/${repo}/readme`);
        try{
            return await octokit.request('GET /repos/{owner}/{repo}/readme', {
                owner: owner,
                repo: repo,
                accept : 'application/vnd.github.html+json' //Return in HTML
            });
        } catch (error) {
            // Handle errors
            console.log("Error fetching readme", error);
        }
    }
});



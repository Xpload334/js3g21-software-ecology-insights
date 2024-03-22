﻿import {reactive} from "vue";
import testData from "../../assets/TestRepoData.json";
import RequestUtils from "./requestUtils.js";

// const octokit = new Octokit({
//     // auth: process.env.AUTHENTICATION_TOKEN,
//     auth : "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"
// });

class GetRepoStats{
    static async getRepoStats(owner, repo, usingTestData=false){
        if(usingTestData){
            console.log("TEST STATS DATA");
            return testData;
        }

        const response = await this.requestRepoStats(owner, repo);
        // console.log("Repo Stats Request", response);
        return response.data;
    }

    static async requestRepoStats(owner, repo) {
        console.log(`Getting stats: GET /repos/${owner}/${repo}`);
        try{
            return await RequestUtils.octokit.repos.get({
                owner: owner,
                repo: repo
            });
        } catch (error) {
            // Handle errors
            console.log("Error fetching stats", error);
        }
    }
}
export default GetRepoStats;
// export const getStatsReactive = reactive({
//    
// });








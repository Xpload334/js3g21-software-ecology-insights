// import {reactive} from "vue";
// import {Octokit} from "@octokit/rest";
// import testData from "../../assets/TestContributorsData.json";
import RequestUtils from "./requestUtils.js";


class GetRepoContributors{
    static async getContributorData(owner, repo, usingTestData=false) {
        // if(usingTestData){
        //     console.log("TEST CONTRIBUTOR DATA");
        //     return testData.contributors;
        // }

        try {
            // Fetch data from GitHub API using Octokit
            const response = await RequestUtils.octokit.repos.getContributorsStats({
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
}
export default GetRepoContributors;

// export const getContributorsReactive = reactive({
//     async getContributorData(owner, repo, usingTestData=false) {
//         if(usingTestData){
//             console.log("TEST CONTRIBUTOR DATA");
//             return testData.contributors;
//         }
//        
//         try {
//             // Fetch data from GitHub API using Octokit
//             const response = await octokit.repos.getContributorsStats({
//                 owner: owner,
//                 repo: repo,
//             });
//    
//             // Check if the response contains data
//             const data = response.data;
//             // console.log("Contributors Data GET_UTILS", data);
//             return Array.isArray(data) ? data : [];
//         } catch (error) {
//             console.error('Error fetching contributor data from GitHub API', error);
//             return [];
//         }
//     }
// });



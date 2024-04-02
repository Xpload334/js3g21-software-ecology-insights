// import {reactive} from "vue";
// import {Octokit} from "@octokit/rest";

// import testData from '../../assets/TestCommitData.json'
import RequestUtils from "./requestUtils.js";


class GetRepoCommits{
    static async getCommits(owner, repo, usingTestData=false){
        // if(usingTestData){
        //     console.log("TEST COMMIT DATA");
        //     return testData.commits;
        // }


        const iterator = await this.getCommitsIterator(owner, repo);
        let commitData = []
        //Iterate through responses
        console.log("Iterating through commits")
        for await(const {data: commits} of iterator){
            let commitsArray = this.parseCommitsList(commits)
            //Concat with array
            commitData.push(commitsArray);
            // console.log(commitData)
        }
        return commitData.flat();
    }

    static parseCommitsList(data){
        let simplified = data.map((item) => (this.parseCommit(item)));

        // //LOG
        // console.log(simplified);
        return simplified;
    }
    static parseCommit(commitData){
        return {
            sha : commitData.sha,
            author : commitData.commit.author,
            committer : commitData.commit.committer,
            message : commitData.commit.message,
        }
    }

    static async getCommitsIterator(username, repo){
        console.log(`Handling getting commits for ${username}/${repo}`)
        try {
            //Iterator
            return RequestUtils.octokit.paginate.iterator('GET /repos/{owner}/{repo}/commits', {
                owner: username,
                repo: repo,
                per_page: 100,
                headers: {
                    "X-GitHub-Api-Version": "2022-11-28",
                },
            });
        } catch (error) {
            console.error('Error fetching commits:', error.message);
            throw error;
        }
    }

    static countUniqueAuthors(commits) {
        const uniqueAuthors = new Set();
        commits.forEach(commit => {
            uniqueAuthors.add(commit.author.name);
        });
        return uniqueAuthors.size;
    }
    static findMostRecentCommit(commits) {
        let mostRecentCommit = null;
        commits.forEach(commit => {
            const commitDate = new Date(commit.author.date);
            if (!mostRecentCommit || commitDate > new Date(mostRecentCommit.author.date)) {
                mostRecentCommit = commit;
            }
        });
        return mostRecentCommit;
    }
    
}
export default GetRepoCommits;

// export const getCommitsReactive = reactive({
//     async getCommits(owner, repo, usingTestData=false){
//         if(usingTestData){
//             console.log("TEST COMMIT DATA");
//             return testData.commits;
//         }
//        
//        
//         const iterator = await this.getCommitsIterator(owner, repo);
//         let commitData = []
//         //Iterate through responses
//         console.log("Iterating through commits")
//         for await(const {data: commits} of iterator){
//             let commitsArray = this.parseCommitsList(commits)
//             //Concat with array
//             commitData.push(commitsArray);
//             // console.log(commitData)
//         }
//         return commitData.flat();
//     },
//    
//     parseCommitsList(data){
//         let simplified = data.map((item) => (this.parseCommit(item)));
//        
//         // //LOG
//         // console.log(simplified);
//         return simplified;
//     },
//     parseCommit(commitData){
//         return {
//             sha : commitData.sha,
//             author : commitData.commit.author,
//             committer : commitData.commit.committer,
//             message : commitData.commit.message,
//         }
//     },
//     async getCommitsIterator(username, repo){
//         console.log(`Handling getting commits for ${username}/${repo}`)
//         try {
//             //Iterator
//             return octokit.paginate.iterator('GET /repos/{owner}/{repo}/commits', {
//                 owner: username,
//                 repo: repo,
//                 per_page: 100,
//                 headers: {
//                     "X-GitHub-Api-Version": "2022-11-28",
//                 },
//             });
//         } catch (error) {
//             console.error('Error fetching commits:', error.message);
//             throw error;
//         }
//     },
//
//     countUniqueAuthors(commits) {
//         const uniqueAuthors = new Set();
//         commits.forEach(commit => {
//             uniqueAuthors.add(commit.author.name);
//         });
//         return uniqueAuthors.size;
//     },
//     findMostRecentCommit(commits) {
//         let mostRecentCommit = null;
//         commits.forEach(commit => {
//             const commitDate = new Date(commit.author.date);
//             if (!mostRecentCommit || commitDate > new Date(mostRecentCommit.author.date)) {
//                 mostRecentCommit = commit;
//             }
//         });
//         return mostRecentCommit;
//     },
//
//     // processCommits(rawCommits) {
//     //     // Initialize an object to store processed data
//     //     const processedData = {
//     //         labels: [], // X-axis labels (dates)
//     //         datasets: [] // Data series for each user
//     //     };
//     //
//     //     // Create a map to store commit counts for each user and date
//     //     const commitCounts = new Map();
//     //
//     //     // Process each commit in the raw data
//     //     rawCommits.forEach(commit => {
//     //         const commitDate = new Date(commit.commit.author.date);
//     //         const dateString = commitDate.toISOString().split('T')[0]; // Extracting YYYY-MM-DD
//     //
//     //         // Initialize count for the user and date if not present
//     //         if (!commitCounts.has(commit.author.login)) {
//     //             commitCounts.set(commit.author.login, {});
//     //         }
//     //         if (!commitCounts.get(commit.author.login)[dateString]) {
//     //             commitCounts.get(commit.author.login)[dateString] = 0;
//     //         }
//     //
//     //         // Increment the commit count for the user and date
//     //         commitCounts.get(commit.author.login)[dateString]++;
//     //
//     //         // Add the date to labels if not already present
//     //         if (!processedData.labels.includes(dateString)) {
//     //             processedData.labels.push(dateString);
//     //         }
//     //     });
//     //
//     //     // Create a dataset for each user
//     //     commitCounts.forEach((userCommits, user) => {
//     //         const dataset = {
//     //             label: user,
//     //             data: processedData.labels.map(date => userCommits[date] || 0) // Fill in commit counts, defaulting to 0
//     //         };
//     //         processedData.datasets.push(dataset);
//     //     });
//     //
//     //     return processedData;
//     // },
//     //
//     // //Aggregate the commit data by a time period
//     // aggregateCommitData(rawCommits, timeFilter) {
//     //     // Define a mapping of time filters to corresponding date intervals
//     //     const dateIntervals = {
//     //         'Lifetime': 'all',
//     //         'Last Year': 365,
//     //         'Last Month': 30,
//     //         'Last Week': 7
//     //     };
//     //
//     //     // Get the date interval based on the specified time filter
//     //     const intervalDays = dateIntervals[timeFilter] || 365; // Default to Last Year if filter is not recognized
//     //
//     //     // Calculate the cutoff date for the specified interval
//     //     const cutoffDate = new Date();
//     //     cutoffDate.setDate(cutoffDate.getDate() - intervalDays);
//     //
//     //     // Initialize an object to store aggregated data
//     //     const aggregatedData = {
//     //         labels: [], // X-axis labels (date intervals)
//     //         datasets: [] // Data series for each user
//     //     };
//     //
//     //     // Create a map to store commit counts for each user and date interval
//     //     const commitCounts = new Map();
//     //
//     //     // Process each commit in the raw data
//     //     rawCommits.forEach(commit => {
//     //         const commitDate = new Date(commit.commit.author.date);
//     //
//     //         // Check if the commit is within the specified interval
//     //         if (commitDate >= cutoffDate) {
//     //             const intervalLabel = this.getIntervalLabel(commitDate, intervalDays);
//     //
//     //             // Initialize count for the user and interval if not present
//     //             if (!commitCounts.has(commit.author.login)) {
//     //                 commitCounts.set(commit.author.login, {});
//     //             }
//     //             if (!commitCounts.get(commit.author.login)[intervalLabel]) {
//     //                 commitCounts.get(commit.author.login)[intervalLabel] = 0;
//     //             }
//     //
//     //             // Increment the commit count for the user and interval
//     //             commitCounts.get(commit.author.login)[intervalLabel]++;
//     //
//     //             // Add the interval label to labels if not already present
//     //             if (!aggregatedData.labels.includes(intervalLabel)) {
//     //                 aggregatedData.labels.push(intervalLabel);
//     //             }
//     //         }
//     //     });
//     //
//     //     // Create a dataset for each user
//     //     commitCounts.forEach((userCommits, user) => {
//     //         const dataset = {
//     //             label: user,
//     //             data: aggregatedData.labels.map(interval => userCommits[interval] || 0) // Fill in commit counts, defaulting to 0
//     //         };
//     //         aggregatedData.datasets.push(dataset);
//     //     });
//     //
//     //     return aggregatedData;
//     // },
//     // Helper function to get the interval label based on the commit date
//     // getIntervalLabel(date, intervalDays) {
//     //     const intervalDate = new Date(date);
//     //     intervalDate.setHours(0, 0, 0, 0);
//     //     intervalDate.setDate(intervalDate.getDate() - (intervalDays - 1));
//     //     return intervalDate.toISOString().split('T')[0];
//     // },
//     // convertTime(timeString) {
//     //     const date = new Date(timeString);
//     //
//     //     return {
//     //         year: date.getFullYear(),
//     //         month: date.getMonth() + 1, // Months are zero-based, so add 1
//     //         week: this.getISOWeek(date),
//     //         day: date.getDate(),
//     //         hour: date.getUTCHours(),
//     //         minute: date.getUTCMinutes()
//     //     };
//     // },
// });




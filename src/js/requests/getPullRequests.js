// import {reactive} from "vue";
// import {Octokit} from "@octokit/rest";
//
// import testData from '../../assets/TestCommitData.json'
//
// const octokit = new Octokit({
//     // auth: process.env.AUTHENTICATION_TOKEN,
//     // auth : "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"
// });
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
//
//
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
// });
//
//
//

// import {reactive} from "vue";
// import {Octokit} from "@octokit/rest";
// import testData from '../../assets/TestCommitData.json'

import RequestUtils from "./requestUtils.js";

const REQUEST_DELAY_MS = 500; // Adjust the delay time as needed
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
        
        let i = 1;
        for await(const {data: commits} of iterator){
            let commitsArray = this.parseCommitsList(commits)
            //Concat with array
            commitData.push(commitsArray);
            console.log(`Commits List: Page ${i}`, commitsArray)
            i++;
            
            await RequestUtils.delay(REQUEST_DELAY_MS); // Adding delay between requests
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




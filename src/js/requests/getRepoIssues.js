﻿// import testData from "../../assets/TestIssuesData.json";

import RequestUtils from "./requestUtils.js";

const REQUEST_DELAY_MS = 500; // Adjust the delay time as needed
class GetRepoIssues{
    static async getIssues(owner, repo, usingTestData=false){
        // if(usingTestData){
        //     console.log("TEST ISSUES DATA");
        //     return testData;
        // }

        const iterator = await this.getIssuesIterator(owner, repo);
        // const iterator = await this.getIssuesIterator(owner, repo, this.paramsDefault(owner, repo));
        let issuesData = []
        //Iterate through issues
        console.log("Iterating through issues");

        let i = 1;
        
        for await(const {data: issues} of iterator){
            // console.log("Issues Log", issues);
            let issuesArray = this.parseIssuesList(issues);
            //Concat
            issuesData.push(issuesArray);
            console.log(`Issues List: Page ${i}`, issuesArray)
            i++;
            
            await RequestUtils.delay(REQUEST_DELAY_MS); // Adding delay between requests
        }

        return issuesData.flat();
    }


    static async getIssuesIterator(username, repo, params){
        console.log(`Handling getting issues for ${username}/${repo}`)
        try {
            // const queryString = `
            // repo:${username}/${repo}+
            // is:issue&
            // sort=created
            // `;
            //
            // console.log(`Using search query ${queryString}`)
            // //Iterator
            // return octokit.paginate.iterator('GET /search/issues', {
            //     q: queryString,
            //     headers: {
            //         "X-GitHub-Api-Version": "2022-11-28",
            //     }
            // });

            return RequestUtils.octokit.paginate.iterator('GET /repos/{owner}/{repo}/issues', {
                owner: username,
                repo: repo,
                per_page: 100,

                //Return all issues, so that we can aggregate which are open at any given time
                state: 'all',

                headers: {
                    "X-GitHub-Api-Version": "2022-11-28",
                }
            });
            // type: 'issue', //TRY
        } catch (error) {
            console.error('Error fetching issues:', error.message);
            throw error;
        }
    }
    
    static parseIssuesList(data) {
        // let simplified = data
        //     .filter(item => !item.pull_request) // Filter out items with pull_request
        //     .map(item => this.parseIssue(item));

        let simplified = data.map(item => this.parseIssue(item));
        // LOG
        // console.log(simplified);
        return simplified;
    }
    static parseIssue(issueData){
        //WILL ADD MORE LATER
        let pull_request_value = null;
        try{
            pull_request_value = issueData.pull_request;
        } catch (e){
            console.log(`Could not get pull_request key for issue #${issueData.number}`)
            pull_request_value = null;
        }

        return {
            node_id : issueData.node_id,
            number : issueData.number,

            state : issueData.state,
            title : issueData.title,
            body : issueData.body,
            locked : issueData.locked,

            user : issueData.user,
            closed_at : issueData.closed_at,
            created_at : issueData.created_at,
            updated_at : issueData.updated_at,
            closed_by : issueData.closed_by,

            pull_request : pull_request_value
        }
    }
    static paramsDefault(username, repo) {
        return {
            owner: username,
            repo: repo,
            per_page: 100,

            //Return all issues, so that we can aggregate which are open at any given time
            state: 'all',
            type: 'issue', //TRY

            headers: {
                "X-GitHub-Api-Version": "2022-11-28",
            }
        }
    }

    static countUniqueAuthors(dataArray) {
        const uniqueAuthors = new Set();
        dataArray.forEach(commit => {
            uniqueAuthors.add(commit.author.name);
        });
        return uniqueAuthors.size;
    }
    static findMostRecent(dataArray) {
        let mostRecent = null;
        dataArray.forEach(item => {
            const itemDate = new Date(item.author.date);
            if (!mostRecent || itemDate > new Date(mostRecent.author.date)) {
                mostRecent = item;
            }
        });
        return mostRecent;
    }
}
export default GetRepoIssues;




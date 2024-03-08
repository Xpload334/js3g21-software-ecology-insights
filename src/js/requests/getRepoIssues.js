import {reactive} from "vue";
import {Octokit} from "@octokit/rest";
import testData from "../../assets/TestIssuesData.json";

const octokit = new Octokit({
    // auth: process.env.AUTHENTICATION_TOKEN,
    auth : "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"
});
export const getIssuesReactive = reactive({
    async getIssues(owner, repo, usingTestData=false){
        if(usingTestData){
            console.log("TEST ISSUES DATA");
            return testData;
        }
        
        
        const iterator = await this.getIssuesIterator(owner, repo, this.paramsDefault(owner, repo));
        let issuesData = []
        //Iterate through issues
        console.log("Iterating through issues");
        
        for await(const {data: issues} of iterator){
            let issuesArray = this.parseIssuesList(issues);
            //Concat
            issuesData.push(issuesArray);
        }
        return issuesData.flat();
    },
    
    
    
    parseIssuesList(data){
        let simplified = data.map((item) => (this.parseIssue(item)));

        // //LOG
        // console.log(simplified);
        return simplified;
    },
    parseIssue(issueData){
        //WILL ADD MORE LATER
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
            closed_by : issueData.closed_by
        }
    },

    async getIssuesIterator(username, repo, params){
        console.log(`Handling getting issues for ${username}/${repo}`)
        try {
            //Iterator
            return octokit.paginate.iterator('GET /repos/{owner}/{repo}/issues', params);
        } catch (error) {
            console.error('Error fetching issues:', error.message);
            throw error;
        }
    },
    
    
    paramsDefault(username, repo) {
        return {
            owner: username,
            repo: repo,
            per_page: 100,
            
            //Return all issues, so that we can aggregate which are open at any given time
            state: 'all',
            
            headers: {
                "X-GitHub-Api-Version": "2022-11-28",
            }
        }
    },

    countUniqueAuthors(dataArray) {
        const uniqueAuthors = new Set();
        dataArray.forEach(commit => {
            uniqueAuthors.add(commit.author.name);
        });
        return uniqueAuthors.size;
    },
    findMostRecent(dataArray) {
        let mostRecent = null;
        dataArray.forEach(item => {
            const itemDate = new Date(item.author.date);
            if (!mostRecent || itemDate > new Date(mostRecent.author.date)) {
                mostRecent = item;
            }
        });
        return mostRecent;
    },
});




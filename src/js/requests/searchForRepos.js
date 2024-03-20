import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
    // auth: process.env.AUTHENTICATION_TOKEN,
});
const ITEMS_PER_PAGE = 30;
const SORTING_TYPE = "full_name"

export const searchRepos = {
    async getReposPages(owner, searchTypeIndex=0){
        let iterator = null;
        console.log("Search Type Index", searchTypeIndex)
        
        
        if(searchTypeIndex === 0){
            iterator = await this.getSearchIterator(owner);
        } else if(searchTypeIndex === 1){
            iterator = await this.getSearchIteratorOrgs(owner);
        } else {
            throw new Error("Invalid search type");
        }
        
        let reposData = []
        //Iterate through responses
        console.log("Iterating through repos")
        try{
            for await(const {data: repos} of iterator){
                // console.log("REPOS", repos);

                let list = this.parseRepoList(repos)
                //Concat with array
                reposData.push(list);
            }
        } catch (e) {
            throw new Error("Failed to parse repos");
        }
        
        return reposData;
    },

    parseRepoList(data) {
        // console.log("Parsing response", data);
        const repoDetails = data.map((repo) => ({
            owner: repo.owner.login,
            name: repo.name,
            full_name: repo.full_name,
            description: repo.description,
            url: repo.url,
            html_url: repo.html_url,

            created_at: repo.created_at,
            updated_at : repo.updated_at,
            topics : repo.topics,
            private : repo.private,
            // Add more details as needed
        }));
        
        return repoDetails;
    },

    async getSearchIterator(username){
        console.log(`Getting repos for ${username}`)
        try {
            //Iterator
            return octokit.paginate.iterator('GET /users/{username}/repos', {
                username: username,
                per_page: ITEMS_PER_PAGE,
                sort : SORTING_TYPE,
                headers: {
                    "X-GitHub-Api-Version": "2022-11-28",
                },
            });
        } catch (error) {
            console.error('Error fetching repos:', error.message);
            throw error;
        }
    },

    async getSearchIteratorOrgs(orgName){
        console.log(`Handling getting commits for organisation ${orgName}`)
        try {
            //Iterator
            return octokit.paginate.iterator('GET /orgs/{org}/repos', {
                org: orgName,
                per_page: ITEMS_PER_PAGE,
                sort : SORTING_TYPE,
                headers: {
                    "X-GitHub-Api-Version": "2022-11-28",
                },
            });
        } catch (error) {
            console.error('Error fetching repos:', error.message);
            throw error;
        }
    },
};
// import { Octokit } from "@octokit/rest";
import RequestUtils from "./requestUtils.js";

// const octokit = new Octokit({
//     // auth: process.env.AUTHENTICATION_TOKEN,
// });
const ITEMS_PER_PAGE = 30;
const SORTING_TYPE = "full_name"

class SearchForRepos{
    static async getReposPages(owner, searchTypeIndex=0){
        let iterator = null;
        console.log("Search Type Index", searchTypeIndex)
        
        try{
            if(searchTypeIndex === 0){
                iterator = await this.getSearchIterator(owner);
            } else if(searchTypeIndex === 1){
                iterator = await this.getSearchIteratorOrgs(owner);
            } else {
                return new Error("Invalid search type");
            }
            
            // console.log("Has iterator");
        } catch (e){
            throw e;
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
            console.error(e.stack)
            throw e;
        }

        return reposData;
    }

    static parseRepoList(data) {
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
    }

    static async getSearchIterator(username){
        console.log(`Getting repos for ${username}`)
        try {
            //Iterator
            return RequestUtils.octokit.paginate.iterator('GET /users/{username}/repos', {
                username: username,
                per_page: ITEMS_PER_PAGE,
                sort : SORTING_TYPE,
                headers: {
                    "X-GitHub-Api-Version": "2022-11-28",
                },
            });
        } catch (error) {
            console.error('Error fetching repos:', error.stack);
            throw error;
        }
    }
    static async getSearchIteratorOrgs(orgName){
        console.log(`Handling getting commits for organisation ${orgName}`)
        try {
            //Iterator
            return RequestUtils.octokit.paginate.iterator('GET /orgs/{org}/repos', {
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
    }
}
export default SearchForRepos;


// export const searchRepos = {
// };
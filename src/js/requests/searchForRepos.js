import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
    // auth: process.env.AUTHENTICATION_TOKEN,
});
const ITEMS_PER_PAGE = 30;

export const searchRepos = {
    // async listReposForUser(username, pageNum) {
    //     console.log(`Getting repos for ${username}, #${pageNum}`);
    //     try {
    //         const response = await octokit.repos.listForUser({
    //             username: username,
    //             page: pageNum,
    //             per_page: ITEMS_PER_PAGE,
    //         });
    //         // storeMain.owner = username;
    //
    //         return this.parseReposList(response);
    //     } catch (error) {
    //         console.error("Error fetching", error);
    //     }
    // },
    
    async getReposPages(owner){
        const iterator = await this.getSearchIterator(owner);
        // let reposData = {
        //     link : {},
        //     repos : []
        // }
        let reposData = []
        // let hasLink = false;
        //Iterate through responses
        console.log("Iterating through repos")
        for await(const {data: repos} of iterator){
            // console.log("REPOS", repos);
            
            let list = this.parseRepoList(repos)
            //Concat with array
            reposData.push(list);
            
            // if(!hasLink){
            //     reposData.link = repos.headers.link
            //     hasLink = true;
            // }
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
            // Add more details as needed
        }));
        
        return repoDetails;

        // const numPages = this.extractTotalPages(response.headers.link);
        // const totalPages = numPages || 10; // Default value, adjust as needed
        //
        // return {
        //     totalPages: totalPages,
        //     itemsPerPage: ITEMS_PER_PAGE,
        //     link: response.headers.link,
        //     repos: repoDetails,
        // };
    },
    
    // parseReposList(response) {
    //     console.log("Parsing response", response.data);
    //     const repoDetails = response.data.map((repo) => ({
    //         owner: repo.owner.login,
    //         name: repo.name,
    //         full_name: repo.full_name,
    //         description: repo.description,
    //         url: repo.url,
    //         html_url: repo.html_url,
    //        
    //         created_at: repo.created_at,
    //         updated_at : repo.updated_at,
    //         topics : repo.topics,
    //         // Add more details as needed
    //     }));
    //
    //     const numPages = this.extractTotalPages(response.headers.link);
    //     const totalPages = numPages || 10; // Default value, adjust as needed
    //    
    //     return {
    //         totalPages: totalPages,
    //         itemsPerPage: ITEMS_PER_PAGE,
    //         link: response.headers.link,
    //         repos: repoDetails,
    //     };
    // },
    //
    // extractTotalPages(linkHeader) {
    //     const links = linkHeader.split(', ');
    //
    //     for (const link of links) {
    //         const [url, rel] = link.split('; ');
    //
    //         if (rel.includes('last')) {
    //             const match = url.match(/page=(\d+)&per_page=\d+/);
    //             if (match) {
    //                 return parseInt(match[1]);
    //             }
    //         }
    //     }
    //
    //     return null;
    // },

    async getSearchIterator(username){
        console.log(`Getting repos for ${username}`)
        try {
            //Iterator
            return octokit.paginate.iterator('GET /users/{username}/repos', {
                username: username,
                per_page: ITEMS_PER_PAGE,
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
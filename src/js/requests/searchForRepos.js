import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
    // auth: process.env.AUTHENTICATION_TOKEN,
});
const ITEMS_PER_PAGE = 30;

export const searchRepos = {
    async listReposForUser(username, pageNum) {
        console.log(`Getting repos for ${username}, #${pageNum}`);
        try {
            const response = await octokit.repos.listForUser({
                username: username,
                page: pageNum,
                per_page: ITEMS_PER_PAGE,
            });
            // storeMain.owner = username;

            return this.parseReposList(response);
        } catch (error) {
            console.error("Error fetching", error);
        }
    },

    parseReposList(response) {
        console.log("Parsing response", response.data);
        const repoDetails = response.data.map((repo) => ({
            owner: repo.owner.login,
            name: repo.name,
            full_name: repo.full_name,
            description: repo.description,
            url: repo.url,
            html_url: repo.html_url,
            created_at: repo.created_at,
            // Add more details as needed
        }));

        const numPages = this.extractTotalPages(response.headers.link);
        const totalPages = numPages || 10; // Default value, adjust as needed

        // storeMain.handleRepos({
        //     repos: repoDetails,
        //     itemsPerPage: ITEMS_PER_PAGE,
        //     totalPages: totalPages,
        // });

        return {
            totalPages: totalPages,
            itemsPerPage: ITEMS_PER_PAGE,
            link: response.headers.link,
            repos: repoDetails,
        };
    },

    extractTotalPages(linkHeader) {
        const links = linkHeader.split(', ');

        for (const link of links) {
            const [url, rel] = link.split('; ');

            if (rel.includes('last')) {
                const match = url.match(/page=(\d+)&per_page=\d+/);
                if (match) {
                    return parseInt(match[1]);
                }
            }
        }

        return null;
    },
};



// import {reactive} from "vue";
// import {Octokit} from "@octokit/rest";
//
//
// const octokit = new Octokit({
//     // auth: process.env.AUTHENTICATION_TOKEN,
// });
// const ITEMS_PER_PAGE = 30
//
//
// export const searchReposReactive = reactive({
//     async listReposForUser(ownerName, pageNum){
//         console.log(`Getting repos for ${ownerName}, #${pageNum}`)
//         try {
//             const response = await octokit.repos.listForUser({
//                 username: ownerName,
//                 page: pageNum,
//                 per_page: ITEMS_PER_PAGE,
//             });
//             // console.log("Response from octokit received");
//             storeMain.owner = ownerName;
//
//             return this.parseReposList(response)
//         } catch (error) {
//             // Handle errors
//             console.log("Error fetching", error);
//             // Utils.logError(`Error fetching repositories: ${error.message}`);
//         }
//     },
//    
//     parseReposList(response) {
//         console.log("Parsing response", response.data)
//         const repoDetails = response.data.map((repo) => ({
//             owner: repo.owner.login,
//             name: repo.name,
//             full_name: repo.full_name,
//             description: repo.description,
//             url: repo.url,
//             html_url: repo.html_url,
//             created_at: repo.created_at,
//             // Add more details as needed
//         }));
//        
//         // Extract pagination information from the headers
//         console.log("Link header", response.headers.link)
//         const linkHeader = response.headers.link;
//         // const parsed = this.linkParser(linkHeader);
//         const numPages = this.extractTotalPages(linkHeader);
//
//         return {
//             totalPages: numPages,
//             itemsPerPage: ITEMS_PER_PAGE,
//             link: linkHeader,
//             repos: repoDetails
//         };
//     },
//
//     // Helper function to extract total pages from link header
//     extractTotalPages(linkHeader) {
//         const links = linkHeader.split(', ');
//
//         for (const link of links) {
//             const [url, rel] = link.split('; ');
//
//             if (rel.includes('last')) {
//                 const match = url.match(/page=(\d+)&per_page=\d+/);
//                 if (match) {
//                     return parseInt(match[1]);
//                 }
//             }
//         }
//
//         return null; // Return null if 'last' is not found
//     },
// });
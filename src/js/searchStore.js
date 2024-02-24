import {reactive} from "vue";
import {Octokit} from "@octokit/rest";
import {storeMain} from "./storeMain.js";
// import vitePluginRequire from "vite-plugin-require";
// const parseLinkHeader = require('parse-link-header');


const octokit = new Octokit({
    // auth: process.env.AUTHENTICATION_TOKEN,
});
const ITEMS_PER_PAGE = 30


export const searchReposReactive = reactive({
    //Search Results
    // hasSearchData: false,
    // searchResults : [],
    // currentDisplay : {},
    // currentResults : [],

    //Page
    // currentPage: 1,
    // itemsPerPage: 30,
    // totalPages: 10,
    
    async listReposForUser(ownerName, pageNum){
        console.log(`Getting repos for ${ownerName}, #${pageNum}`)
        try {
            const response = await octokit.repos.listForUser({
                username: ownerName,
                page: pageNum,
                per_page: ITEMS_PER_PAGE,
            });
            // console.log("Response from octokit received");
            storeMain.owner = ownerName;

            return this.parseReposList(response)
        } catch (error) {
            // Handle errors
            console.log("Error fetching", error);
            // Utils.logError(`Error fetching repositories: ${error.message}`);
        }
        // try{
        //     octokit.repos.listForUser({
        //         username: ownerName,
        //         page: pageNum,
        //         per_page: ITEMS_PER_PAGE,
        //     })
        //         .then(({data}) => {
        //             return this.parseReposList(data);
        //         })
        // } catch(error){
        //     console.error(`Error getting repos for ${ownerName}`)
        //     return null;
        // }
        
    },
    
    parseReposList(response) {
        console.log("Parsing response", response.data)
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
        
        // Extract pagination information from the headers
        console.log("Link header", response.headers.link)
        const linkHeader = response.headers.link;
        // const parsed = this.linkParser(linkHeader);
        const numPages = this.extractTotalPages(linkHeader);

        return {
            totalPages: numPages,
            itemsPerPage: ITEMS_PER_PAGE,
            link: linkHeader,
            repos: repoDetails
        };
    },

    // Helper function to extract total pages from link header
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

        return null; // Return null if 'last' is not found
    },
});
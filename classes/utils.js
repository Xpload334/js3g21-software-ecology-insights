const {Octokit} = require('@octokit/rest');
const parseLinkHeader = require('parse-link-header')

class Utils {
    static request = require("request");
    static axios = require('axios');

    static octokit = new Octokit({
        auth: process.env.AUTHENTICATION_TOKEN,
    });
    static BACKEND_ENDPOINT;
    static consoleSockets = [];
    static port = 0;
    
    /*
    According to the GitHub API docs, only 30 items are sent per page.
     */
    static parseLinkHeader = require('parse-link-header')
    static ITEMS_PER_PAGE = 30
    

    static init(authToken) {
        // Utils.octokit = new Octokit();
        console.log(`Auth token set to ${authToken}`)
        Utils.octokit = new Octokit({
            auth: authToken,
            // request: {
            //     // Wait for the promise to resolve and use the fetch function
            //     fetch: async () => (await nodeFetchPromise).default,
            // },
        });
    }

    ///////////////////////////////////
    static logError(socket, message, halt) {
        Utils.log(socket.id, message);
        // console.error(message);
        
        socket.emit("fail", message);
        if (halt) {
            socket.disconnect();
        }
    }

    static log(socketID, message = ``) {
        let logMessage = `[${this.currentTime()}] [${socketID}] ${message}`;
        console.log(logMessage);
        this.sendLogMessage(logMessage)
    }

    static sendLogMessage(logMessage) {
        this.consoleSockets.forEach(socket => {
            socket.emit('log', logMessage);
        });
    }

    static currentTime() {
        let d = new Date();
        let curr_hour = d.getHours();
        let curr_min = d.getMinutes();

        let curr_sec = d.getSeconds();
        let curr_millis = d.getMilliseconds();

        return (curr_hour + ":" + curr_min + ":" + curr_sec + ":" + curr_millis);
    }

    static logSuccess(socket, message, halt) {
        // console.log(`Success: ${message}`);
        socket.emit("success", message);
        if (halt) {
            socket.disconnect();
        }
    }

    ////////////////////////////
    //Requests
    /*
    Commit history
  
    {'owner' : exampleuser, 'repo' : examplename}
    */
    // static getCommitHistory(socket, owner, repo) {
    //     Utils.log(socket.id, `Getting commit history: GET /repos/${owner}/${repo}`);
    //
    //     return new Promise((resolve, reject) => {
    //         try {
    //             const response = Utils.octokit.request('GET /repos/{owner}/{repo}/stats/participation', {
    //                 owner: 'OWNER',
    //                 repo: 'REPO',
    //                 headers: {
    //                     'X-GitHub-Api-Version': '2022-11-28'
    //                 }
    //             })
    //
    //             resolve(response);
    //         } catch (error) {
    //             Utils.logError(socket, `Error getting commit history: ${error.message}`);
    //             reject({
    //                 result: false,
    //                 msg: error.message,
    //             });
    //         }
    //     });
    // }
    
    /*
    Get repo statistics
     */
    static getRepoStatistics(socket, owner, repo) {
        Utils.log(socket.id, `Getting stats: GET /repos/${owner}/${repo}`);
        return new Promise((resolve, reject) => {
            Utils.octokit.repos
                .get({owner, repo})
                .then((response) => {
                    const statistics = response.data;

                    // Resolve the Promise with the statistics
                    resolve(statistics);
                })
                .catch((error) => {
                    // Handle errors and reject the Promise
                    reject(error);
                });
        });
    }
    
    /*
    Get the repo list for a given username
    
    sort <PROPERTY>
    since <TIMESTAMP>
    per_page <N Results Per Page>
    page <Page Number>
     */
    static async listReposForUser(socket, ownerName, pageNum) {
        try {
            const response = await Utils.octokit.repos.listForUser({
                username: ownerName,
                page: pageNum,
                per_page: Utils.ITEMS_PER_PAGE,
            });

            return Utils.parseReposList(response)
        } catch (error) {
            // Handle errors
            console.log("Error fetching", error);
            Utils.logError(socket, `Error fetching repositories: ${error.message}`);
        }
    }
    
    static parseReposList(response){
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
        const linkHeader = response.headers.link;
        const parsed = Utils.parseLinkHeader(linkHeader);
        const numPages = Utils.extractTotalPages(linkHeader);

        return {
            totalPages: numPages,
            itemsPerPage: Utils.ITEMS_PER_PAGE,
            link: parsed,
            repos: repoDetails
        };
    }
    

    static async getContributors(socket, contributorsUrl) {
        try {
            // Make a GET request to the contributors URL
            return await Utils.axios.get(contributorsUrl);
        } catch (error) {
            Utils.logError(socket, `Error fetching contributors: ${error.message}`)
        }
    }
    
    /*
    Get all contributor commit activity
    
    Returns 0 values for all add/delete counts in repos with 10,000 or more commits
     */
    static allContributorCommits(socket, ownerName = "", repoName = "") {
        return new Promise((resolve, reject) => {
            Utils.octokit.request('GET /repos/{owner}/{repo}/stats/contributors', {
                owner: ownerName,
                repo: repoName,
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28'
                }
            })
                .then((response) => {
                    /*
                    w - Start of the week, given as a Unix timestamp.
                    a - Number of additions
                    d - Number of deletions
                    c - Number of commits
                     */
                    resolve(response.data);
                })
                .catch((error) => {
                    // Handle errors and reject the Promise
                    reject(error);
                });
        });
    }
    
    /*
    
     */
    static async getCommitsIterator(username, repo){
        console.log(`Handling getting commits for ${username}/${repo}`)
        try {
            //Iterator
            return Utils.octokit.paginate.iterator('GET /repos/{owner}/{repo}/commits', {
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

    /*
    Get README
     */
    async getRepoReadme(owner, repo) {
        try {
            const response = await Utils.octokit.repos.getReadme({
                owner: owner,
                repo: repo,
            });

            const readmeContent = Buffer.from(response.data.content, 'base64').toString();

            // Extract cited publications (custom logic required)
            const citedPublications = Utils.extractCitedPublicationsFromReadme(readmeContent);

            Utils.log(Utils.port, 'Readme Content:', readmeContent);
            Utils.log(Utils.port, 'Cited Publications:', citedPublications);
        } catch (error) {
            Utils.logError(Utils.port, 'Error getting repo readme:', error.message);
        }
    }
    
    

    static extractCitedPublicationsFromReadme(readmeContent) {
        Utils.log(Utils.port, "(Unimplemented)");
        return readmeContent;
    }
    
    static hasExactKeys(obj, keysToCheck = [""]) {
        const objKeys = Object.keys(obj);
        Utils.log("", objKeys);
        if (objKeys.length !== keysToCheck.length) {
            return false;
        }

        for (let i = 0; i < keysToCheck.length; i++) {
            const key = keysToCheck[i];
            if (!obj.hasOwnProperty(key)) {
                return false;
            }
        }

        return true;
    }
    // static async octokitPaginate(url, paramsObj, page = 1) {
    //     console.log(`Connecting to API: ${url} \n Params = ${JSON.stringify(paramsObj)}`)
    //
    //     // Add the page number to the paramsObj
    //     paramsObj.page = page;
    //
    //     return new Promise(async (resolve, reject) => {
    //         try {
    //             const response = await Utils.octokit.request(url, paramsObj);
    //             const data = response.data || [];
    //
    //             // Check if there are more pages
    //             if (Utils.hasPagination(response)) {
    //                 // Recursively fetch the next page
    //                 const nextPage = await Utils.octokitPaginate(url, paramsObj, page + 1);
    //                 // Concatenate current and next page data
    //                 resolve(data.concat(nextPage));
    //             } else {
    //                 // Resolve with the final data
    //                 resolve(data);
    //             }
    //         } catch (error) {
    //             // Handle errors and reject the Promise
    //             reject(error);
    //         }
    //     });
    // }
    // // Helper function to check if there are more pages
    // static hasPagination(response) {
    //     const linkHeader = response.headers.link;
    //     return linkHeader && linkHeader.includes('rel="next"');
    // }

    /*
    The getPaginatedData function makes a request to an endpoint with octokit.request().
     The data from the response is processed by parseData, which handles cases where
      no data is returned or cases where the data that is returned is an object
       instead of an array. The processed data is then appended to a list that
        contains all of the paginated data collected so far. 
        If the response includes a link header and if the link header includes a
         link for the next page, then the function uses a RegEx pattern (nextPattern)
          to get the URL for the next page. The function then repeats the previous steps,
           now using this new URL. Once the link header no longer includes a link to 
           the next page, all of the results are returned.
           https://docs.github.com/en/rest/using-the-rest-api/using-pagination-in-the-rest-api?apiVersion=2022-11-28
     */
    static async getPaginatedData(url) {
        const nextPattern = /(?<=<)([\S]*)(?=>; rel="Next")/i;
        let pagesRemaining = true;
        let data = [];

        while (pagesRemaining) {
            const response = await Utils.octokit.request(`GET ${url}`, {
                per_page: 100,
                headers: {
                    "X-GitHub-Api-Version":
                        "2022-11-28",
                },
            });

            const parsedData = Utils.parseData(response.data)
            data = [...data, ...parsedData];

            const linkHeader = response.headers.link;

            pagesRemaining = linkHeader && linkHeader.includes(`rel=\"next\"`);

            if (pagesRemaining) {
                url = linkHeader.match(nextPattern)[0];
            }
        }

        return data;
    }
    static parseData(data) {
        // If the data is an array, return that
        if (Array.isArray(data)) {
            return data
        }

        // Some endpoints respond with 204 No Content instead of empty array
        //   when there is no data. In that case, return an empty array.
        if (!data) {
            return []
        }

        // Otherwise, the array of items that we want is in an object
        // Delete keys that don't include the array of items
        delete data.incomplete_results;
        delete data.repository_selection;
        delete data.total_count;
        // Pull out the array of items
        const namespaceKey = Object.keys(data)[0];
        data = data[namespaceKey];

        return data;
    }
    
    // Helper function to extract total pages from link header
    static extractTotalPages(linkHeader) {
        const parsed = Utils.parseLinkHeader(linkHeader)
        console.log(parsed);
        
        try{
            return parsed.last.page;
        } catch (e){
            console.error(`Error with num pages: ${e}`);
            return 69;
        }
        //
        // const match = linkHeader.match(/&page=(\d+)>; rel="last"/);
        // return match ? parseInt(match[1]) : null;
    }

}

module.exports = Utils;

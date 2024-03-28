// class SearchQueries{
//     async searchRepositories(tags=[], searchIn="name", sort="", order="desc", pageNum=1){
//         console.log(`Executing search for repositories:`, query)
//
//         let query = new Query(tags, searchIn);
//
//         try{
//             const response = await octokit.request('GET /search/repositories', {
//                 q : query.toString(),
//                 headers: {
//                     'X-GitHub-Api-Version': '2022-11-28'
//                 }
//             });
//
//             return this.parseReposList(response.i);
//         } catch(error) {
//             console.error("Error fetching", error);
//         }
//     },
//    
//    
//     async getSearchIterator(username){
//         console.log(`Getting repos for ${username}`)
//         try {
//             //Iterator
//             return octokit.paginate.iterator('GET /users/{username}/repos', {
//                 owner: username,
//                 per_page: 100,
//                 headers: {
//                     "X-GitHub-Api-Version": "2022-11-28",
//                 },
//             });
//         } catch (error) {
//             console.error('Error fetching repos:', error.message);
//             throw error;
//         }
//     },
//
//     parseSearchResults(response){
//         console.log("Parsing response", response.data.items);
//         const repoDetails = response.data.map((repo) => ({
//             owner: repo.owner.login,
//             name: repo.name,
//             full_name: repo.full_name,
//             description: repo.description,
//             url: repo.url,
//             html_url: repo.html_url,
//
//             created_at: repo.created_at,
//             updated_at : repo.updated_at,
//             topics : repo.topics,
//             // Add more details as needed
//         }));
//
//         const numPages = this.extractTotalPages(response.headers.link);
//         const totalPages = numPages || 10; // Default value, adjust as needed
//
//         return {
//             totalPages: totalPages,
//             itemsPerPage: ITEMS_PER_PAGE,
//             link: response.headers.link,
//             repos: repoDetails,
//         };
//     },
//    
// }
//

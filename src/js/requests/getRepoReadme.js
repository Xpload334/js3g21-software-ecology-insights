import RequestUtils from "./requestUtils.js";
// import testData from "../../assets/Test_Readme.json"

class GetRepoReadme{
    static async getRepoPublications(owner, repo, USING_TEST_DATA=false) {
        let data;
        if(USING_TEST_DATA){
            // data = testData;
        } else {
            const response = await this.requestRepoReadme(owner, repo);
            console.log("README Content", response.data);
            data = response.data;
        }
        
        const downloadLink = data.download_url;
        const readmeResponse = await fetch(downloadLink);
        
        const readmeContent = await readmeResponse.text();
        const links = this.getAllLinks(readmeContent);
        console.log("All Links", links);
        return links;
    }

    static async requestRepoReadme(owner, repo, branch="master") {
        console.log(`Getting readme: GET /repos/${owner}/${repo}/readme`);
        const response = await RequestUtils.octokit.request('GET /repos/{owner}/{repo}/readme', {
            owner: owner,
            repo: repo,
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        });
        return response;
        // try{
        //    
        // } catch (e) {
        //    
        // }
        
        // let apiUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/README.md`
        //
        // try{
        //     const response = await fetch(apiUrl);
        //     if(response.ok){
        //         return response;
        //     }
        // } catch(e){
        //     console.error(e);
        // }
    }

    static getAllLinks(readmeContent) {
        try {
            // Regular expression to match DOI, ISBN numbers, Markdown-style links, and HTML <a> tags
            const doiRegex = /\b(10\.\d{4,}(?:\.\d+)*\/\S+(?:(?!["&\'<>])\S))\b/g;
            const isbnRegex = /\b(?:ISBN(?:: ?| ))?((?:\d[\d\- ]{8,}\d|[\d\- ]{13,}[\dxX])\b)/g;
            const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
            // const htmlLinkRegex = /<a\s+(?:[^>]*?\s+)?href="([^"]*)"[^>]*>(.*?)<\/a>/g;

            // Extract DOI links and ISBN numbers
            const dois = readmeContent.match(doiRegex) || [];
            const isbns = readmeContent.match(isbnRegex) || [];

            // Extract Markdown-style links
            const markdownLinks = [...readmeContent.matchAll(markdownLinkRegex)].map(match => match[2]);

            // Extract HTML <a> tags
            // const htmlLinks = [...readmeContent.matchAll(htmlLinkRegex)].map(match => match[1]);

            // Filter out links that do not start with "http"
            const filteredLinks = [...dois, ...isbns, ...markdownLinks].filter(link => link.startsWith("http"));

            // Return the list of filtered links
            return filteredLinks;
        } catch (error) {
            console.error('Error fetching links:', error.message);
            throw error;
            // return [];
        }
    }


    // static getCitedPublications(readmeContent) {
    //     try {
    //         // Decode the base64 encoded content of the README file
    //         // const readmeContent = Buffer.from(readme.content, 'base64').toString('utf-8');
    //         const decodedContent = typeof window !== 'undefined' ? atob(readmeContent) : readmeContent;
    //
    //
    //         // Regular expression to match DOI and ISBN numbers
    //         const doiRegex = /\b(10\.\d{4,}(?:\.\d+)*\/\S+(?:(?!["&\'<>])\S))\b/g;
    //         const isbnRegex = /\b(?:ISBN(?:: ?| ))?((?:\d[\d\- ]{8,}\d|[\d\- ]{13,}[\dxX])\b)/g;
    //
    //         // Extract DOI links and ISBN numbers from the README content
    //         const dois = decodedContent.match(doiRegex) || [];
    //         const isbns = decodedContent.match(isbnRegex) || [];
    //
    //         // Combine and return the list of links
    //         const citedPublications = [...dois, ...isbns];
    //         return citedPublications;
    //     } catch (error) {
    //         console.error('Error fetching repository content:', error.message);
    //         return [];
    //     }
    // }
    //
    // static getHyperlinks(markdownContent) {
    //     try {
    //         // Regular expression to match Markdown-style links and HTML <a> tags
    //         const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    //         const htmlLinkRegex = /<a\s+(?:[^>]*?\s+)?href="([^"]*)"[^>]*>(.*?)<\/a>/g;
    //
    //         // Extract Markdown-style links
    //         const markdownLinks = [...markdownContent.matchAll(markdownLinkRegex)].map(match => match[2]);
    //
    //         // Extract HTML <a> tags
    //         const htmlLinks = [...markdownContent.matchAll(htmlLinkRegex)].map(match => match[1]);
    //
    //         // Combine and return the list of hyperlinks
    //         const hyperlinks = [...markdownLinks, ...htmlLinks];
    //         return hyperlinks;
    //     } catch (error) {
    //         console.error('Error fetching hyperlinks:', error.message);
    //         return [];
    //     }
    // }

}
export default GetRepoReadme



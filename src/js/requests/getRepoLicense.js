import RequestUtils from "./requestUtils.js";
// import testData from "../../assets/Test_License_Data.json"


class GetRepoLicense{
    static async getRepoLicense(owner, repo, usingTestData=false){
        // if(usingTestData){
        //     console.log("TEST LICENSE DATA");
        //     return testData;
        // }

        //Get which license
        const response = await this.requestRepoLicense(owner, repo);
        const data = response.data;
        
        //Get license details
        const licenseKey = data.license.key;
        const licenseRequestResponse = await this.requestLicenseDetails(licenseKey);
        
        return licenseRequestResponse.data;
    }
    
    static async getRepoLicenseFromKey(licenseKey, usingTestData=false){
        if(usingTestData){
            console.log("TEST LICENSE DATA");
            return testData;
        }
        const licenseRequestResponse = await this.requestLicenseDetails(licenseKey);

        return licenseRequestResponse.data;
    }

    /**
     * Get which license a repository has
     * @param owner owner of repo
     * @param repo repo name
     * @returns {Promise<OctokitResponse<any>>} promise for license request response
     */
    static async requestRepoLicense(owner, repo) {
        console.log(`Getting license: GET /repos/${owner}/${repo}/license`);
        try{
            return await RequestUtils.octokit.request('GET /repos/{owner}/{repo}/license', {
                owner: owner,
                repo: repo
            });
        } catch (error) {
            // Handle errors
            console.log("Error fetching license", error);
            throw error;
        }
    }

    /**
     * Get details about a license from its key (mit)
     * @param licenseKey license key string
     * @returns {Promise<OctokitResponse<any>>}
     */
    static async requestLicenseDetails(licenseKey){
        console.log("Getting license details: ");
        try{
            return await RequestUtils.octokit.request('GET /licenses/{license}', {
                license: licenseKey
            });
        } catch (error) {
            // Handle errors
            console.log("Error fetching license", error);
            throw error;
        }
    }
}
export default GetRepoLicense;








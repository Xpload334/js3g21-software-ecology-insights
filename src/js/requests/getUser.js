import RequestUtils from "./requestUtils.js";

class GetUser{
    static async getUser(username="", USING_TEST_DATA=false){
        const response = await this.requestUser(username)
        return response.data
    }
    
    static async requestUser(username="GitHub"){
        console.log();
        try{
            return await RequestUtils.octokit.request('GET /users/{username}', {
                username: username,
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28'
                }
            });
        } catch(error){
            console.log("Error fetching user", error);
        }
    }
}
export default GetUser;
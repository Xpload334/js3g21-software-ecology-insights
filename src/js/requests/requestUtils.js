import {Octokit} from "@octokit/rest";

class RequestUtils{
    static octokit = new Octokit({
        auth: import.meta.env.AUTHENTICATION_TOKEN,
    });
}
export default RequestUtils;



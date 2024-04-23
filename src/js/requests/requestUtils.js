import {Octokit} from "@octokit/rest";

class RequestUtils{
    static authToken = import.meta.env.AUTHENTICATION_TOKEN;

    static octokit = new Octokit({
        auth: RequestUtils.authToken,
    });

    static delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}
export default RequestUtils;



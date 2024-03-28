import {Octokit} from "@octokit/rest";

class RequestUtils{
    static octokit = new Octokit({
        // auth: process.env.AUTHENTICATION_TOKEN,
        auth : "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"
    });
}
export default RequestUtils;



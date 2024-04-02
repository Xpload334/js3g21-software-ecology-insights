import {Octokit} from "@octokit/rest";

class RequestUtils{
    static octokit = new Octokit({
        // auth: process.env.AUTHENTICATION_TOKEN,
        // auth : "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"
        auth : "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"
    });
}
export default RequestUtils;



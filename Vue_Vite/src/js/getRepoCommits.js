import {reactive} from "vue";
import {Octokit} from "@octokit/rest";
// import vitePluginRequire from "vite-plugin-require";
// const parseLinkHeader = require('parse-link-header');


const octokit = new Octokit({
    // auth: process.env.AUTHENTICATION_TOKEN,
});
export const getCommitsReactive = reactive({
    
    processCommits(rawCommits) {
        // Initialize an object to store processed data
        const processedData = {
            labels: [], // X-axis labels (dates)
            datasets: [] // Data series for each user
        };

        // Create a map to store commit counts for each user and date
        const commitCounts = new Map();

        // Process each commit in the raw data
        rawCommits.forEach(commit => {
            const commitDate = new Date(commit.commit.author.date);
            const dateString = commitDate.toISOString().split('T')[0]; // Extracting YYYY-MM-DD

            // Initialize count for the user and date if not present
            if (!commitCounts.has(commit.author.login)) {
                commitCounts.set(commit.author.login, {});
            }
            if (!commitCounts.get(commit.author.login)[dateString]) {
                commitCounts.get(commit.author.login)[dateString] = 0;
            }

            // Increment the commit count for the user and date
            commitCounts.get(commit.author.login)[dateString]++;

            // Add the date to labels if not already present
            if (!processedData.labels.includes(dateString)) {
                processedData.labels.push(dateString);
            }
        });

        // Create a dataset for each user
        commitCounts.forEach((userCommits, user) => {
            const dataset = {
                label: user,
                data: processedData.labels.map(date => userCommits[date] || 0) // Fill in commit counts, defaulting to 0
            };
            processedData.datasets.push(dataset);
        });

        return processedData;
    },
    //Aggregate the commit data by a time period
    aggregateCommitData(rawCommits, timeFilter) {
        // Define a mapping of time filters to corresponding date intervals
        const dateIntervals = {
            'Lifetime': 'all',
            'Last Year': 365,
            'Last Month': 30,
            'Last Week': 7
        };

        // Get the date interval based on the specified time filter
        const intervalDays = dateIntervals[timeFilter] || 365; // Default to Last Year if filter is not recognized

        // Calculate the cutoff date for the specified interval
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - intervalDays);

        // Initialize an object to store aggregated data
        const aggregatedData = {
            labels: [], // X-axis labels (date intervals)
            datasets: [] // Data series for each user
        };

        // Create a map to store commit counts for each user and date interval
        const commitCounts = new Map();

        // Process each commit in the raw data
        rawCommits.forEach(commit => {
            const commitDate = new Date(commit.commit.author.date);

            // Check if the commit is within the specified interval
            if (commitDate >= cutoffDate) {
                const intervalLabel = this.getIntervalLabel(commitDate, intervalDays);

                // Initialize count for the user and interval if not present
                if (!commitCounts.has(commit.author.login)) {
                    commitCounts.set(commit.author.login, {});
                }
                if (!commitCounts.get(commit.author.login)[intervalLabel]) {
                    commitCounts.get(commit.author.login)[intervalLabel] = 0;
                }

                // Increment the commit count for the user and interval
                commitCounts.get(commit.author.login)[intervalLabel]++;

                // Add the interval label to labels if not already present
                if (!aggregatedData.labels.includes(intervalLabel)) {
                    aggregatedData.labels.push(intervalLabel);
                }
            }
        });

        // Create a dataset for each user
        commitCounts.forEach((userCommits, user) => {
            const dataset = {
                label: user,
                data: aggregatedData.labels.map(interval => userCommits[interval] || 0) // Fill in commit counts, defaulting to 0
            };
            aggregatedData.datasets.push(dataset);
        });

        return aggregatedData;
    },
    // Helper function to get the interval label based on the commit date
    getIntervalLabel(date, intervalDays) {
        const intervalDate = new Date(date);
        intervalDate.setHours(0, 0, 0, 0);
        intervalDate.setDate(intervalDate.getDate() - (intervalDays - 1));
        return intervalDate.toISOString().split('T')[0];
    },
    
    
    parseCommitsList(data){
        let simplified = data.map((item) => (this.parseCommit(item)));
        console.log(simplified[0]);
        return simplified;
    },
    parseCommit(commitData){
        return {
            sha : commitData.sha,
            author : {
                name : commitData.commit.author.name,
                email : commitData.commit.author.email,
                date : this.convertTime(commitData.commit.author.date),
                avatar_url : commitData.author.avatar_url,
                html_url : commitData.author.html_url,
                type : commitData.author.type
            },
            committer : {
                name : commitData.commit.committer.name,
                email : commitData.commit.committer.email,
                date : this.convertTime(commitData.commit.committer.date),
                avatar_url : commitData.committer.avatar_url,
                html_url : commitData.committer.html_url,
                type : commitData.committer.type
            },
            message : commitData.commit.message,
        }
    },

    convertTime(timeString) {
        const date = new Date(timeString);

        return {
            year: date.getFullYear(),
            month: date.getMonth() + 1, // Months are zero-based, so add 1
            week: this.getISOWeek(date),
            day: date.getDate(),
            hour: date.getUTCHours(),
            minute: date.getUTCMinutes()
        };
    },
    // Function to get ISO week number
    getISOWeek(date) {
        const onejan = new Date(date.getFullYear(), 0, 1);
        const dayOfWeek = onejan.getDay();
        const numberOfDays = Math.floor((date - onejan) / (24 * 60 * 60 * 1000)) + 1;
        const weekNumber = Math.ceil((numberOfDays + dayOfWeek) / 7);
    
        return weekNumber;
    }
});

// class Commits_Utils{
//     static processCommits(rawCommits) {
//         // Initialize an object to store processed data
//         const processedData = {
//             labels: [], // X-axis labels (dates)
//             datasets: [] // Data series for each user
//         };
//
//         // Create a map to store commit counts for each user and date
//         const commitCounts = new Map();
//
//         // Process each commit in the raw data
//         rawCommits.forEach(commit => {
//             const commitDate = new Date(commit.commit.author.date);
//             const dateString = commitDate.toISOString().split('T')[0]; // Extracting YYYY-MM-DD
//
//             // Initialize count for the user and date if not present
//             if (!commitCounts.has(commit.author.login)) {
//                 commitCounts.set(commit.author.login, {});
//             }
//             if (!commitCounts.get(commit.author.login)[dateString]) {
//                 commitCounts.get(commit.author.login)[dateString] = 0;
//             }
//
//             // Increment the commit count for the user and date
//             commitCounts.get(commit.author.login)[dateString]++;
//
//             // Add the date to labels if not already present
//             if (!processedData.labels.includes(dateString)) {
//                 processedData.labels.push(dateString);
//             }
//         });
//
//         // Create a dataset for each user
//         commitCounts.forEach((userCommits, user) => {
//             const dataset = {
//                 label: user,
//                 data: processedData.labels.map(date => userCommits[date] || 0) // Fill in commit counts, defaulting to 0
//             };
//             processedData.datasets.push(dataset);
//         });
//
//         return processedData;
//     }
//
//     static aggregateCommitData(rawCommits, timeFilter) {
//         // Define a mapping of time filters to corresponding date intervals
//         const dateIntervals = {
//             'Lifetime': 'all',
//             'Last Year': 365,
//             'Last Month': 30,
//             'Last Week': 7
//         };
//
//         // Get the date interval based on the specified time filter
//         const intervalDays = dateIntervals[timeFilter] || 365; // Default to Last Year if filter is not recognized
//
//         // Calculate the cutoff date for the specified interval
//         const cutoffDate = new Date();
//         cutoffDate.setDate(cutoffDate.getDate() - intervalDays);
//
//         // Initialize an object to store aggregated data
//         const aggregatedData = {
//             labels: [], // X-axis labels (date intervals)
//             datasets: [] // Data series for each user
//         };
//
//         // Create a map to store commit counts for each user and date interval
//         const commitCounts = new Map();
//
//         // Process each commit in the raw data
//         rawCommits.forEach(commit => {
//             const commitDate = new Date(commit.commit.author.date);
//
//             // Check if the commit is within the specified interval
//             if (commitDate >= cutoffDate) {
//                 const intervalLabel = getIntervalLabel(commitDate, intervalDays);
//
//                 // Initialize count for the user and interval if not present
//                 if (!commitCounts.has(commit.author.login)) {
//                     commitCounts.set(commit.author.login, {});
//                 }
//                 if (!commitCounts.get(commit.author.login)[intervalLabel]) {
//                     commitCounts.get(commit.author.login)[intervalLabel] = 0;
//                 }
//
//                 // Increment the commit count for the user and interval
//                 commitCounts.get(commit.author.login)[intervalLabel]++;
//
//                 // Add the interval label to labels if not already present
//                 if (!aggregatedData.labels.includes(intervalLabel)) {
//                     aggregatedData.labels.push(intervalLabel);
//                 }
//             }
//         });
//
//         // Create a dataset for each user
//         commitCounts.forEach((userCommits, user) => {
//             const dataset = {
//                 label: user,
//                 data: aggregatedData.labels.map(interval => userCommits[interval] || 0) // Fill in commit counts, defaulting to 0
//             };
//             aggregatedData.datasets.push(dataset);
//         });
//
//         return aggregatedData;
//     }
//
//     // Helper function to get the interval label based on the commit date
//     static getIntervalLabel(date, intervalDays) {
//         const intervalDate = new Date(date);
//         intervalDate.setHours(0, 0, 0, 0);
//         intervalDate.setDate(intervalDate.getDate() - (intervalDays - 1));
//         return intervalDate.toISOString().split('T')[0];
//     }
//
//     static parseCommitsList(data){
//         let simplified = data.map((item) => (Commits_Utils.parseCommit(item)));
//         console.log(simplified[0]);
//         return simplified;
//     }
//     static parseCommit(commitData){
//         return {
//             sha : commitData.sha,
//             author : {
//                 name : commitData.commit.author.name,
//                 email : commitData.commit.author.email,
//                 date : Commits_Utils.convertTime(commitData.commit.author.date),
//                 avatar_url : commitData.author.avatar_url,
//                 html_url : commitData.author.html_url,
//                 type : commitData.author.type
//             },
//             committer : {
//                 name : commitData.commit.committer.name,
//                 email : commitData.commit.committer.email,
//                 date : Commits_Utils.convertTime(commitData.commit.committer.date),
//                 avatar_url : commitData.committer.avatar_url,
//                 html_url : commitData.committer.html_url,
//                 type : commitData.committer.type
//             },
//             message : commitData.commit.message,
//             // Add more details as needed
//         }
//     }
//
//     static convertTime(timeString) {
//         const date = new Date(timeString);
//
//         return {
//             year: date.getFullYear(),
//             month: date.getMonth() + 1, // Months are zero-based, so we add 1
//             week: Commits_Utils.getISOWeek(date),
//             day: date.getDate(),
//             hour: date.getUTCHours(),
//             minute: date.getUTCMinutes()
//         };
//     }
//
//     // Function to get ISO week number
//     static getISOWeek(date) {
//         const onejan = new Date(date.getFullYear(), 0, 1);
//         const dayOfWeek = onejan.getDay();
//         const numberOfDays = Math.floor((date - onejan) / (24 * 60 * 60 * 1000)) + 1;
//         const weekNumber = Math.ceil((numberOfDays + dayOfWeek) / 7);
//
//         return weekNumber;
//     }
// }
// module.exports = Commits_Utils;




import {reactive} from "vue";

const RADIUS_ZERO = 0;
const RADIUS_DEFAULT = 5;

const COLOR_ADDITIONS_LINE = 'rgba(100,192,75, 0.8)';
const COLOR_ADDITIONS_BG = 'rgb(100,192,75, 0.2)'

const COLOR_DELETIONS_LINE = 'rgba(255, 99, 132, 0.8)';
const COLOR_DELETIONS_BG = 'rgba(255, 99, 132, 0.2)';

const COLOR_COMMITS_LINE = 'rgb(135, 206, 235, 0.8)';
const COLOR_COMMITS_BG = 'rgb(135, 206, 235, 0.2)';

const COLOR_COMMITS_LINE_TOP_N = [
    'rgb(239, 154, 154, 0.8)',
    'rgb(255, 204, 128, 0.8)',
    'rgb(255, 245, 157, 0.8)',
    'rgb(174, 213, 129, 0.8)',
    'rgb(100, 181, 235, 0.8)',
    'rgb(179, 157, 219, 0.8)',
    'rgb(244, 143, 177, 0.8)',
];
const COLOR_COMMITS_BG_TOP_N = [
    'rgb(239, 154, 154, 0.2)',
    'rgb(255, 204, 128, 0.2)',
    'rgb(255, 245, 157, 0.2)',
    'rgb(174, 213, 129, 0.2)',
    'rgb(100, 181, 235, 0.2)',
    'rgb(179, 157, 219, 0.2)',
    'rgb(244, 143, 177, 0.2)',
];
const COLOR_COMMITS_LINE_OTHER = 'rgb(207, 216, 220, 0.8)'
const COLOR_COMMITS_BG_OTHER = 'rgb(207, 216, 220, 0)';


export const chartDataContributors = reactive({
    
    convertToChartJSData(contributorsList) {
        const chartDataArray = [];
        const globalMaxAdditions = contributorsList.reduce(
            (max, contributor) => Math.max(max, this.getMaxContributorAdditions(contributor)),
            0
        );
        const globalMaxDeletions = contributorsList.reduce(
            (max, contributor) => Math.max(max, this.getMaxContributorDeletions(contributor)),
            0
        );

        try {
            contributorsList.forEach((contributor) => {
                const contributorData = this.convertContributorToChartJSData(
                    contributor,
                    globalMaxAdditions,
                    globalMaxDeletions
                );
                chartDataArray.push({
                    author: contributor.author,
                    chartData: contributorData,
                });
            });
        } catch (error) {
            console.error('Error converting contributors data to chart data:', error);
        }

        return chartDataArray;
    },
    
    convertContributorToChartJSData(contributor) {
        const contributorData = {
            labels: [],
            datasets: [
                {
                    label: 'Additions',
                    data: [],
                    borderColor: COLOR_ADDITIONS_LINE,
                    backgroundColor: COLOR_ADDITIONS_BG,
                    radius: [],
                    pointRadius: [],
                    yAxisID: 'y',
                    // maxValue: globalMaxAdditions, // New property for Y-axis scale
                },
                {
                    label: 'Deletions',
                    data: [],
                    borderColor: COLOR_DELETIONS_LINE,
                    backgroundColor: COLOR_DELETIONS_BG,
                    radius: [],
                    pointRadius: [],
                    yAxisID: 'y',
                    // maxValue: globalMaxDeletions, // New property for Y-axis scale
                },
                {
                    label: 'Commits',
                    data: [],
                    borderColor: COLOR_COMMITS_LINE,
                    backgroundColor: COLOR_COMMITS_BG,
                    radius: [],
                    pointRadius: [],
                    yAxisID: 'y1',
                    // maxValue: globalMaxCommits, // New property for Y-axis scale
                },
            ],
        };

        // Get data for each contributor and transform
        contributor.weeks.forEach((week) => {
            const weekDate = new Date(week.w * 1000);
            const weekLabel = `${weekDate.getUTCDate()}/${weekDate.getUTCMonth() + 1}/${weekDate.getUTCFullYear()}`;

            contributorData.labels.push(weekLabel);
            contributorData.datasets[0].data.push(week.a);
            contributorData.datasets[1].data.push(week.d);
            contributorData.datasets[2].data.push(week.c);

            //Additions
            if (week.a === 0) {
                contributorData.datasets[0].radius.push(RADIUS_ZERO);
                contributorData.datasets[0].pointRadius.push(RADIUS_ZERO);
            } else {
                contributorData.datasets[0].radius.push(RADIUS_DEFAULT);
                contributorData.datasets[0].pointRadius.push(RADIUS_DEFAULT);
            }
            
            //Deletions
            if (week.d === 0) {
                contributorData.datasets[1].radius.push(RADIUS_ZERO);
                contributorData.datasets[1].pointRadius.push(RADIUS_ZERO);
            } else {
                contributorData.datasets[1].radius.push(RADIUS_DEFAULT);
                contributorData.datasets[1].pointRadius.push(RADIUS_DEFAULT);
            }

            //Commits
            if (week.c === 0) {
                contributorData.datasets[2].radius.push(RADIUS_ZERO);
                contributorData.datasets[2].pointRadius.push(RADIUS_ZERO);
            } else {
                contributorData.datasets[2].radius.push(RADIUS_DEFAULT);
                contributorData.datasets[2].pointRadius.push(RADIUS_DEFAULT);
            }
        });
        
        // // Set author's name as the label for the contributor
        // const authorName = contributor.author.name;
        // contributorData.datasets.forEach(dataset => dataset.label = authorName);

        return contributorData;
    },

    convertContributorToChartJSCommits(contributor) {
        const contributorData = {
            labels: [],
            datasets: [
                // {
                //     label: 'Additions',
                //     data: [],
                //     borderColor: COLOR_ADDITIONS_LINE,
                //     backgroundColor: COLOR_ADDITIONS_BG,
                //     radius: [],
                //     pointRadius: [],
                //     yAxisID: 'y',
                //     // maxValue: globalMaxAdditions, // New property for Y-axis scale
                // },
                // {
                //     label: 'Deletions',
                //     data: [],
                //     borderColor: COLOR_DELETIONS_LINE,
                //     backgroundColor: COLOR_DELETIONS_BG,
                //     radius: [],
                //     pointRadius: [],
                //     yAxisID: 'y',
                //     // maxValue: globalMaxDeletions, // New property for Y-axis scale
                // },
                {
                    label: 'Commits',
                    data: [],
                    borderColor: COLOR_COMMITS_LINE,
                    backgroundColor: COLOR_COMMITS_BG,
                    radius: [],
                    pointRadius: [],
                    yAxisID: 'y1',
                    // maxValue: globalMaxCommits, // New property for Y-axis scale
                },
            ],
        };

        // Get data for each contributor and transform
        contributor.weeks.forEach((week) => {
            const weekDate = new Date(week.w * 1000);
            const weekLabel = `${weekDate.getUTCDate()}/${weekDate.getUTCMonth() + 1}/${weekDate.getUTCFullYear()}`;

            contributorData.labels.push(weekLabel);
            contributorData.datasets[0].data.push(week.c);

            // //Additions
            // if (week.a === 0) {
            //     contributorData.datasets[0].radius.push(RADIUS_ZERO);
            //     contributorData.datasets[0].pointRadius.push(RADIUS_ZERO);
            // } else {
            //     contributorData.datasets[0].radius.push(RADIUS_DEFAULT);
            //     contributorData.datasets[0].pointRadius.push(RADIUS_DEFAULT);
            // }
            //
            // //Deletions
            // if (week.d === 0) {
            //     contributorData.datasets[1].radius.push(RADIUS_ZERO);
            //     contributorData.datasets[1].pointRadius.push(RADIUS_ZERO);
            // } else {
            //     contributorData.datasets[1].radius.push(RADIUS_DEFAULT);
            //     contributorData.datasets[1].pointRadius.push(RADIUS_DEFAULT);
            // }

            //Commits
            if (week.c === 0) {
                contributorData.datasets[0].radius.push(RADIUS_ZERO);
                contributorData.datasets[0].pointRadius.push(RADIUS_ZERO);
            } else {
                contributorData.datasets[0].radius.push(RADIUS_DEFAULT);
                contributorData.datasets[0].pointRadius.push(RADIUS_DEFAULT);
            }
        });

        // Set author's login as the label for the contributor
        const authorName = contributor.author.login;
        contributorData.datasets.forEach(dataset => dataset.label = authorName);

        return contributorData;
    },

    getTopNContributors(contributorsData, N) {
        // Sort contributors by the sum of additions and deletions
        const sortedContributors = contributorsData.sort((a, b) => {
            const sumA = a.weeks.reduce((total, week) => total + week.a + week.d, 0);
            const sumB = b.weeks.reduce((total, week) => total + week.a + week.d, 0);
            return sumB - sumA;
        });

        // Take the top N contributors
        const topNContributors = sortedContributors.slice(0, N);

        return topNContributors;
    },

    getSuggestedMaxY(contributorsList) {
        const globalMaxAdditions = contributorsList.reduce(
            (max, contributor) => Math.max(max, this.getMaxContributorAdditions(contributor)),
            0
        );
        const globalMaxDeletions = contributorsList.reduce(
            (max, contributor) => Math.max(max, this.getMaxContributorDeletions(contributor)),
            0
        );

        return Math.max(globalMaxAdditions, globalMaxDeletions);
    },

    getSuggestedMaxYCommits(contributorsList) {
        const globalMaxCommits = contributorsList.reduce(
            (max, contributor) => Math.max(max, this.getMaxContributorCommits(contributor)),
            0
        );

        return Math.max(globalMaxCommits);
    },

    getMaxContributorAdditions(contributor) {
        return Math.max(...contributor.weeks.map((week) => week.a), 0);
    },

    getMaxContributorDeletions(contributor) {
        return Math.max(...contributor.weeks.map((week) => week.d), 0);
    },

    getMaxContributorCommits(contributor) {
        return Math.max(...contributor.weeks.map((week) => week.c), 0);
    },


    chartDataContributorsStacked(contributorsList, N) {
        const topNContributors = this.getTopNContributors(contributorsList, N);
        // console.log("TOP N CONTRIBUTORS", topNContributors);
        const otherContributors = contributorsList.filter(contributor => !topNContributors.includes(contributor));

        const topNChartData = topNContributors.map(contributor => this.convertContributorToChartJSCommits(contributor));
        const otherChartData = this.convertOtherContributorsToChartJSData(otherContributors);

        // Merge top N contributors' data with "Other" data
        const chartData = this.mergeContributorsData(topNChartData, otherChartData);

        return chartData;
    },

    convertOtherContributorsToChartJSData(otherContributors) {
        const otherData = {
            labels: [],
            datasets: [
                {
                    label: 'Other (Non-Top Contributors)',
                    data: [],
                    borderColor: COLOR_COMMITS_LINE_OTHER,
                    backgroundColor: COLOR_COMMITS_BG_OTHER,
                    borderWidth: 2,
                    fill: false,
                },
            ],
        };

        const weeklyData = new Map(); // Map to accumulate weekly contributions

        otherContributors.forEach(contributor => {
            contributor.weeks.forEach(week => {
                const weekDate = new Date(week.w * 1000);
                const weekLabel = `${weekDate.getUTCDate()}/${weekDate.getUTCMonth() + 1}/${weekDate.getUTCFullYear()}`;

                if (!weeklyData.has(weekLabel)) {
                    weeklyData.set(weekLabel, { c:0});
                }

                // weeklyData.get(weekLabel).a += week.a;
                // weeklyData.get(weekLabel).d += week.d;
                weeklyData.get(weekLabel).c += week.c;
            });
        });

        // Convert accumulated data to ChartJS format
        for (const [weekLabel, { c }] of weeklyData.entries()) {
            otherData.labels.push(weekLabel);
            otherData.datasets[0].data.push(c); // Total commits
        }

        return otherData;
    },

    mergeContributorsData(topNData, otherData) {
        const mergedData = {
            labels: topNData[0].labels, // Assuming labels are the same for all data sets
            datasets: [],
        };

        // Merge top N contributors' data
        topNData.forEach((data, index) => {
            // console.log("AUTHOR LABEL", data.datasets[0].label)
            mergedData.datasets.push({
                // label: `Contributor ${index + 1}`, // Label for each top N contributor
                label: `${data.datasets[0].label} [#${index + 1}]`,
                data: data.datasets[0].data.map((value, i) => value + otherData.datasets[0].data[i]), // Combine with "Other" data
                borderColor: COLOR_COMMITS_LINE_TOP_N[index],
                backgroundColor: COLOR_COMMITS_BG_TOP_N[index],
                // borderWidth: data.datasets[0].borderWidth,
                // fill: data.datasets[0].fill,
            });
        });

        // Add "Other" data
        mergedData.datasets.push(otherData.datasets[0]);

        return mergedData;
    },
    
    
    generateStackedLineChartData(contributorsData, N){
        // Sort contributors by the metric you want to use (e.g., total commits)
        const sortedContributors = contributorsData.sort((a, b) => b.total - a.total);

        // Separate top N contributors and all other contributors
        const topNContributors = sortedContributors.slice(0, N);
        const otherContributors = sortedContributors.slice(N);

        // Initialize data arrays for each contributor and for the "other" section
        const topNData = topNContributors.map(contributor => ({
            label: contributor.author.login,
            data: contributor.weeks.map(week => week.c),
        }));
        const otherData = {
            label: 'Other Contributors',
            data: new Array(topNContributors[0].weeks.length).fill(0), // Initialize with zeros
        };

        // Aggregate data for all other contributors
        otherContributors.forEach(contributor => {
            contributor.weeks.forEach((week, index) => {
                otherData.data[index] += week.c;
            });
        });

        // Combine data for top N contributors and "other" contributors
        const datasets = [...topNData, otherData];

        // Convert data to ChartJS format
        const chartData = {
            labels: topNContributors[0].weeks.map(week => this.getWeekLabel(week.w)),
            // datasets: datasets.forEach((dataset, index) => {
            //     label: dataset.label,
            //         data: dataset.data,
            //         backgroundColor: COLOR_COMMITS_BG_TOP_N[0],
            //         borderColor: COLOR_COMMITS_LINE_TOP_N[0],
            //         fill: false,
            // }),
            
            datasets: datasets.map((dataset, index) => ({
                label: dataset.label,
                data: dataset.data,
                backgroundColor: COLOR_COMMITS_BG_TOP_N[index],
                borderColor: COLOR_COMMITS_LINE_TOP_N[index],
                fill: true,
            })),
        };

        return chartData;
    },


    
    getWeekLabel(wTimestamp){
        const weekDate = new Date(wTimestamp * 1000);
        return `${weekDate.getUTCDate()}/${weekDate.getUTCMonth() + 1}/${weekDate.getUTCFullYear()}`;
    },

});
import {reactive} from "vue";

const RADIUS_ZERO = 0;
const RADIUS_DEFAULT = 5;

const COLOR_ADDITIONS_LINE = 'rgba(100,192,75, 0.8)';
const COLOR_ADDITIONS_BG = 'rgb(100,192,75, 0.2)'

const COLOR_DELETIONS_LINE = 'rgba(255, 99, 132, 0.8)';
const COLOR_DELETIONS_BG = 'rgba(255, 99, 132, 0.2)';


export const chartDataContributors = reactive({
    
    // convertToChartJSData(contributorsList) {
    //     const chartData = [];
    //
    //     try {
    //         contributorsList.forEach((contributor) => {
    //             const contributorData = this.convertContributorToChartJSData(contributor);
    //             chartData.push(contributorData);
    //         });
    //     } catch (error) {
    //         console.error('Error converting contributors data to chart data:', error);
    //     }
    //
    //     return chartData;
    // },
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
    
    
    // convertContributorToChartJSData(contributor) {
    //     const contributorData = {
    //         labels: [],
    //         datasets: [
    //             { 
    //                 label: 'Additions',
    //                 data: [], 
    //                 borderColor: COLOR_ADDITIONS_LINE, 
    //                 backgroundColor: COLOR_ADDITIONS_BG,
    //                 radius: [], // Set radius to 0 to hide points
    //                 pointRadius: [],
    //             },
    //             { 
    //                 label: 'Deletions', 
    //                 data: [], 
    //                 borderColor: COLOR_DELETIONS_LINE, 
    //                 backgroundColor: COLOR_DELETIONS_BG,
    //                 radius: [], // Set radius to 0 to hide points
    //                 pointRadius: [],
    //             },
    //             // { label: 'Commits', data: [], color: 'rgba(54, 162, 235, 1)' },
    //         ],
    //     };
    //
    //    
    //     const globalMaxAdditions = Math.max(...contributorList.map(contributor => Math.max(...contributor.weeks.map(week => week.a))));
    //     const globalMaxDeletions = Math.max(...contributorList.map(contributor => Math.max(...contributor.weeks.map(week => week.d))));
    //
    //     //Get data for each contributor and transform
    //     contributor.weeks.forEach((week) => {
    //         const weekDate = new Date(week.w * 1000);
    //         const weekLabel = `${weekDate.getUTCDate()}/${weekDate.getUTCMonth() + 1}/${weekDate.getUTCFullYear()}`;
    //
    //         contributorData.labels.push(weekLabel);
    //         contributorData.datasets[0].data.push(week.a); // Additions
    //         contributorData.datasets[1].data.push(week.d); // Deletions
    //         // contributorData.datasets[2].data.push(week.c); // Commits
    //        
    //         //If additions value is 0, hide point
    //         if(week.a === 0){
    //             contributorData.datasets[0].radius.push(RADIUS_ZERO);
    //             contributorData.datasets[0].pointRadius.push(RADIUS_ZERO);
    //         } else {
    //             contributorData.datasets[0].radius.push(RADIUS_DEFAULT);
    //             contributorData.datasets[0].pointRadius.push(RADIUS_DEFAULT);
    //         }
    //
    //         //If deletions value is 0, hide point
    //         if(week.d === 0){
    //             contributorData.datasets[1].radius.push(RADIUS_ZERO);
    //             contributorData.datasets[1].pointRadius.push(RADIUS_ZERO);
    //         } else {
    //             contributorData.datasets[1].radius.push(RADIUS_DEFAULT);
    //             contributorData.datasets[1].pointRadius.push(RADIUS_DEFAULT);
    //         }
    //        
    //     });
    //
    //     return contributorData;
    // },
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
                    // maxValue: globalMaxAdditions, // New property for Y-axis scale
                },
                {
                    label: 'Deletions',
                    data: [],
                    borderColor: COLOR_DELETIONS_LINE,
                    backgroundColor: COLOR_DELETIONS_BG,
                    radius: [],
                    pointRadius: [],
                    // maxValue: globalMaxDeletions, // New property for Y-axis scale
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

            if (week.a === 0) {
                contributorData.datasets[0].radius.push(RADIUS_ZERO);
                contributorData.datasets[0].pointRadius.push(RADIUS_ZERO);
            } else {
                contributorData.datasets[0].radius.push(RADIUS_DEFAULT);
                contributorData.datasets[0].pointRadius.push(RADIUS_DEFAULT);
            }

            if (week.d === 0) {
                contributorData.datasets[1].radius.push(RADIUS_ZERO);
                contributorData.datasets[1].pointRadius.push(RADIUS_ZERO);
            } else {
                contributorData.datasets[1].radius.push(RADIUS_DEFAULT);
                contributorData.datasets[1].pointRadius.push(RADIUS_DEFAULT);
            }
        });

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

    getMaxContributorAdditions(contributor) {
        return Math.max(...contributor.weeks.map((week) => week.a), 0);
    },

    getMaxContributorDeletions(contributor) {
        return Math.max(...contributor.weeks.map((week) => week.d), 0);
    },


});
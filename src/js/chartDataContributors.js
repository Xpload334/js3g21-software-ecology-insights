import {reactive} from "vue";


export const chartDataContributors = reactive({
    // convertToChartJSData(response) {
    //     const chartData = [];
    //
    //     try {
    //         response.forEach((contributor) => {
    //             const contributorData = {
    //                 labels: [],
    //                 datasets: [
    //                     { label: 'Additions', data: [], color: 'rgba(75, 192, 192, 1)' },
    //                     { label: 'Deletions', data: [], color: 'rgba(255, 99, 132, 1)' },
    //                     // { label: 'Commits', data: [], color: 'rgba(54, 162, 235, 1)' },
    //                 ],
    //             };
    //
    //             contributor.weeks.forEach((week) => {
    //                 const weekDate = new Date(week.w * 1000);
    //                 const weekLabel = `${weekDate.getUTCDate()}/${weekDate.getUTCMonth() + 1}`;
    //
    //                 contributorData.labels.push(weekLabel);
    //                 contributorData.datasets[0].data.push(week.a); // Additions
    //                 contributorData.datasets[1].data.push(week.d); // Deletions
    //                 // contributorData.datasets[2].data.push(week.c); // Commits
    //
    //                 // contributorData.datasets[0].data.push(week.c); // Commits
    //             });
    //
    //             chartData.push(contributorData);
    //         });
    //     } catch (error) {
    //         console.error('Error converting contributors data to chart data:', error);
    //     }
    //
    //     return chartData;
    // },
    convertToChartJSData(response) {
        const chartData = [];

        try {
            response.forEach((contributor) => {
                const contributorData = this.convertContributorToChartJSData(contributor);
                chartData.push(contributorData);
            });
        } catch (error) {
            console.error('Error converting contributors data to chart data:', error);
        }

        return chartData;
    },
    convertContributorToChartJSData(contributor) {
        const contributorData = {
            labels: [],
            datasets: [
                { label: 'Additions', data: [], color: 'rgba(75, 192, 192, 1)' },
                { label: 'Deletions', data: [], color: 'rgba(255, 99, 132, 1)' },
                // { label: 'Commits', data: [], color: 'rgba(54, 162, 235, 1)' },
            ],
        };

        contributor.weeks.forEach((week) => {
            const weekDate = new Date(week.w * 1000);
            const weekLabel = `${weekDate.getUTCDate()}/${weekDate.getUTCMonth() + 1}`;

            contributorData.labels.push(weekLabel);
            contributorData.datasets[0].data.push(week.a); // Additions
            contributorData.datasets[1].data.push(week.d); // Deletions
            // contributorData.datasets[2].data.push(week.c); // Commits
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
    }


});
import { reactive } from 'vue';

export const chartDataIssues = reactive({
    RADIUS_ZERO : 0,
    RADIUS_DEFAULT : 5,
    
    backgroundColor : 'rgb(255, 172, 28, 0.2)',
    borderColor : 'rgb(255, 172, 28, 0.8)',

    // General function to generate chart data based on date properties and aggregation type
    generateChartData(issuesData, dateComparison, aggregationType) {
        const currentDate = new Date();

        const entriesMap = new Map();

        issuesData.forEach(item => {
            const createdDate = new Date(item.created_at);
            const closedDate = item.closed_at ? new Date(item.closed_at) : null;

            // Determine the start and end dates based on the aggregation type
            const startDate = dateComparison(currentDate);
            const endDate = currentDate;

            let currentDate = new Date(startDate);

            while (currentDate <= endDate) {
                let key;

                if (aggregationType === 'month') {
                    key = currentDate.toLocaleString('default', { month: 'long' });
                } else if (aggregationType === 'week') {
                    const mondayOfCurrentWeek = new Date(currentDate);
                    mondayOfCurrentWeek.setDate(currentDate.getDate() - currentDate.getDay() + (currentDate.getDay() === 0 ? -6 : 1));
                    key = `${mondayOfCurrentWeek.getDate()}/${mondayOfCurrentWeek.getMonth() + 1}`;
                } else if (aggregationType === 'day') {
                    key = `${currentDate.getDate()}/${currentDate.getMonth() + 1}`;
                }

                // Check if the item is within the specified date range
                if ((createdDate <= currentDate && (!closedDate || closedDate >= currentDate))) {
                    if (entriesMap.has(key)) {
                        entriesMap.set(key, entriesMap.get(key) + 1);
                    } else {
                        entriesMap.set(key, 1);
                    }
                }

                // Move to the next date
                currentDate.setDate(currentDate.getDate() + 1);
            }
        });

        const sortedEntries = [...entriesMap.entries()].sort(([a], [b]) => {
            const dateA = new Date(a);
            const dateB = new Date(b);
            return dateA - dateB;
        });

        const labels = sortedEntries.map(([key]) => key);

        const chartData = {
            labels: labels,
            datasets: [{
                backgroundColor: this.backgroundColor,
                borderColor: this.borderColor,
                radius: this.RADIUS_DEFAULT,
                data: sortedEntries.map(([, count]) => count)
            }]
        };

        console.log("Chart Data", chartData);

        return chartData;
    },

    // Function to generate chart data for the last 12 months
    chartDataTwelveMonths(issuesData) {
        const dateComparison = currentDate => {
            const lastYearDate = new Date(currentDate);
            lastYearDate.setFullYear(lastYearDate.getFullYear() - 1);
            return lastYearDate;
        };

        return this.generateChartData(issuesData, dateComparison, 'month');
    },
    
    // Function to generate chart data for the last 3 months
    chartDataThreeMonths(issuesData) {
        const dateComparison = currentDate => {
            const lastThreeMonthsDate = new Date(currentDate);
            lastThreeMonthsDate.setMonth(lastThreeMonthsDate.getMonth() - 3);
            return lastThreeMonthsDate;
        };

        return this.generateChartData(issuesData, dateComparison, 'week');
    },

    // Function to generate chart data for the last month
    chartDataMonth(issuesData) {
        const dateComparison = currentDate => {
            const lastMonthDate = new Date(currentDate);
            lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
            return lastMonthDate;
        };

        return this.generateChartData(issuesData, dateComparison, 'day');
    },

    // Function to generate chart data for the lifetime
    chartDataLifetime(issuesData) {
        const dateComparison = currentDate => currentDate;

        return this.generateChartData(issuesData, dateComparison, 'month');
    },

    // Function to generate chart data for the last week
    chartDataWeek(issuesData) {
        const dateComparison = currentDate => {
            const lastWeekDate = new Date(currentDate);
            lastWeekDate.setDate(lastWeekDate.getDate() - 7);
            return lastWeekDate;
        };

        return this.generateChartData(issuesData, dateComparison, 'day');
    },



    // // Function to generate chart data for the lifetime
    // chartDataLifetime(issuesData, aggregationType = 'month') {
    //     const currentDate = new Date();
    //
    //     const entriesMap = new Map();
    //
    //     issuesData.forEach(issue => {
    //         // Check if the issue is still open or was open during the specified date range
    //         if (issue.state === 'open' || (issue.state === 'closed' && new Date(issue.closed_at) > currentDate)) {
    //             const date = new Date(issue.created_at);
    //
    //             let key;
    //             if (aggregationType === 'month') {
    //                 key = date.toLocaleString('default', { month: 'long' });
    //             }
    //
    //             if (key) {
    //                 if (entriesMap.has(key)) {
    //                     entriesMap.set(key, entriesMap.get(key) + 1);
    //                 } else {
    //                     entriesMap.set(key, 1);
    //                 }
    //             }
    //         }
    //     });
    //
    //     const sortedEntries = [...entriesMap.entries()].sort(([a], [b]) => {
    //         const dateA = new Date(a);
    //         const dateB = new Date(b);
    //         return dateA - dateB;
    //     });
    //
    //     const labels = sortedEntries.map(([key]) => key);
    //
    //     const chartData = {
    //         labels: labels,
    //         datasets: [{
    //             backgroundColor: this.backgroundColor,
    //             borderColor: this.borderColor,
    //             radius: this.RADIUS_DEFAULT,
    //             data: sortedEntries.map(([, count]) => count),
    //         }],
    //     };
    //
    //     console.log("Issues Chart Data", chartData);
    //
    //     return chartData;
    // },
    //
    // // Function to generate chart data for the last 12 months
    // chartDataTwelveMonths(issuesData, aggregationType = 'month') {
    //     const dateComparison = currentDate => {
    //         const lastYearDate = new Date(currentDate);
    //         lastYearDate.setFullYear(lastYearDate.getFullYear() - 1);
    //         return lastYearDate;
    //     };
    //
    //     return this.generateChartData(issuesData, dateComparison, aggregationType);
    // },
    //
    // // Function to generate chart data for the last 3 months
    // chartDataThreeMonths(issuesData, aggregationType = 'week') {
    //     const dateComparison = currentDate => {
    //         const lastThreeMonthsDate = new Date(currentDate);
    //         lastThreeMonthsDate.setMonth(lastThreeMonthsDate.getMonth() - 3);
    //         return lastThreeMonthsDate;
    //     };
    //
    //     return this.generateChartData(issuesData, dateComparison, aggregationType);
    // },
    //
    // // Function to generate chart data for the last 1 month
    // chartDataMonth(issuesData, aggregationType = 'day') {
    //     const dateComparison = currentDate => {
    //         const lastMonthDate = new Date(currentDate);
    //         lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
    //         return lastMonthDate;
    //     };
    //
    //     return this.generateChartData(issuesData, dateComparison, aggregationType);
    // },
    //
    // // Function to generate chart data for the last 1 week
    // chartDataWeek(issuesData, aggregationType = 'day') {
    //     const dateComparison = currentDate => {
    //         const lastWeekDate = new Date(currentDate);
    //         lastWeekDate.setDate(lastWeekDate.getDate() - 7);
    //         return lastWeekDate;
    //     };
    //
    //     return this.generateChartData(issuesData, dateComparison, aggregationType);
    // },

});

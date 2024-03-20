import { reactive } from 'vue';
import {chartDataAggregate} from "./chartDataAggregate.js";
import DataConvertUtils from "../dataConvertUtils.js";

class ChartDataIssues {
    static RADIUS_ZERO = 0;
    static RADIUS_DEFAULT = 5;
    static LABEL = "Issues"

    static backgroundColor = 'rgb(255, 172, 28, 0.2)';
    static borderColor = 'rgb(255, 172, 28, 0.8)';
    
    // static chartDataTwelveMonths(issuesData){
    //     return chartDataAggregate.chartDataTwelveMonths(issuesData, 'created_at', 'month', ChartDataIssues.backgroundColor, ChartDataIssues.borderColor);
    // }
    static chartDataTwelveMonths(dataArray) {
        const currentDate = new Date();
        const lastYearDate = new Date(currentDate);
        lastYearDate.setFullYear(lastYearDate.getFullYear() - 1);

        const monthlyEntries = Array(12).fill(0);

        dataArray.forEach(item => {
            const date = new Date(item.created_at);

            // Check if the commit is within the last 12 months
            if (date > lastYearDate) {
                const monthIndex = (date.getMonth() + 12 - lastYearDate.getMonth()) % 12;
                monthlyEntries[monthIndex]++;
            }
        });

        const monthLabels = [];
        for (let i = 0; i < 12; i++) {
            const labelDate = new Date(lastYearDate);
            labelDate.setMonth(lastYearDate.getMonth() + i);
            monthLabels.push(labelDate.toLocaleString('default', { month: 'long' }));
        }

        const chartData = {
            labels: monthLabels,
            datasets: [{
                label: this.LABEL,
                backgroundColor: this.backgroundColor,
                borderColor : this.borderColor,
                data: monthlyEntries,
                radius : this.RADIUS_DEFAULT,
            }]
        };

        // console.log("Chart Data (Last 12 Months)", chartData)

        return chartData;
    }
    // static chartDataWeek(issuesData){
    //     return chartDataAggregate.chartDataWeek(issuesData, 'created_at', 'day', ChartDataIssues.backgroundColor, ChartDataIssues.borderColor);
    // }
    static chartDataWeek(dataArray) {
        const currentDate = new Date();
        const lastWeekDate = new Date(currentDate);
        lastWeekDate.setDate(lastWeekDate.getDate() - 7);

        const dailyEntries = Array(7).fill(0);

        dataArray.forEach(item => {
            const date = new Date(item.created_at);

            // Check if the item is within the last week
            if (date > lastWeekDate) {
                const dayIndex = (date.getDay() - lastWeekDate.getDay() + 7) % 7;
                dailyEntries[dayIndex]++;
            }
        });

        const dayLabels = [
            'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
        ];

        // Rotate dayLabels based on the current day of the week
        const todayIndex = currentDate.getDay();
        const rotatedDayLabels = [...dayLabels.slice(todayIndex), ...dayLabels.slice(0, todayIndex)];

        const chartData = {
            labels: rotatedDayLabels,
            datasets: [{
                label : this.LABEL,
                backgroundColor : this.backgroundColor,
                borderColor : this.borderColor,
                radius : this.RADIUS_DEFAULT,
                data: dailyEntries
            }]
        };

        // console.log("Chart Data (Last Week)", chartData)

        return chartData;
    }
    // static chartDataThreeMonths(issuesData){
    //     return chartDataAggregate.chartDataThreeMonths(issuesData, 'created_at', 'week', ChartDataIssues.backgroundColor, ChartDataIssues.borderColor);
    // }
    static chartDataThreeMonths(dataArray) {
        const currentDate = new Date();
        const lastThreeMonthsDate = new Date(currentDate);
        lastThreeMonthsDate.setMonth(lastThreeMonthsDate.getMonth() - 3);

        const weeklyEntries = Array(12).fill(0);

        dataArray.forEach(item => {
            const date = new Date(item.created_at);

            // Check if the item is within the last 3 months
            if (date > lastThreeMonthsDate) {
                const mondayOfCurrentWeek = new Date(date);
                mondayOfCurrentWeek.setDate(date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1));

                const weekIndex = Math.floor((currentDate - mondayOfCurrentWeek) / (7 * 24 * 60 * 60 * 1000));
                weeklyEntries[weekIndex]++;
            }
        });

        const chartData = {
            labels: Array(12).fill().map((_, index) => {
                const mondayDate = new Date(lastThreeMonthsDate);
                mondayDate.setDate(lastThreeMonthsDate.getDate() + index * 7 - lastThreeMonthsDate.getDay() + (lastThreeMonthsDate.getDay() === 0 ? -6 : 1));
                return `${mondayDate.getDate()}/${mondayDate.getMonth() + 1}`;
            }),
            datasets: [{
                label : this.LABEL,
                backgroundColor : this.backgroundColor,
                borderColor : this.borderColor,
                radius : this.RADIUS_DEFAULT,
                data: weeklyEntries
            }]
        };

        // console.log("Chart Data (Last 3 Months)", chartData);

        return chartData;
    }
    // static chartDataMonth(issuesData){
    //     return chartDataAggregate.chartDataMonth(issuesData, 'created_at', 'day', ChartDataIssues.backgroundColor, ChartDataIssues.borderColor);
    // }
    static chartDataMonth(dataArray) {
        const currentDate = new Date();
        const lastMonthDate = new Date(currentDate);
        lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);

        const dailyEntries = Array(30).fill(0);

        dataArray.forEach(item => {
            const date = new Date(item.created_at);

            // Check if the item is within the last month
            if (date > lastMonthDate) {
                const dayIndex = Math.floor((date - lastMonthDate) / (24 * 60 * 60 * 1000));
                dailyEntries[dayIndex]++;
            }
        });

        const chartData = {
            labels: Array(30).fill().map((_, index) => {
                const currentDay = new Date(lastMonthDate);
                currentDay.setDate(lastMonthDate.getDate() + index);
                return `${currentDay.getDate()}/${currentDay.getMonth() + 1}`;
            }),
            datasets: [{
                label: this.LABEL,
                backgroundColor : this.backgroundColor,
                borderColor : this.borderColor,
                radius : this.RADIUS_DEFAULT,
                data: dailyEntries
            }]
        };

        // console.log("Chart Data (Last Month)", chartData);

        return chartData;
    }
    
    
    
    // static chartDataLifetime(issuesData){
    //     return chartDataAggregate.chartDataLifetime(issuesData, 'created_at', 'month', ChartDataIssues.backgroundColor, ChartDataIssues.borderColor);
    // }
    
    static chartDataLifetime(issuesData){
        const monthEntriesMap = new Map();

        issuesData.forEach(item => {
            const date = new Date(item.created_at);
            const yearMonth = `${date.toLocaleString('default', { month: 'long' })}/${date.getFullYear()}`;

            if (monthEntriesMap.has(yearMonth)) {
                monthEntriesMap.set(yearMonth, monthEntriesMap.get(yearMonth) + 1);
            } else {
                monthEntriesMap.set(yearMonth, 1);
            }
        });

        const sortedMonth = [...monthEntriesMap.entries()].sort(([a], [b]) => new Date(a) - new Date(b));

        const monthLabels = sortedMonth.map(([yearMonth]) => yearMonth);

        const chartData = {
            labels: monthLabels,
            datasets: [{
                label: this.LABEL,
                backgroundColor : this.backgroundColor,
                borderColor : this.borderColor,
                radius : this.RADIUS_DEFAULT,
                data: sortedMonth.map(([, count]) => count)
            }]
        };

        console.log("Chart Data (Lifetime)", chartData);

        return chartData;
    }
    
    
    
    // COMMITS function to generate chart data based on a date property and aggregation type
    // generateChartData(dataArray, dateProperty, dateComparison, aggregationType) {
    //     const currentDate = new Date();
    //
    //     const entriesMap = new Map();
    //
    //     dataArray.forEach(item => {
    //         const date = new Date(item[dateProperty]);
    //
    //         // Check if the item is within the specified date range
    //         if (date > dateComparison(currentDate)) {
    //             let key;
    //             if (aggregationType === 'month') {
    //                 key = date.toLocaleString('default', { month: 'long' });
    //             } else if (aggregationType === 'week') {
    //                 const mondayOfCurrentWeek = new Date(date);
    //                 mondayOfCurrentWeek.setDate(date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1));
    //                 key = `${mondayOfCurrentWeek.getDate()}/${mondayOfCurrentWeek.getMonth() + 1}`;
    //             } else if (aggregationType === 'day') {
    //                 key = `${date.getDate()}/${date.getMonth() + 1}`;
    //             }
    //
    //             if (entriesMap.has(key)) {
    //                 entriesMap.set(key, entriesMap.get(key) + 1);
    //             } else {
    //                 entriesMap.set(key, 1);
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
    //             data: sortedEntries.map(([, count]) => count)
    //         }]
    //     };
    //
    //     console.log("Chart Data", chartData);
    //
    //     return chartData;
    // },
    // ISSUES function to generate chart data based on date properties and aggregation type
    // generateChartData(issuesData, dateComparison, aggregationType) {
    //     console.log("Generating issues chart data");
    //
    //     const entriesMap = issuesData.reduce((map, item) => {
    //         const createdDate = new Date(item.created_at);
    //
    //         // Determine the start and end dates based on the aggregation type
    //         const startDate = dateComparison(new Date());
    //         const endDate = new Date();
    //
    //         let loopDate = new Date(startDate);
    //
    //         while (loopDate <= endDate) {
    //             let key;
    //
    //             if (aggregationType === 'month') {
    //                 key = loopDate.toLocaleString('default', { month: 'long' });
    //             } else if (aggregationType === 'week') {
    //                 const mondayOfCurrentWeek = new Date(loopDate);
    //                 mondayOfCurrentWeek.setDate(loopDate.getDate() - loopDate.getDay() + (loopDate.getDay() === 0 ? -6 : 1));
    //                 key = `${mondayOfCurrentWeek.getDate()}/${mondayOfCurrentWeek.getMonth() + 1}`;
    //             } else if (aggregationType === 'day') {
    //                 key = `${loopDate.getDate()}/${loopDate.getMonth() + 1}`;
    //             }
    //
    //             // Check if the item is within the specified date range
    //             if (createdDate <= loopDate) {
    //                 map.set(key, (map.get(key) || 0) + 1);
    //             }
    //
    //             // Move to the next date
    //             loopDate.setDate(loopDate.getDate() + 1);
    //         }
    //
    //         return map;
    //     }, new Map());
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
    //             data: sortedEntries.map(([, count]) => count)
    //         }]
    //     };
    //
    //     return chartData;
    // },
    // generateChartData(issuesData, dateComparison, aggregationType) {
    //     console.log("Generating issues chart data");
    //
    //     const entriesMap = issuesData.reduce((map, item) => {
    //         const createdDate = new Date(item.created_at);
    //         const closedDate = item.closed_at ? new Date(item.closed_at) : null;
    //
    //         // Determine the start and end dates based on the aggregation type
    //         const startDate = dateComparison(new Date());
    //         const endDate = new Date();
    //
    //         let loopDate = new Date(startDate);
    //
    //         while (loopDate <= endDate) {
    //             let key;
    //
    //             if (aggregationType === 'month') {
    //                 key = loopDate.toLocaleString('default', { month: 'long' });
    //             } else if (aggregationType === 'week') {
    //                 const mondayOfCurrentWeek = new Date(loopDate);
    //                 mondayOfCurrentWeek.setDate(loopDate.getDate() - loopDate.getDay() + (loopDate.getDay() === 0 ? -6 : 1));
    //                 key = `${mondayOfCurrentWeek.getDate()}/${mondayOfCurrentWeek.getMonth() + 1}`;
    //             } else if (aggregationType === 'day') {
    //                 key = `${loopDate.getDate()}/${loopDate.getMonth() + 1}`;
    //             }
    //
    //             // Check if the item is within the specified date range
    //             if (createdDate <= loopDate && (!closedDate || closedDate >= loopDate)) {
    //                 map.set(key, (map.get(key) || 0) + 1);
    //             }
    //
    //             // Move to the next date
    //             loopDate.setDate(loopDate.getDate() + 1);
    //         }
    //
    //         return map;
    //     }, new Map());
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
    //             data: sortedEntries.map(([, count]) => count)
    //         }]
    //     };
    //    
    //     return chartData;
    // },
    // generateChartData(issuesData, dateComparison, aggregationType) {
    //     console.log("Generating issues chart data")
    //     const currentDate = new Date();
    //
    //     const entriesMap = new Map();
    //
    //     issuesData.forEach(item => {
    //         const createdDate = new Date(item.created_at);
    //         const closedDate = item.closed_at ? new Date(item.closed_at) : null;
    //
    //         // Determine the start and end dates based on the aggregation type
    //         const startDate = dateComparison(currentDate);
    //         const endDate = currentDate;
    //        
    //         // console.log(`Start date of issue #${item.number}`, startDate);
    //         // console.log(`End date of issue #${item.number}`, endDate)
    //
    //         let loopDate = new Date(startDate);
    //
    //         while (loopDate <= endDate) {
    //             let key;
    //
    //             if (aggregationType === 'month') {
    //                 key = loopDate.toLocaleString('default', { month: 'long' });
    //             } else if (aggregationType === 'week') {
    //                 const mondayOfCurrentWeek = new Date(loopDate);
    //                 mondayOfCurrentWeek.setDate(loopDate.getDate() - loopDate.getDay() + (loopDate.getDay() === 0 ? -6 : 1));
    //                 key = `${mondayOfCurrentWeek.getDate()}/${mondayOfCurrentWeek.getMonth() + 1}`;
    //             } else if (aggregationType === 'day') {
    //                 key = `${loopDate.getDate()}/${loopDate.getMonth() + 1}`;
    //             }
    //
    //             // Check if the item is within the specified date range
    //             if (createdDate <= loopDate && (!closedDate || closedDate >= loopDate)) {
    //                 if (entriesMap.has(key)) {
    //                     entriesMap.set(key, entriesMap.get(key) + 1);
    //                 } else {
    //                     entriesMap.set(key, 1);
    //                 }
    //             }
    //
    //             // Move to the next date
    //             loopDate.setDate(loopDate.getDate() + 1);
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
    //             data: sortedEntries.map(([, count]) => count)
    //         }]
    //     };
    //
    //     console.log("Chart Data", chartData);
    //
    //     return chartData;
    // },
    // // Function to generate chart data for the last 12 months
    // chartDataTwelveMonths(issuesData) {
    //     const dateComparison = currentDate => {
    //         const lastYearDate = new Date(currentDate);
    //         lastYearDate.setFullYear(lastYearDate.getFullYear() - 1);
    //         return lastYearDate;
    //     };
    //
    //     const yearData = this.generateChartData(issuesData, dateComparison, 'month');
    //     console.log("Chart Data", yearData);
    //     return yearData;
    //     // return this.generateChartData(issuesData, dateComparison, 'month');
    // },
    //
    // // Function to generate chart data for the last 3 months
    // chartDataThreeMonths(issuesData) {
    //     const dateComparison = currentDate => {
    //         const lastThreeMonthsDate = new Date(currentDate);
    //         lastThreeMonthsDate.setMonth(lastThreeMonthsDate.getMonth() - 3);
    //         return lastThreeMonthsDate;
    //     };
    //
    //     return this.generateChartData(issuesData, dateComparison, 'week');
    // },
    //
    // // Function to generate chart data for the last month
    // chartDataMonth(issuesData) {
    //     const dateComparison = currentDate => {
    //         const lastMonthDate = new Date(currentDate);
    //         lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
    //         return lastMonthDate;
    //     };
    //
    //     return this.generateChartData(issuesData, dateComparison, 'day');
    // },
    //
    // // Function to generate chart data for the lifetime
    // chartDataLifetime(issuesData) {
    //     const dateComparison = currentDate => currentDate;
    //
    //     return this.generateChartData(issuesData, dateComparison, 'month');
    // },
    //
    // // Function to generate chart data for the last week
    // chartDataWeek(issuesData) {
    //     const dateComparison = currentDate => {
    //         const lastWeekDate = new Date(currentDate);
    //         lastWeekDate.setDate(lastWeekDate.getDate() - 7);
    //         return lastWeekDate;
    //     };
    //
    //     return this.generateChartData(issuesData, dateComparison, 'day');
    // },
}
export default ChartDataIssues;

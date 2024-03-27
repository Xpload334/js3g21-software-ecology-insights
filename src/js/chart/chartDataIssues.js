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

        // Map the counts, replacing NaN values with zeros
        const data = monthlyEntries.map(count => isNaN(count) ? 0 : count);

        const chartData = {
            labels: monthLabels,
            datasets: [{
                label: this.LABEL,
                backgroundColor: this.backgroundColor,
                borderColor : this.borderColor,
                data: data,
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

        // Map the counts, replacing NaN values with zeros
        const data = dailyEntries.map(count => isNaN(count) ? 0 : count);

        const chartData = {
            labels: rotatedDayLabels,
            datasets: [{
                label : this.LABEL,
                backgroundColor : this.backgroundColor,
                borderColor : this.borderColor,
                radius : this.RADIUS_DEFAULT,
                data: data
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

        // Map the counts, replacing NaN values with zeros
        const data = weeklyEntries.map(count => isNaN(count) ? 0 : count);

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
                data: data
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

        // Map the counts, replacing NaN values with zeros
        const data = dailyEntries.map(count => isNaN(count) ? 0 : count);
        
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
                data: data
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

        // Map the counts, replacing NaN values with zeros
        const data = sortedMonth.map(([, count]) => isNaN(count) ? 0 : count);

        const chartData = {
            labels: monthLabels,
            datasets: [{
                label: this.LABEL,
                backgroundColor : this.backgroundColor,
                borderColor : this.borderColor,
                radius : this.RADIUS_DEFAULT,
                // data: sortedMonth.map(([, count]) => count)
                data : data,
            }]
        };

        // console.log("Chart Data (Lifetime)", chartData);

        return chartData;
    }
}
export default ChartDataIssues;

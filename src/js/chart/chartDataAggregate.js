import { reactive } from "vue";
export const chartDataAggregate = reactive({
    RADIUS_ZERO : 0,
    RADIUS_DEFAULT : 5,
    
    backgroundColor : 'rgb(135, 206, 235, 0.2)',
    borderColor : 'rgb(135, 206, 235, 0.8)',

    // generateRandomColor() {
    //     return this.colors[Math.floor(Math.random() * this.colors.length)];
    // },
    // setColorCommits(){
    //     this.backgroundColor = 'rgb(135, 206, 235, 0.2)';
    //     this.borderColor = 'rgb(135, 206, 235, 0.8)';
    // },
    // setColorIssues(){
    //     this.backgroundColor = 'rgb(255, 172, 28, 0.2)';
    //     this.borderColor = 'rgb(255, 172, 28, 0.8)';
    // },

    generateChartJSData(labels, data) {
        return {
            labels: labels,
            datasets: [{
                backgroundColor: this.backgroundColor,
                borderColor: this.borderColor,
                radius: this.RADIUS_DEFAULT,
                data: data
            }]
        };
    },

    // General function to generate chart data based on a date property and aggregation type
    generateChartData(dataArray, dateProperty, dateComparison, aggregationType) {
        const currentDate = new Date();

        const entriesMap = new Map();

        dataArray.forEach(item => {
            const date = new Date(item[dateProperty]);

            // Check if the item is within the specified date range
            if (date > dateComparison(currentDate)) {
                let key;
                if (aggregationType === 'month') {
                    key = date.toLocaleString('default', { month: 'long' });
                } else if (aggregationType === 'week') {
                    const mondayOfCurrentWeek = new Date(date);
                    mondayOfCurrentWeek.setDate(date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1));
                    key = `${mondayOfCurrentWeek.getDate()}/${mondayOfCurrentWeek.getMonth() + 1}`;
                } else if (aggregationType === 'day') {
                    key = `${date.getDate()}/${date.getMonth() + 1}`;
                }

                if (entriesMap.has(key)) {
                    entriesMap.set(key, entriesMap.get(key) + 1);
                } else {
                    entriesMap.set(key, 1);
                }
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
    chartDataTwelveMonths(dataArray, dateProperty = 'author.date', aggregationType = 'month') {
        const dateComparison = currentDate => {
            const lastYearDate = new Date(currentDate);
            lastYearDate.setFullYear(lastYearDate.getFullYear() - 1);
            return lastYearDate;
        };

        return this.generateChartData(dataArray, dateProperty, dateComparison, aggregationType);
    },

    // Function to generate chart data for the last week
    chartDataWeek(dataArray, dateProperty = 'author.date', aggregationType = 'day') {
        const dateComparison = currentDate => {
            const lastWeekDate = new Date(currentDate);
            lastWeekDate.setDate(lastWeekDate.getDate() - 7);
            return lastWeekDate;
        };

        return this.generateChartData(dataArray, dateProperty, dateComparison, aggregationType);
    },

    // Function to generate chart data for the last 3 months
    chartDataThreeMonths(dataArray, dateProperty = 'author.date', aggregationType = 'week') {
        const dateComparison = currentDate => {
            const lastThreeMonthsDate = new Date(currentDate);
            lastThreeMonthsDate.setMonth(lastThreeMonthsDate.getMonth() - 3);
            return lastThreeMonthsDate;
        };

        return this.generateChartData(dataArray, dateProperty, dateComparison, aggregationType);
    },

    // Function to generate chart data for the last month
    chartDataMonth(dataArray, dateProperty = 'author.date', aggregationType = 'day') {
        const dateComparison = currentDate => {
            const lastMonthDate = new Date(currentDate);
            lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
            return lastMonthDate;
        };

        return this.generateChartData(dataArray, dateProperty, dateComparison, aggregationType);
    },

    // Function to generate chart data for the lifetime
    chartDataLifetime(commitsData, dateProperty = 'author.date', aggregationType = 'month') {
        const dateComparison = currentDate => currentDate;

        return this.generateChartData(commitsData, dateProperty, dateComparison, aggregationType);
    }
});

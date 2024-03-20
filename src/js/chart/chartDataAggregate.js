import { reactive } from "vue";
export const chartDataAggregate = reactive({
    RADIUS_ZERO : 0,
    RADIUS_DEFAULT : 5,
    
    backgroundColor : 'rgb(135, 206, 235, 0.2)',
    borderColor : 'rgb(135, 206, 235, 0.8)',
    

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
    generateChartData(dataArray, dateProperty, dateComparison, aggregationType, backgroundColor=this.backgroundColor, borderColor=this.borderColor) {
        const currentDate = new Date();
        const entriesMap = new Map();
        
        //Logging
        // console.log("Data Array:", dataArray);
        // console.log("Date Property:", dateProperty);
        // console.log("Aggregation Type:", aggregationType);
        //
        // console.log("Date Comparison Function:", dateComparison);
        

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

                // console.log("Key:", key);
                // console.log("Entries Map:", entriesMap);
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
                label : 'Issues',
                backgroundColor: backgroundColor,
                borderColor: borderColor,
                radius: this.RADIUS_DEFAULT,
                data: sortedEntries.map(([, count]) => count)
            }]
        };

        console.log("Aggregate Chart Data", chartData);

        return chartData;
    },

    // Function to generate chart data for the last 12 months
    chartDataTwelveMonths(dataArray, dateProperty = 'author.date', aggregationType = 'month', backgroundColor=this.backgroundColor, borderColor=this.borderColor) {
        const dateComparison = currentDate => {
            const lastYearDate = new Date(currentDate);
            lastYearDate.setFullYear(lastYearDate.getFullYear() - 1);
            return lastYearDate;
        };

        return this.generateChartData(dataArray, dateProperty, dateComparison, aggregationType, backgroundColor, borderColor);
    },

    // Function to generate chart data for the last week
    chartDataWeek(dataArray, dateProperty = 'author.date', aggregationType = 'day', backgroundColor=this.backgroundColor, borderColor=this.borderColor) {
        const dateComparison = currentDate => {
            const lastWeekDate = new Date(currentDate);
            lastWeekDate.setDate(lastWeekDate.getDate() - 7);
            return lastWeekDate;
        };

        return this.generateChartData(dataArray, dateProperty, dateComparison, aggregationType, backgroundColor, borderColor);
    },

    // Function to generate chart data for the last 3 months
    chartDataThreeMonths(dataArray, dateProperty = 'author.date', aggregationType = 'week', backgroundColor=this.backgroundColor, borderColor=this.borderColor) {
        const dateComparison = currentDate => {
            const lastThreeMonthsDate = new Date(currentDate);
            lastThreeMonthsDate.setMonth(lastThreeMonthsDate.getMonth() - 3);
            return lastThreeMonthsDate;
        };

        return this.generateChartData(dataArray, dateProperty, dateComparison, aggregationType, backgroundColor, borderColor);
    },

    // Function to generate chart data for the last month
    chartDataMonth(dataArray, dateProperty = 'author.date', aggregationType = 'day', backgroundColor=this.backgroundColor, borderColor=this.borderColor) {
        const dateComparison = currentDate => {
            const lastMonthDate = new Date(currentDate);
            lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
            return lastMonthDate;
        };

        return this.generateChartData(dataArray, dateProperty, dateComparison, aggregationType, backgroundColor, borderColor);
    },

    // Function to generate chart data for the lifetime
    chartDataLifetime(commitsData, dateProperty = 'author.date', aggregationType = 'month', backgroundColor=this.backgroundColor, borderColor=this.borderColor) {
        // const dateComparison = currentDate => currentDate;

        const dateComparison = (currentDate) => {
            // Find the oldest issue date in the dataset
            const oldestIssueDate = commitsData.reduce((oldestDate, commit) => {
                const commitDate = new Date(commit[dateProperty]);
                return commitDate < oldestDate ? commitDate : oldestDate;
            }, new Date());

            // console.log("Oldest Input Data Date", oldestIssueDate)

            return oldestIssueDate;
        };

        return this.generateChartData(commitsData, dateProperty, dateComparison, aggregationType, backgroundColor, borderColor);
    },

    // chartDataLifetime(commitsData, dateProperty = 'author.date', aggregationType = 'month', backgroundColor = this.backgroundColor, borderColor = this.borderColor) {
    //     // Find the oldest issue date in the dataset
    //     const oldestIssueDate = commitsData.reduce((oldestDate, commit) => {
    //         const commitDate = new Date(commit[dateProperty]);
    //         return commitDate < oldestDate ? commitDate : oldestDate;
    //     }, new Date());
    //
    //     // Calculate the labels and data based on the oldest issue date
    //     const currentDate = new Date();
    //     const labels = [];
    //     const dataMap = new Map();
    //
    //     let currentLabelDate = new Date(oldestIssueDate);
    //     currentLabelDate.setDate(1); // Ensure starting from the beginning of the month
    //
    //     while (currentLabelDate <= currentDate) {
    //         const monthName = currentLabelDate.toLocaleString('default', { month: 'long' });
    //         const year = currentLabelDate.getFullYear();
    //         labels.push(`${monthName} ${year}`);
    //
    //         dataMap.set(`${monthName} ${year}`, 0);
    //
    //         // Move to the next month
    //         currentLabelDate.setMonth(currentLabelDate.getMonth() + 1);
    //     }
    //
    //     // Aggregate the data
    //     commitsData.forEach(commit => {
    //         const commitDate = new Date(commit[dateProperty]);
    //         const monthName = commitDate.toLocaleString('default', { month: 'long' });
    //         const year = commitDate.getFullYear();
    //         const label = `${monthName} ${year}`;
    //         if (dataMap.has(label)) {
    //             dataMap.set(label, dataMap.get(label) + 1);
    //         }
    //     });
    //
    //     const data = Array.from(dataMap.values());
    //
    //     return this.generateChartJSData(labels, data, backgroundColor, borderColor);
    // },




});

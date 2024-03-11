import {reactive} from "vue";

const RADIUS_ZERO = 0;
const RADIUS_DEFAULT = 5;


export const chartDataUtils = reactive({
    backgroundColor : 'rgb(135, 206, 235, 0.2)',
    borderColor : 'rgb(135, 206, 235, 0.8)',

    generateRandomColor() {
        return this.colors[Math.floor(Math.random() * this.colors.length)];
    },
    setColorCommits(){
        this.backgroundColor = 'rgb(135, 206, 235, 0.2)';
        this.borderColor = 'rgb(135, 206, 235, 0.8)';
    },
    setColorIssues(){
        this.backgroundColor = 'rgb(255, 172, 28, 0.2)';
        this.borderColor = 'rgb(255, 172, 28, 0.8)';
    },
    
    chartDataTwelveMonths(dataArray) {
        const currentDate = new Date();
        const lastYearDate = new Date(currentDate);
        lastYearDate.setFullYear(lastYearDate.getFullYear() - 1);

        const monthlyEntries = Array(12).fill(0);

        dataArray.forEach(item => {
            const date = new Date(item.author.date);

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
                backgroundColor: this.backgroundColor,
                borderColor : this.borderColor,
                data: monthlyEntries,
                radius : RADIUS_DEFAULT,
            }]
        };

        // console.log("Chart Data (Last 12 Months)", chartData)

        return chartData;
    },

    chartDataWeek(dataArray) {
        const currentDate = new Date();
        const lastWeekDate = new Date(currentDate);
        lastWeekDate.setDate(lastWeekDate.getDate() - 7);

        const dailyEntries = Array(7).fill(0);

        dataArray.forEach(item => {
            const date = new Date(item.author.date);

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
                backgroundColor : this.backgroundColor,
                borderColor : this.borderColor,
                radius : RADIUS_DEFAULT,
                data: dailyEntries
            }]
        };

        // console.log("Chart Data (Last Week)", chartData)

        return chartData;
    },

    chartDataThreeMonths(dataArray) {
        const currentDate = new Date();
        const lastThreeMonthsDate = new Date(currentDate);
        lastThreeMonthsDate.setMonth(lastThreeMonthsDate.getMonth() - 3);

        const weeklyEntries = Array(12).fill(0);

        dataArray.forEach(item => {
            const date = new Date(item.author.date);

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
                backgroundColor : this.backgroundColor,
                borderColor : this.borderColor,
                radius : RADIUS_DEFAULT,
                data: weeklyEntries
            }]
        };

        // console.log("Chart Data (Last 3 Months)", chartData);

        return chartData;
    },

    chartDataMonth(dataArray) {
        const currentDate = new Date();
        const lastMonthDate = new Date(currentDate);
        lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);

        const dailyEntries = Array(30).fill(0);

        dataArray.forEach(item => {
            const date = new Date(item.author.date);

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
                backgroundColor : this.backgroundColor,
                borderColor : this.borderColor,
                radius : RADIUS_DEFAULT,
                data: dailyEntries
            }]
        };

        // console.log("Chart Data (Last Month)", chartData);

        return chartData;
    },

    chartDataLifetime(commitsData) {
        const monthEntriesMap = new Map();

        commitsData.forEach(item => {
            const commitDate = new Date(item.author.date);
            const yearMonth = `${commitDate.toLocaleString('default', { month: 'long' })}/${commitDate.getFullYear()}`;

            if (monthEntriesMap.has(yearMonth)) {
                monthEntriesMap.set(yearMonth, monthEntriesMap.get(yearMonth) + 1);
            } else {
                monthEntriesMap.set(yearMonth, 1);
            }
        });

        const sortedMonthCommits = [...monthEntriesMap.entries()].sort(([a], [b]) => new Date(a) - new Date(b));

        const monthLabels = sortedMonthCommits.map(([yearMonth]) => yearMonth);

        const chartData = {
            labels: monthLabels,
            datasets: [{
                backgroundColor : this.backgroundColor,
                borderColor : this.borderColor,
                radius : RADIUS_DEFAULT,
                data: sortedMonthCommits.map(([, count]) => count)
            }]
        };

        // console.log("Chart Data (Lifetime)", chartData);

        return chartData;
    }
    
    
});


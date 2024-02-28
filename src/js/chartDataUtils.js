import {reactive} from "vue";

export const chartDataUtils = reactive({
    backgroundColor : '#f87979',
    colors: [
        // Generate a list of 5 pale colors here
        '#FF5733', '#FFAB33', '#FFD633', '#E9FF33', '#33FF57'
    ],

    generateRandomColor() {
        return this.colors[Math.floor(Math.random() * this.colors.length)];
    },
    
    
    commitsLast12MonthsForChart(commitsData) {
        const currentDate = new Date();
        const lastYearDate = new Date(currentDate);
        lastYearDate.setFullYear(lastYearDate.getFullYear() - 1);

        const monthlyCommits = Array(12).fill(0);

        commitsData.forEach(commit => {
            const commitDate = new Date(commit.author.date);

            // Check if the commit is within the last 12 months
            if (commitDate > lastYearDate) {
                const monthIndex = (commitDate.getMonth() + 12 - lastYearDate.getMonth()) % 12;
                monthlyCommits[monthIndex]++;
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
                // backgroundColor : this.backgroundColor,
                data: monthlyCommits
            }]
        };
        
        console.log("Chart Data (Commits Last 12 Months)", chartData)

        return chartData;
    },

    commitsLastWeekForChart(commitsData) {
        const currentDate = new Date();
        const lastWeekDate = new Date(currentDate);
        lastWeekDate.setDate(lastWeekDate.getDate() - 7);

        const dailyCommits = Array(7).fill(0);

        commitsData.forEach(commit => {
            const commitDate = new Date(commit.author.date);

            // Check if the commit is within the last week
            if (commitDate > lastWeekDate) {
                const dayIndex = (commitDate.getDay() - lastWeekDate.getDay() + 7) % 7;
                dailyCommits[dayIndex]++;
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
                // backgroundColor : this.backgroundColor,
                data: dailyCommits
            }]
        };

        console.log("Chart Data (Commits Last Week)", chartData)

        return chartData;
    },

    commitsLastThreeMonthsForChart(commitsData) {
        const currentDate = new Date();
        const lastThreeMonthsDate = new Date(currentDate);
        lastThreeMonthsDate.setMonth(lastThreeMonthsDate.getMonth() - 3);

        const weeklyCommits = Array(12).fill(0);

        commitsData.forEach(commit => {
            const commitDate = new Date(commit.author.date);

            // Check if the commit is within the last 3 months
            if (commitDate > lastThreeMonthsDate) {
                const mondayOfCurrentWeek = new Date(commitDate);
                mondayOfCurrentWeek.setDate(commitDate.getDate() - commitDate.getDay() + (commitDate.getDay() === 0 ? -6 : 1));

                const weekIndex = Math.floor((currentDate - mondayOfCurrentWeek) / (7 * 24 * 60 * 60 * 1000));
                weeklyCommits[weekIndex]++;
            }
        });

        const chartData = {
            labels: Array(12).fill().map((_, index) => {
                const mondayDate = new Date(lastThreeMonthsDate);
                mondayDate.setDate(lastThreeMonthsDate.getDate() + index * 7 - lastThreeMonthsDate.getDay() + (lastThreeMonthsDate.getDay() === 0 ? -6 : 1));
                return `${mondayDate.getDate()}/${mondayDate.getMonth() + 1}`;
            }),
            datasets: [{
                // backgroundColor : this.backgroundColor,
                data: weeklyCommits
            }]
        };

        return chartData;
    },

    commitsLastMonthForChart(commitsData) {
        const currentDate = new Date();
        const lastMonthDate = new Date(currentDate);
        lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);

        const dailyCommits = Array(30).fill(0);

        commitsData.forEach(commit => {
            const commitDate = new Date(commit.author.date);

            // Check if the commit is within the last month
            if (commitDate > lastMonthDate) {
                const dayIndex = Math.floor((commitDate - lastMonthDate) / (24 * 60 * 60 * 1000));
                dailyCommits[dayIndex]++;
            }
        });

        const chartData = {
            labels: Array(30).fill().map((_, index) => {
                const currentDay = new Date(lastMonthDate);
                currentDay.setDate(lastMonthDate.getDate() + index);
                return `${currentDay.getDate()}/${currentDay.getMonth() + 1}`;
            }),
            datasets: [{
                // backgroundColor : this.backgroundColor,
                data: dailyCommits
            }]
        };

        console.log("Chart Data (Last Month)", chartData);

        return chartData;
    },

    commitsLifetimeForChart(commitsData) {
        const monthCommitsMap = new Map();

        commitsData.forEach(commit => {
            const commitDate = new Date(commit.author.date);
            const yearMonth = `${commitDate.toLocaleString('default', { month: 'long' })}/${commitDate.getFullYear()}`;

            if (monthCommitsMap.has(yearMonth)) {
                monthCommitsMap.set(yearMonth, monthCommitsMap.get(yearMonth) + 1);
            } else {
                monthCommitsMap.set(yearMonth, 1);
            }
        });

        const sortedMonthCommits = [...monthCommitsMap.entries()].sort(([a], [b]) => new Date(a) - new Date(b));

        const monthLabels = sortedMonthCommits.map(([yearMonth]) => yearMonth);

        const chartData = {
            labels: monthLabels,
            datasets: [{
                // backgroundColor : this.backgroundColor,
                data: sortedMonthCommits.map(([, count]) => count)
            }]
        };

        return chartData;
    }
    
    
});


export const chartOptions = {
    scales: {
        y: {
            title: {
                display: true,
                text: 'Commits'
            }
        },
        x: {
            type: 'category'
        }
    },
    plugins: {
        legend: {
            display: false
        }
    },
    elements: {
        line: {
            tension: 0.12 // Adjust the tension to smooth out the line
        },
        area: {
            backgroundColor: 'rgba(75, 192, 192, 0.2)' // Fill in the area below the line with a color
        }
    },
    responsive: true,
    maintainAspectRatio: false,
    title: {
        display: true,
        text: 'Last 12 Months of Commits'
    }
};

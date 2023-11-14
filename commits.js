document.addEventListener("DOMContentLoaded", function () {
    // Parse query parameters to get the username and repository name
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get("user");
    const repo = urlParams.get("repo");

    if (username && repo) {
        // Fetch and display the commit history chart
        displayCommitChart(username, repo);
    } else {
        // Handle invalid or missing query parameters
        console.error("Invalid query parameters");
    }
});

// Function to request and display commit history as a chart
function displayCommitChart(username, repo) {
    // Create a variable to hold the `Promise` returned from `fetch` for commit data
    requestWeeklyCommitCount(username, repo)
        .then(response => {
            // console.log(response.json().toString());
        }) // parse response into JSON
        .then(data => {
            const commitsData = data.all;
            console.log(commitsData.toString())

            // Find the canvas element where the chart will be displayed
            const chartCanvas = document.createElement('canvas');
            chartCanvas.id = 'commitChart';
            const chartContainer = document.getElementById('commitChartContainer');
            chartContainer.innerHTML = ''; // Clear previous chart if any
            chartContainer.appendChild(chartCanvas);

            // Create a chart using Chart.js
            new Chart(chartCanvas, {
                type: 'line',
                data: {
                    labels: Array.from({ length: commitsData.length }, (_, i) => i + 1),
                    datasets: [{
                        label: 'Weekly Commits',
                        data: commitsData,
                        backgroundColor: 'rgba(0, 123, 255, 0.2)',
                        borderColor: 'rgba(0, 123, 255, 1)',
                        borderWidth: 1,
                        pointRadius: 3,
                    }],
                },
                options: {
                    scales: {
                        x: {
                            display: true,
                            title: {
                                display: true,
                                text: 'Week',
                            },
                        },
                        y: {
                            display: true,
                            title: {
                                display: true,
                                text: 'Commits',
                            },
                        },
                    },
                },
            });
        })
        .catch(error => {
            console.error('Error fetching commit data:', error);
        });
}

//Weekly commit count
function requestWeeklyCommitCount(username, repo) {
    const commitActivityLink = `https://api.github.com/repos/${username}/${repo}/stats/commit_activity`;
    console.log(`Fetching data from: ${commitActivityLink}`)
    // Create a variable to hold the `Promise` returned from `fetch` for commit data
    return fetch(commitActivityLink, {
        headers: {
            'Accept': 'application/vnd.github.v3+json',
            // 'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
        }
    })
        .then(response => {
            console.log(response.text())
            if (!response.ok) {
                throw new Error(`Failed to fetch commit data: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            return { message: 'Not Found' };
        });
}

import {chartDataAggregate} from "./chartDataAggregate.js";
import {chartDataIssues} from "./chartDataIssues.js";

export class ChartDataCombiner {
    // Function to combine data from chartDataAggregate and chartDataIssues
    static combineChartData(commitsData, issuesData) {
        const combinedData = {
            labels: [],
            datasets: [],
        };

        // Combine labels
        combinedData.labels = commitsData.labels;

        // Combine datasets
        combinedData.datasets.push({
            label: 'Commits',
            backgroundColor: chartDataAggregate.backgroundColor,
            borderColor: chartDataAggregate.borderColor,
            radius: chartDataAggregate.RADIUS_DEFAULT,
            data: commitsData.datasets[0].data,
            yAxisID: 'commitsYAxis',
        });

        combinedData.datasets.push({
            label: 'Open Issues',
            backgroundColor: chartDataIssues.backgroundColor,
            borderColor: chartDataIssues.borderColor,
            radius: chartDataIssues.RADIUS_DEFAULT,
            data: issuesData.datasets[0].data,
            yAxisID: 'issuesYAxis',
        });

        return combinedData;
    }
}

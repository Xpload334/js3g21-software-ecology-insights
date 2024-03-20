<template>
  <div style="max-height: 1000px; min-height: 400px;">
    <Line
        :options="chartOptions"
        :data="chartData"
    />
  </div>
</template>

<script>
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    Filler,
    LineElement,
    Title,
    Tooltip,
    Legend
)

export default {
  components: { Line },
  props: {
    chartData: {
      type: Object,
      required: true
    },
    suggestedMaxY: Number,
    suggestedMaxY1: Number
  },
  data() {
    return {
      chartOptions: {
        scales: {
          y: {
            suggestedMax: this.suggestedMaxY || 100, // Use the prop if available
            suggestedMin: 0,
            ticks: {
              precision: 0 // Display only whole numbers on the y-axis
            },
            display: true,
            position: 'left',
          },
          y1: {
            suggestedMax: this.suggestedMaxY1 || 100, // Use the prop if available
            suggestedMin: 0,
            ticks: {
              precision: 0 // Display only whole numbers on the y-axis
            },
            display: true,
            position: 'right',

            // grid line settings
            grid: {
              drawOnChartArea: false, // only want the grid lines for one axis to show up
            },
          },
          x: {
            type: 'category',
            title: {
              display: true,
              text: 'Date'
            },
            ticks: {
              maxRotation: 0,
              minRotation: 0,
              maxTicksLimit: 16, // Change this limit as needed
              autoSkip: true,
              autoSkipPadding: 20,
            }
          }
        },
        plugins: {
          legend: {
            display: false
          }
        },
        fill: true,
        responsive: true,
        interaction: {
          mode : 'index',
          intersect: false
        },
        tension: 0.1,
        maintainAspectRatio: false,
      }
    };
  },
};
</script>

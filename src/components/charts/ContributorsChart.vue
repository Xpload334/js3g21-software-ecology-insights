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
    suggestedMaxY: Number
  },
  data() {
    return {
      chartOptions: {
        scales: {
          y: {
            suggestedMax: this.suggestedMaxY || undefined, // Use the prop if available
            ticks: {
              precision: 0 // Display only whole numbers on the y-axis
            }
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
        interaction: {
          mode : 'index',
          intersect: false
        },
        fill: true,
        responsive: true,
        tension: 0.1,
        maintainAspectRatio: false,
      }
    };
  },
};
</script>

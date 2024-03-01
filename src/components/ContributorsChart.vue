<template>
  <div style="max-height: 1000px; min-height: 400px;">
    <Bar
        :options="chartOptions"
        :data="chartData"
    />
  </div>

</template>

<script>
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

// import {chartOptions} from "../js/chartOptions.js";

// ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    Filler,
    BarElement,
    Title,
    Tooltip,
    Legend
)

//Chart Options
const chartOptions = {
  scales: {
    y: {
      // title: {
      //   display: true,
      //   text: 'Commits'
      // },
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
  // elements: {
  //   line: {
  //     tension: 0.1 // Adjust the tension to smooth out the line
  //   },
  //   area: {
  //     backgroundColor: 'rgb(135, 206, 235, 0.5)', // Fill in the area below the line with a color
  //     fill: 'start'
  //   }
  // },
  // borderColor: '#0d6efd',
  backgroundColor: 'rgb(135, 206, 235, 0.2)',
  fill : true,
  responsive: true,
  tension: 0.1,
  maintainAspectRatio: false,
};


export default {
  components: { Bar },
  props: {
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chartOptions : chartOptions
    }
  }
}
</script>
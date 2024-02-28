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

// import {chartOptions} from "../js/chartOptions.js";

// ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
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

//Chart Options
const chartOptions = {
  scales: {
    y: {
      title: {
        display: true,
        text: 'Commits'
      },
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
        // callback: function (value, index, values) {
        //   // Show every 2nd label's text if more than 12 labels
        //   if (values.length > 12) {
        //     return index % 2 === 0 ? value : '';
        //   }
        //   // You can add more conditions for other limits
        //   return value;
        // }
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
  components: { Line },
  props: {
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chartOptions : chartOptions
      // chartOptions: {
      //   label: 'Commits',
      //   responsive: true,
      //   fill: false,
      //   borderColor: 'rgb(75, 192, 192)',
      //   tension: 0.1
      // }
    }
  }
}
</script>
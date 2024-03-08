<template>
  <div class="card">
    <div class="card-header">
      <h2 class="card-title text-center">Top Contributors</h2>
      <p class="card-subtitle text-center">Last 100 Weeks</p>
    </div>

    <div class="card-body">
      <!-- Check if contributorsTop is defined and has at least one entry -->
      <div v-if="contributorsTop && contributorsTop.length > 0">
        <div class="row row-cols-1 row-cols-md-3 g-4">
          <!-- For each contributor card -->
          <div v-for="item in contributorsTop">
            <div class="col">
              <div class="card">
                <!-- UserCard component to display contributor info -->
                <UserCard v-bind="item.author"/>

                <!-- CommitsChart component for contributor's commit chart -->
                <CommitsChart
                    :chart-data="item.chartData"
                    :suggested-max-y="suggestedMax"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <p>No contributors data available. Please try again.</p>
      </div>
    </div>
  </div>
</template>

<script>
// Import necessary components
import UserCard from "../components/cards/UserCard.vue";
import CommitsChart from "./CommitsChart.vue";

export default {
  props: {
    contributorsTop: Object,
    suggestedMax: Number,
  },
  components: {
    CommitsChart,
    UserCard
  }
}
</script>

<style scoped>
/* Add your styles here */
</style>

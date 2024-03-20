<template>
  <div class="row row-cols-1 row-cols-md-2 g-4">
    <!-- For each contributor card -->
    <div v-for="item in contributorsTop">
      <div class="col">
        <div class="card">
          <!-- UserCard component to display contributor info -->
          <UserCard v-bind="item.author"/>

          <!-- CommitsChart component for contributor's commit chart -->
          <LineChart_DualYAxes
              :chart-data="item.chartData"
              :suggested-max-y="suggestedMax"
              :suggested-max-y1="suggestedMaxY1"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserCard from "../components/cards/UserCard.vue";
import LineChart_DualYAxes from "./LineChart_DualYAxes.vue";
export default {
  props: {
    contributorsTop: Object,
    suggestedMax: Number,
    suggestedMaxY1: Number,
  },
  components: {
    LineChart_DualYAxes, UserCard
  }
}
</script>

<style scoped>

</style>
﻿<template>
  <div class="row row-cols-1 row-cols-lg-2 g-3">
    <!-- For each contributor card -->
    <div v-for="item in contributorsTop">
      <div class="col">
        <div class="card h-100">
          <div class="card-header ">
            <!-- UserCard component to display contributor info -->
            <UserCard :user="item.author" :get-user-data="getUserData"/>
          </div>
          <div class="card-body">
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

    getUserData : {
      type: Function,
      required : true
    }
  },
  components: {
    LineChart_DualYAxes, UserCard
  }
}
</script>

<style scoped>

</style>
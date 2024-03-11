<template>
  <div class="card">
    <div class="card-header">
      <h5 class="card-title">Topics</h5>
    </div>

    <div class="card-body">
      <div v-if="topics && topics.length > 0" class="overflow-auto" style="max-width: 100%">
<!--        <ul class="list-group">-->
<!--          <li v-for="item in topics" class="list-group-item">-->
<!--            {{ item }}-->
<!--          </li>-->
<!--        </ul>-->
        <!-- TOPICS -->
        <div class="col align-content-end">
          <span v-for="topic in topics">
            <span class="badge rounded-pill bg-primary">{{topic}}</span> &nbsp
          </span>
        </div>
      </div>
      <div v-else>
        <p>No topics available.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    topics: {
      type: Array,
      validator: (prop) => prop.every((e) => typeof e === "string"),
    },
  },
};
</script>

<style scoped>
/* Your styles here */
</style>

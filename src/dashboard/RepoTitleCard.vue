<template>
  <div class="card">
    <h1 class="card-header text-center">
      {{name}}
    </h1>
    
    <div class="card-body">
      <p class="card-text">{{description}}</p>
      <a :href="html_url" class="btn btn-primary">See On GitHub</a>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    name: String,
    description: String,
    html_url: String
  }
}
</script>

<style scoped>

</style>
<!--    <div class="card-header">-->
<!--      <ul class="nav nav-tabs card-header-tabs">-->
<!--        <li class="nav-item">-->
<!--          <div v-if="state === 'stats'">-->
<!--            <a class="nav-link active" aria-current="true">Stats</a>-->
<!--          </div>-->
<!--          <div v-else>-->
<!--            <a class="nav-link" aria-current="true" @click="setStateStats" :disabled="isLoading">Stats</a>-->
<!--          </div>-->
<!--        </li>-->

<!--        <li class="nav-item">-->
<!--          <div v-if="state === 'contributors'">-->
<!--            <a class="nav-link active" aria-current="true">Commits</a>-->
<!--          </div>-->
<!--          <div v-else>-->
<!--            <a class="nav-link" aria-current="true" @click="setStateCommits" :disabled="isLoading">Contributors</a>-->
<!--          </div>-->
<!--          &lt;!&ndash;                <a class="nav-link" @click="setStateContributors" :disabled="isLoading">Contributors</a>&ndash;&gt;-->
<!--        </li>-->
<!--      </ul>-->
<!--    </div>-->
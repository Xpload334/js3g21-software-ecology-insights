<!--<template>-->
<!--  <h3 class="text-center mt-5">Search for Repos</h3>-->
<!--  -->
<!--  <div class="container" id="search">-->
<!--    &lt;!&ndash; Search bar &ndash;&gt;-->
<!--    <form id="gitHubForm" class="form-inline mx-auto" style="width: 300px" @submit.prevent="searchStore.getReposByUsername()">-->
<!--      <input v-model="searchStore.username" id="usernameInput" class="form-control mb-5" type="text" name="username" placeholder="GitHub Username">-->
<!--      <input type="submit" class="btn btn-primary ml-2 mb-5" value="Submit">-->
<!--    </form>-->

<!--    &lt;!&ndash; Pagination Buttons &ndash;&gt;-->
<!--    <div id="paginationButtons" v-if="searchStore.hasSearchData">-->
<!--      <button @click="searchStore.previousPage" :disabled="searchStore.currentPage <= 1 || searchStore.isLoading">Previous</button>-->
<!--      <span>{{ searchStore.currentPage }} / {{ searchStore.totalPages }}</span>-->
<!--      <button @click="searchStore.nextPage" :disabled="searchStore.currentPage >= searchStore.totalPages || searchStore.isLoading">Next</button>-->
<!--    </div>-->
<!--    -->
<!--    &lt;!&ndash; Reload Button &ndash;&gt;-->
<!--    <button @click="searchStore.displaySearchResults" class="btn btn-primary mt-2" :disabled="searchStore.isLoading">-->
<!--      Reload-->
<!--    </button>-->
<!--    -->
<!--    &lt;!&ndash; Search Results&ndash;&gt;-->
<!--    <div id="scrollPane" class="scroll-pane overflow-auto">-->
<!--      <div v-if="searchStore.currentResults">-->
<!--        <SearchEntry v-for="item in searchStore.currentResults" :key="item.name"-->
<!--                     :name="item.name"-->
<!--                     :description="item.description"-->
<!--                     :url="item.html_url"-->
<!--        />-->
<!--      </div>-->
<!--    </div>-->
<!--    -->
<!--  </div>-->
<!--</template>-->
<!--<script setup>-->
<!--import {searchStore} from "./repoSearchStore.js";-->
<!--import SearchEntry from "../SearchEntry.vue";-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->
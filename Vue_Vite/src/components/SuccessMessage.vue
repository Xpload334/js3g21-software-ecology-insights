<template>
  <div class="toast show bg-success bg-gradient" style="position: absolute; top: 0; right: 0" data-testid="success">
    <div class="toast-header">
      <strong class="me-auto">Success</strong>
      <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
    </div>
    <div class="toast-body">
      <div v-if="storeMain.successMessage !== ''">
        <p>{{ storeMain.successMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import {storeMain} from "../js/storeMain.js";

  export default {
    name: "SuccessMessage"
  }
</script>

<style scoped>

</style>
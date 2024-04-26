<!--<template>-->
<!--  -->
<!--  <div class="toast-container bottom-0 end-0 p-3">-->
<!--&lt;!&ndash;    <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">&ndash;&gt;-->
<!--&lt;!&ndash;      <div class="toast-header">&ndash;&gt;-->
<!--&lt;!&ndash;        <img src="..." class="rounded me-2" alt="...">&ndash;&gt;-->
<!--&lt;!&ndash;        <strong class="me-auto">GitDash</strong>&ndash;&gt;-->
<!--&lt;!&ndash;        <small>11 mins ago</small>&ndash;&gt;-->
<!--&lt;!&ndash;        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>&ndash;&gt;-->
<!--&lt;!&ndash;      </div>&ndash;&gt;-->
<!--&lt;!&ndash;      <div class="toast-body">&ndash;&gt;-->
<!--&lt;!&ndash;        {{message}}&ndash;&gt;-->
<!--&lt;!&ndash;      </div>&ndash;&gt;-->
<!--&lt;!&ndash;    </div>&ndash;&gt;-->
<!--    <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">-->
<!--      <div class="toast-header">-->
<!--        <img src="..." class="rounded me-2" alt="...">-->
<!--        <strong class="me-auto">Bootstrap</strong>-->
<!--        <small class="text-body-secondary">just now</small>-->
<!--        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>-->
<!--      </div>-->
<!--      <div class="toast-body">-->
<!--        {{message}}-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--  -->
<!--&lt;!&ndash;  <div &ndash;&gt;-->
<!--&lt;!&ndash;      class="toast position-fixed bottom-0 end-0" &ndash;&gt;-->
<!--&lt;!&ndash;      :class="`bg-${variant} text-light`" &ndash;&gt;-->
<!--&lt;!&ndash;      role="alert" &ndash;&gt;-->
<!--&lt;!&ndash;      aria-live="assertive" &ndash;&gt;-->
<!--&lt;!&ndash;      aria-atomic="true"&ndash;&gt;-->
<!--&lt;!&ndash;  >&ndash;&gt;-->
<!--&lt;!&ndash;    <div class="toast-header">&ndash;&gt;-->
<!--&lt;!&ndash;      <strong class="me-auto">{{ title }}</strong>&ndash;&gt;-->
<!--&lt;!&ndash;      <button &ndash;&gt;-->
<!--&lt;!&ndash;          type="button" &ndash;&gt;-->
<!--&lt;!&ndash;          class="btn-close" &ndash;&gt;-->
<!--&lt;!&ndash;          data-bs-dismiss="toast" &ndash;&gt;-->
<!--&lt;!&ndash;          aria-label="Close" &ndash;&gt;-->
<!--&lt;!&ndash;          @click="closeToast">&ndash;&gt;-->
<!--&lt;!&ndash;      </button>&ndash;&gt;-->
<!--&lt;!&ndash;    </div>&ndash;&gt;-->
<!--&lt;!&ndash;    <div class="toast-body">&ndash;&gt;-->
<!--&lt;!&ndash;      {{ message }}&ndash;&gt;-->
<!--&lt;!&ndash;    </div>&ndash;&gt;-->
<!--&lt;!&ndash;  </div>&ndash;&gt;-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  props: {-->
<!--    title: {-->
<!--      type: String,-->
<!--      default: "Notification"-->
<!--    },-->
<!--    message: {-->
<!--      type: String,-->
<!--      required: true-->
<!--    },-->
<!--    // lifetime: {-->
<!--    //   type: Number,-->
<!--    //   default: 5000 // Default lifetime in milliseconds-->
<!--    // },-->
<!--    variant: {-->
<!--      type: String,-->
<!--      default: "info" // Bootstrap variant color (e.g., 'info', 'success', 'warning', 'danger')-->
<!--    }-->
<!--  },-->
<!--  // methods: {-->
<!--  //   closeToast() {-->
<!--  //     this.$emit('close');-->
<!--  //   },-->
<!--  // },-->
<!--  // mounted() {-->
<!--  //   if (this.lifetime) {-->
<!--  //     // Close the toast after the specified lifetime-->
<!--  //     setTimeout(() => {-->
<!--  //       this.closeToast();-->
<!--  //     }, this.lifetime);-->
<!--  //   }-->
<!--  // },-->
<!--};-->
<!--</script>-->

<!--<style scoped>-->
<!--/* Add any additional styles here */-->
<!--</style>-->

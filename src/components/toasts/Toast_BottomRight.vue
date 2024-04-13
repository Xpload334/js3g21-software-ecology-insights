<template>
  
  <div class="toast-container bottom-0 end-0 p-3">
<!--    <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">-->
<!--      <div class="toast-header">-->
<!--        <img src="..." class="rounded me-2" alt="...">-->
<!--        <strong class="me-auto">GitDash</strong>-->
<!--        <small>11 mins ago</small>-->
<!--        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>-->
<!--      </div>-->
<!--      <div class="toast-body">-->
<!--        {{message}}-->
<!--      </div>-->
<!--    </div>-->
    <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-header">
        <img src="..." class="rounded me-2" alt="...">
        <strong class="me-auto">Bootstrap</strong>
        <small class="text-body-secondary">just now</small>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div class="toast-body">
        {{message}}
      </div>
    </div>
  </div>
  
<!--  <div -->
<!--      class="toast position-fixed bottom-0 end-0" -->
<!--      :class="`bg-${variant} text-light`" -->
<!--      role="alert" -->
<!--      aria-live="assertive" -->
<!--      aria-atomic="true"-->
<!--  >-->
<!--    <div class="toast-header">-->
<!--      <strong class="me-auto">{{ title }}</strong>-->
<!--      <button -->
<!--          type="button" -->
<!--          class="btn-close" -->
<!--          data-bs-dismiss="toast" -->
<!--          aria-label="Close" -->
<!--          @click="closeToast">-->
<!--      </button>-->
<!--    </div>-->
<!--    <div class="toast-body">-->
<!--      {{ message }}-->
<!--    </div>-->
<!--  </div>-->
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "Notification"
    },
    message: {
      type: String,
      required: true
    },
    // lifetime: {
    //   type: Number,
    //   default: 5000 // Default lifetime in milliseconds
    // },
    variant: {
      type: String,
      default: "info" // Bootstrap variant color (e.g., 'info', 'success', 'warning', 'danger')
    }
  },
  // methods: {
  //   closeToast() {
  //     this.$emit('close');
  //   },
  // },
  // mounted() {
  //   if (this.lifetime) {
  //     // Close the toast after the specified lifetime
  //     setTimeout(() => {
  //       this.closeToast();
  //     }, this.lifetime);
  //   }
  // },
};
</script>

<style scoped>
/* Add any additional styles here */
</style>

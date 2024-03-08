<template>
  <div 
      class="toast position-fixed bottom-0 end-0" 
      :class="`bg-${variant} text-light`" 
      role="alert" 
      aria-live="assertive" 
      aria-atomic="true"
  >
    <div class="toast-header">
      <strong class="me-auto">{{ title }}</strong>
      <button 
          type="button" 
          class="btn-close" 
          data-bs-dismiss="toast" 
          aria-label="Close" 
          @click="closeToast">
      </button>
    </div>
    <div class="toast-body">
      {{ message }}
    </div>
  </div>
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
  methods: {
    closeToast() {
      this.$emit('close');
    },
  },
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

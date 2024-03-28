<template>
  <div class="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
    <!--            <p>&copy; 2024 Joshua Severn.</p>-->
    <p class="text-center">Made by Joshua Severn</p>
    <ul class="list-unstyled d-flex">
      <li class="ms-3"><a class="link-dark" href="#"><svg class="bi" width="24" height="24"><use xlink:href="#twitter"/></svg></a></li>
      <li class="ms-3"><a class="link-dark" href="#"><svg class="bi" width="24" height="24"><use xlink:href="#instagram"/></svg></a></li>
      <li class="ms-3"><a class="link-dark" href="#"><svg class="bi" width="24" height="24"><use xlink:href="#facebook"/></svg></a></li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    state: String
  }
}
</script>

<style scoped>

</style>
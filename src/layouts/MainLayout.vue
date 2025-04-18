<template>
  <div class="d-flex flex-column min-vh-100">
    <the-navbar/>
    <div class="container flex-grow-1">
      <router-view/>
    </div>
    <the-footer/>
  </div>
</template>

<script>
import TheNavbar from "@/components/ui/navbar/TheNavbar.vue";
import TheFooter from "@/components/TheFooter.vue";

export default {
  components: {TheNavbar, TheFooter}
};
</script>

<style scoped>
</style>

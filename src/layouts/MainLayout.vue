<template>
  <the-navbar/>
  <div class="container">
    <router-view/>
  </div>
  <the-footer/>
</template>
<script>
import TheNavbar from "@/components/TheNavbar.vue";
import TheFooter from "@/components/TheFooter.vue";

export default {
  setup() {
  },
  components: {TheFooter, TheNavbar}

}
</script>
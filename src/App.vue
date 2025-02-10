<template>
  <main-layout/>
</template>

<script>
import {useRoute} from "vue-router";
import {computed} from "vue";
import MainLayout from "@/layouts/MainLayout.vue";

export default {
  setup() {
    const route = useRoute();
    return {
      layout: computed(() => route.meta.layout)
    };
  },
  components: {MainLayout}
};
</script>

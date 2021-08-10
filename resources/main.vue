<template>
  <div class="h-screen flex flex-col">
    <Router></Router>
  </div>  
</template>

<script>
import Router from "./router.vue"
export default {
  name:"Main",
  components: {
    Router
  },
};
</script>
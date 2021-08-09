<template>
    <titlebar></titlebar>
    <router></router>
</template>

<script>
import titlebar from "./title-bar.vue"
import router from "./router.vue"
export default {
  components: {
    titlebar,
    router
  },
};
</script>
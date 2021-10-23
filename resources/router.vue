<template>
    <div style="background-color:#24292e" class="overflow-hidden flex flex-col w-full h-full bg-opacity-100">
        <Projects></Projects>
    </div>   
</template>

<script>
import Projects from './content/projects.vue'

export default {
    name:"Router",
    components: { 
        Projects 
    },
}
</script>

<style>
/* width */
::-webkit-scrollbar {
  width: 10px;
  height: 16px;
}

/* Track */
::-webkit-scrollbar-track {
  border-radius: 100vh;
  background: #24292e;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #cbd5e0;
  border-radius: 100vh;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #a0aec0;
}
</style>
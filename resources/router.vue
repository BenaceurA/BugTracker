<template>
    <TitleBar></TitleBar>
    <div class="flex-grow">
        <div style="background-color:#24292e" class="flow-root w-full h-full bg-opacity-100">
            <Projects></Projects>
        </div>
    </div>      
</template>

<script>

import TitleBar from './titlebar.vue'
import Projects from './content/projects.vue'

export default {
    name:"Router",
    components: {
        TitleBar, 
        Projects 
    },
}
</script>

<style>

</style>
<template>
    <div class="bg-gray-500 rounded text-white mt-5 mx-5" v-for="issue in issues" :key="issue.key"> <!-- work on the ui -->
        <div class="bg-gray-400 rounded-t flex justify-between p-2">
            <div class="flex">
                <div>{{issue.title}}</div>
                <div class="px-2">•</div>
                <div>{{issue.created}}</div>
            </div>
            <div v-on:click="$emit('emitDeleteIssue',issue.title)" class="cursor-pointer">
                <svg class="fill-current hover:text-red-600 hover:bg-opacity-90" height="21pt" viewBox="-57 0 512 512" width="21pt" xmlns="http://www.w3.org/2000/svg">
                    <path d="m156.371094 30.90625h85.570312v14.398438h30.902344v-16.414063c.003906-15.929687-12.949219-28.890625-28.871094-28.890625h-89.632812c-15.921875 0-28.875 12.960938-28.875 28.890625v16.414063h30.90625zm0 0"/>
                    <path d="m344.210938 167.75h-290.109376c-7.949218 0-14.207031 6.78125-13.566406 14.707031l24.253906 299.90625c1.351563 16.742188 15.316407 29.636719 32.09375 29.636719h204.542969c16.777344 0 30.742188-12.894531 32.09375-29.640625l24.253907-299.902344c.644531-7.925781-5.613282-14.707031-13.5625-14.707031zm-219.863282 312.261719c-.324218.019531-.648437.03125-.96875.03125-8.101562 0-14.902344-6.308594-15.40625-14.503907l-15.199218-246.207031c-.523438-8.519531 5.957031-15.851562 14.472656-16.375 8.488281-.515625 15.851562 5.949219 16.375 14.472657l15.195312 246.207031c.527344 8.519531-5.953125 15.847656-14.46875 16.375zm90.433594-15.421875c0 8.53125-6.917969 15.449218-15.453125 15.449218s-15.453125-6.917968-15.453125-15.449218v-246.210938c0-8.535156 6.917969-15.453125 15.453125-15.453125 8.53125 0 15.453125 6.917969 15.453125 15.453125zm90.757812-245.300782-14.511718 246.207032c-.480469 8.210937-7.292969 14.542968-15.410156 14.542968-.304688 0-.613282-.007812-.921876-.023437-8.519531-.503906-15.019531-7.816406-14.515624-16.335937l14.507812-246.210938c.5-8.519531 7.789062-15.019531 16.332031-14.515625 8.519531.5 15.019531 7.816406 14.519531 16.335937zm0 0"/>
                    <path d="m397.648438 120.0625-10.148438-30.421875c-2.675781-8.019531-10.183594-13.429687-18.640625-13.429687h-339.410156c-8.453125 0-15.964844 5.410156-18.636719 13.429687l-10.148438 30.421875c-1.957031 5.867188.589844 11.851562 5.34375 14.835938 1.9375 1.214843 4.230469 1.945312 6.75 1.945312h372.796876c2.519531 0 4.816406-.730469 6.75-1.949219 4.753906-2.984375 7.300781-8.96875 5.34375-14.832031zm0 0"/>
                </svg>
            </div>
        </div>
        <div class="p-2">
            <!-- <div class="flex justify-end cursor-pointer">
                <svg class="fill-current hover:text-green-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M18.363 8.464l1.433 1.431-12.67 12.669-7.125 1.436 1.439-7.127 12.665-12.668 1.431 1.431-12.255 12.224-.726 3.584 3.584-.723 12.224-12.257zm-.056-8.464l-2.815 2.817 5.691 5.692 2.817-2.821-5.693-5.688zm-12.318 18.718l11.313-11.316-.705-.707-11.313 11.314.705.709z"/>
                </svg>
            </div> -->

            <pre class="description" contenteditable="true">{{issue.description}}</pre>
        </div>
    </div>
</template>

<script>
import { ipcRenderer } from 'electron'

//we call this when we are mounted and when we update to count for new issues
function descChangeListener(selectedProject) {
    const descriptions = document.getElementsByClassName("description")
        Array.from(descriptions).forEach((description,index) => {
            description.addEventListener("input", inputEvt => {
            let content = description.innerText;       
            ipcRenderer.send("issue:Description",selectedProject,index,content); //then change it on DB
            });
        });
}
export default {
    name : "Issues",
    props : ["issues","selectedProject"],
    mounted : function () {
        descChangeListener(this.selectedProject);
    },
    updated : function (){
        descChangeListener(this.selectedProject);
    },
    created : function () {
        //THIS DONEST DO WHAT ITS SUPPOSED TO BE DOING
        // ipcRenderer.on("project:issueAdded",(event,stringData)=>{
        //     descChangeListener(this.selectedProject);
        // })
        ipcRenderer.on("issue:descriptionModified",()=>{
            ipcRenderer.send("data:retreive");
        });
    }
    
}
</script>

<style>
[contenteditable] {
  outline: 0px solid transparent;
}
</style>
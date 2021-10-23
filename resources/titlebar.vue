<template>
    <div class="titlebar bg-black flex justify-between">

        <div class="menu flex">
            <div v-on:click="$emit('emitBACK')" v-if="vue == 'Issues'" class="pt-1 px-2 h-full cursor-pointer hover:bg-white hover:bg-opacity-20">
                <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd">
                    <path fill="#ffffff" d="M2.117 12l7.527 6.235-.644.765-9-7.521 9-7.479.645.764-7.529 6.236h21.884v1h-21.883z"/>
                </svg>
            </div>
            <div v-if="vue == 'Issues'" class="flex">
                <div v-on:click="showAddIssue = !showAddIssue" title="Add new project" class="add cursor-pointer h-full pt-2 px-2  hover:bg-white hover:bg-opacity-20">
                <!-- <svg width="20" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd">
                        <path transform="scale(-1, 1) translate(-24, 0)" fill="#ffffff" d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z"/>
                </svg> -->
                <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#ffffff" d="M8 8v-8h1v8h8v1h-8v8h-1v-8h-8v-1h8z"/>
                </svg>
                </div>
                <div v-if="showAddIssue == true" class="h-full flex">
                    <input v-model="issueName" class="shadow appearance-none h-full px-3 text-gray-700 focus:outline-none focus:shadow-outline" id="add" placeholder="Issue title" type="text"> 
                    <button v-on:click="$emit('emitAddIssue',issueName); showAddIssue = !showAddIssue; issueName =''" class="bg-white text-white bg-opacity-20 px-2">Add Issue</button>
                </div>
            </div>
            <div v-if="vue == 'Projects'" class="flex">
                <div v-on:click="showAddProject = !showAddProject" title="Add new project" class="add cursor-pointer h-full pt-2 px-2  hover:bg-white hover:bg-opacity-20">
                <!-- <svg width="20" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd">
                        <path transform="scale(-1, 1) translate(-24, 0)" fill="#ffffff" d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z"/>
                </svg> -->
                <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#ffffff" d="M8 8v-8h1v8h8v1h-8v8h-1v-8h-8v-1h8z"/>
                </svg>
                </div>
                <div v-if="showAddProject == true" class="h-full flex">
                    <input v-model="projectName" class="shadow appearance-none h-full px-3 text-gray-700 focus:outline-none focus:shadow-outline" id="add" placeholder="Project name" type="text"> 
                    <button v-on:click="$emit('emitAddProject',projectName); showAddProject = !showAddProject; projectName =''" class="bg-white text-white bg-opacity-20 px-2">Add Project</button>
                </div>
            </div>
            
        </div>      

        <div class="select-none absolute text-gray-200 left-1/2 -translate-x-1/2 text-sm pt-2">
            {{vue}}
        </div>

        <div class="titlebar-controls flex">
            <div @click="minimizeApp" class="titlebar-minimize hover:bg-white hover:bg-opacity-20">
                <svg x="0px" y="0px" viewBox="0 0 10 1">
                    <rect fill="#ffffff" width="10" height="1"></rect>
                </svg>
            </div>
            <div @click="resizeApp" class="titlebar-resize hover:bg-white hover:bg-opacity-20">
                <svg v-if="!maximized" class="fullscreen-svg " x="0px" y="0px" viewBox="0 0 10 10">
                    <path fill="#ffffff" d="M 0 0 L 0 10 L 10 10 L 10 0 L 0 0 z M 1 1 L 9 1 L 9 9 L 1 9 L 1 1 z " />
                </svg>
                <svg v-if="maximized" class="maximize-svg " x="0px" y="0px" viewBox="0 0 10 10">
                    <mask id="Mask">
                        <rect fill="#FFFFFF" width="10" height="10"></rect>
                        <path fill="#000000" d="M 3 1 L 9 1 L 9 7 L 8 7 L 8 2 L 3 2 L 3 1 z" />
                        <path fill="#000000" d="M 1 3 L 7 3 L 7 9 L 1 9 L 1 3 z" />
                    </mask>
                    <path fill="#ffffff" d="M 2 0 L 10 0 L 10 8 L 8 8 L 8 10 L 0 10 L 0 2 L 2 2 L 2 0 z"
                        mask="url(#Mask)" />
                </svg>
            </div>
            <div @click="quitApp" class="titlebar-close hover:bg-red hover:bg-opacity-90">
                <svg x="0px" y="0px" viewBox="0 0 10 10">
                    <polygon fill="#ffffff" points="10,1 9,0 5,4 1,0 0,1 4,5 0,9 1,10 5,6 9,10 10,9 6,5"></polygon>
                </svg>
            </div>
        </div>
    </div>
</template>

<script>
const electron = require("electron");
const {ipcRenderer} = electron;

export default {
    name : "TitleBar",
    props : ["vue"],
    data(){
        return{
            showAddProject:false,
            showAddIssue:false,
            maximized : false,
            projectName : "",
            issueName : ""
        }
    },
    methods : {
        quitApp(){
            ipcRenderer.send("app:quit");
        },
        resizeApp(){
            this.maximized ? ipcRenderer.send("app:unmaximize") : ipcRenderer.send("app:maximize");
            this.maximized = !this.maximized;
        },
        minimizeApp(){
            ipcRenderer.send("app:minimize");
        },
    },
    created : function () {
        ipcRenderer.on("app:maximize",()=>{
            this.maximized = true;
        });
        ipcRenderer.on("app:unmaximize",()=>{
            this.maximized = false;
        });
        
    }
}
</script>

<style>
.titlebar{
    /* display: flex;
    justify-content: flex-end;
    background-color: black; */
    -webkit-app-region: drag;
    /* -webkit-user-select: none; */
}
.menu,
.titlebar-controls{
    /* display: flex; */
    -webkit-app-region: no-drag;
}

.titlebar-minimize ,
/* .maximize-svg ,
.fullscreen-svg , */
.titlebar-resize,
.titlebar-close{
    padding: 12px 18px;
}

.titlebar-close:hover{
    background-color: rgba(232, 17, 35, 0.9);
}

/* .titlebar-minimize:hover,
.titlebar-resize:hover,
.titlebar-fullscreen:hover
{
    background-color: rgba(255, 255, 255, 0.2);
} */

.titlebar-minimize svg,
.titlebar-resize svg.maximize-svg,
.titlebar-resize svg.fullscreen-svg,
.titlebar-close svg
{
    width: 10px;
    height: 10px;
    shape-rendering: crispEdges;
}

</style>

<template>
      <div class="titlebar">
        <div class="titlebar-controls">
            <div @click="minimizeApp" class="titlebar-minimize">
                <svg x="0px" y="0px" viewBox="0 0 10 1">
                    <rect fill="#ffffff" width="10" height="1"></rect>
                </svg>
            </div>
            <div @click="resizeApp" class="titlebar-resize">
                <svg v-if="!maximized" class="fullscreen-svg" x="0px" y="0px" viewBox="0 0 10 10">
                    <path fill="#ffffff" d="M 0 0 L 0 10 L 10 10 L 10 0 L 0 0 z M 1 1 L 9 1 L 9 9 L 1 9 L 1 1 z " />
                </svg>
                <svg v-if="maximized" class="maximize-svg" x="0px" y="0px" viewBox="0 0 10 10">
                    <mask id="Mask">
                        <rect fill="#FFFFFF" width="10" height="10"></rect>
                        <path fill="#000000" d="M 3 1 L 9 1 L 9 7 L 8 7 L 8 2 L 3 2 L 3 1 z" />
                        <path fill="#000000" d="M 1 3 L 7 3 L 7 9 L 1 9 L 1 3 z" />
                    </mask>
                    <path fill="#ffffff" d="M 2 0 L 10 0 L 10 8 L 8 8 L 8 10 L 0 10 L 0 2 L 2 2 L 2 0 z"
                        mask="url(#Mask)" />
                </svg>
            </div>
            <div @click="quitApp" class="titlebar-close">
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
    data(){
        return{
            maximized : false
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
        }
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
    display: flex;
    justify-content: flex-end;
    background-color: black;
    -webkit-app-region: drag;
    -webkit-user-select: none;
}
.titlebar-controls{
    display: flex;
    -webkit-app-region: no-drag;
}

.titlebar-minimize ,
.maximize-svg ,
.fullscreen-svg ,
.titlebar-close{
    padding: 12px 18px;
}

.titlebar-close:hover{
    background-color: rgba(232, 17, 35, 0.9);
}
.titlebar-minimize:hover,
.titlebar-resize:hover,
.titlebar-fullscreen:hover
{
    background-color: rgba(255, 255, 255, 0.2);
}

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

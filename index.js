const { data } = require("autoprefixer");
const { ipcMain } = require("electron");
const electron = require("electron");
const mongoose = require("mongoose");

let { app, BrowserWindow } = electron;
let mainWindow;

(function connect(params) {
    const connectionString = "mongodb+srv://root:root@formar.xmhvo.mongodb.net/Formar?retryWrites=true&w=majority"
    mongoose.connect(connectionString,{useUnifiedTopology:true,useNewUrlParser:true});
    mongoose.connection.once('open',()=>{
    console.log("connection opened!");
    })
})();

app.on("ready", () => {

    const schema = new mongoose.Schema({
        name: String,
        created: String,
        issues:[
            {
            title:String,
            description:String,
            created:String
            }
        ] // title description date
    });
    const Project = mongoose.model('Project',schema);

    mainWindow = new BrowserWindow({
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });

    mainWindow.loadURL(`FILE://${__dirname}/dist/main.html`);
    
    mainWindow.on("maximize",()=>{
        mainWindow.webContents.send("app:maximize");
    })
    
    mainWindow.on("unmaximize",()=>{
        mainWindow.webContents.send("app:unmaximize");
    })

    ipcMain.on("app:quit",()=>{
        app.quit();
    })
    
    ipcMain.on("app:maximize",()=>{
        mainWindow.maximize();
    })
    
    ipcMain.on("app:unmaximize",()=>{
        mainWindow.unmaximize();
    })
    
    ipcMain.on("app:minimize",()=>{
        mainWindow.minimize();
    })

    ipcMain.on("data:retreive",()=>{        
        Project.find({},(error, data)=>{
            console.log(data);       
            mainWindow.webContents.send("data:retreive",JSON.stringify(data));
        })      
    })

    ipcMain.on("project:add",(event , projectName)=>{   
        let date = new Date; 
        let project = new Project(
            {
                name:projectName,
                created: date.getDate() + "/" +date.getMonth() + "/" + date.getFullYear(),
                issues:[] // change this to empty array ?
            })  
        project.save().then(()=>{
            mainWindow.webContents.send("project:added");
        });
    })

    ipcMain.on("project:delete",(event, projectName)=>{
        Project.deleteOne({name:projectName}).then(()=>{
            mainWindow.webContents.send("project:deleted");
        })
    })

    ipcMain.on("project:addIssue",(event,projectName,issueTitle)=>{ //params were received
        let date = new Date;
        let filter = {"name": projectName};
        let issue = {
            title : issueTitle,
            description :"issue description",
            created: date.getDate() + "/" +date.getMonth() + "/" + date.getFullYear(),
        }
        Project.findOneAndUpdate(
            filter,
            {
                "$push" : {"issues":issue}
            },
            {new: true}
        ).then(data => {
            mainWindow.webContents.send("project:issueAdded",JSON.stringify(data));
        })
    })
    // console.log("selectedProject : "+projectName+" | issueTitle : "+issueTitle);
    ipcMain.on("project:deleteIssue",(event, projectName,issueTitle)=>{
        let filter = {"name": projectName};
        Project.findOneAndUpdate(
            filter,
            {
                "$pull" : {"issues":{"title" : issueTitle}}
            },
            {new: true}
        ).then(data => {
            mainWindow.webContents.send("project:issueAdded",JSON.stringify(data)); //issueAdded has same effect
            
        })
    })

    ipcMain.on("issue:Description",(event,projectName,index,content)=>{
        let filter = {"name" : projectName};
        let update = {};
        update["issues."+index+".description"] = content;
        Project.findOneAndUpdate(
            filter,
            {
               "$set" :  update
            },
            {new:true}
        ).then(data =>{
            mainWindow.webContents.send("issue:descriptionModified");
        }).catch(err =>{
            console.log(err)
        })
        // console.log(projectName);
        // console.log(content);
    })
})




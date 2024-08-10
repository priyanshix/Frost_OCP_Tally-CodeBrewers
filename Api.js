const express = require('express');
const app = express();
const bodyP = require('body-parser');
const compiler = require('compilex');
const options = {stats:true};
compiler.init(options);
app.use(bodyP.json());
app.use("/codemirror-5.65.17",express.static("C:/Users/Prayani/Desktop/folders/Projects/OCP/codemirror-5.65.17"))
app.get("/",function(req,res){
    res.sendFile("C:/Users/Prayani/Desktop/folders/Projects/OCP/index.html")
})
app.post("/compile",function(req,res){
    var code = req.body.code;
    var input = req.body.input;
    var lang = req.body.lang;
    try{
        if(lang="CPP"){
            if(!input){
                var envData = { OS : "windows" , cmd : "g++"}; // (uses g++ command to compile )
                compiler.compileCPP(envData , code , function (data) {
                if(data.output){
                    res.send(data);
                }
                else{
                    res.send({output:"error"});
                }});
            }
            else{
                //if windows  
                var envData = { OS : "windows" , cmd : "g++"}; // (uses g++ command to compile )
                compiler.compileCPPWithInput(envData , code , input , function (data) {
                if(data.output){
                    res.send(data);
                }
                else{
                    res.send({output:"error"});
                }});
            }
        }
    }
    catch(err){
        console.log("error");
    }
    
        //if windows  
         
})
app.listen(8000)
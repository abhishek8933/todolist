const express=require("express");
const bodyparser=require("body-parser");
const app =express();
app.use(bodyparser.urlencoded({extended:true}));
const items=[];
const workitems=[];

app.set("view engine","ejs");
app.use(express.static("public"));

app.get("/",function (req,res) {
    var today=new Date();
    var options ={
        weekday:"long",
        day:"numeric",
        month:"long"
    };
    var day=today.toDateString("en-US",options);
    res.render("index",{key:day,newlistitem:items});
})
app.post("/",function (req,res){
    if(req.body.button ==='work'){
        var  item=req.body.newitem;
        workitems.push(item);
        res.redirect("/work");
    }
    else{
    var  item=req.body.newitem;
    items.push(item);
    console.log(req.body);
    res.redirect("/");
    }
})

app.get("/about",function (req,res) {
    res.render("about");
})
app.get("/work",function (req,res){
    res.render("index",{key:"work list",newlistitem:workitems});
})
app.post("/work",function (req,res){
    let item=req.body.newitem;
    workitems.push(item);
    res.redirect("/work");
})
app.listen(3000,function () {
    console.log("server has started at port 3000");
})
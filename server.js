const express = require("express");
const bodyparser = require("body-parser");
const session = require("express-session");
const cookieparser = require("cookie-parser");

const nodeMailer = require("nodemailer")

const {User} = require("./model/user.js");
const {Order} = require("./model/order.js");
const {Warehouse} = require("./model/warehouse.js");
const {Sugg} = require("./model/suggestion.js");
const {Driver} = require("./model/driver.js");
const {Status} = require("./model/status.js")


const app = express();


const mongoose = require('mongoose')
const uri = "mongodb+srv://kyletagle727:1234567890@cluster0-diqll.mongodb.net/JBToyBalloons?retryWrites=true&w=majority";
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err));

const urlencoder = bodyparser.urlencoded({
    extended: false
})

app.use(cookieparser())
app.use(express.static(__dirname + "/public"));
app.use(session({
    secret : "secret name",
    resave : true,
    saveUninitialized : true,
    name : "cookie monster",
    cookie : {
        maxAge : 1000*60*60*24*365*2
    }
}))

app.get(["/","/home"], function(req,res){
    res.render("homepage.hbs")
})


app.get("/Services", function(req,res){
    res.render("services.hbs")
})

app.get("/aboutUs", function(req,res){
    res.render("about.hbs")
})

app.get("/contactUs", function(req,res){
    res.render("contact.hbs")
})

app.get("/admin", function(req,res){
    console.log("GET ADMIN")
    res.render("admin.hbs")
})

app.get("/office", function(req,res){
    console.log("GET office")
    res.render("office.hbs")
})

app.get("/warehouse", function(req,res){
    console.log("GET LOGINPAGE")
    res.render("warehouse.hbs")
})



app.get("/order", function(req,res){
    Order.findOne({
        _id
    }, 
    (err, doc)=>{
        if(err){
            res.send(err)
        }
        else if(!doc){
            res.send("Order does not exist")
        }
        else{
            res.render("order.hbs",{
                order:doc
            })
        }
    }) 
})


app.get("/admin", function(req,res){
   
})

app.post("/addDriver", urlencoder, function(req,res){

})

app.post("/updateDriver", urlencoder, function(req,res){
    
})

app.post("/deleteDriver", urlencoder, function(req,res){
    
})

app.post("/track", urlencoder, function(req, res){
    let orderID = req.body.trackNumber

    Status.findOne({orderID:orderID}, (err,doc)=>{
        if(err) {
            console.log(err)
        }
        if(doc) {
            console.log(doc)
            let status = doc.status
            res.render("homepage.hbs", {orderID:orderID, status:status})
        }
        else {
            res.render("homepage.hbs")
        }
    })
})

app.post("/contact", urlencoder, function(req, res) {
    let transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
            user: 'jbtoy.bot@gmail.com',
            pass: 'JBBot!11'
        }
    })


    let text ="From: "+ req.body.name + "\n" + req.body.text + "\n\nSent From: " + req.body.email
    const message = {
        from: req.body.email,
        to: 'cbroqueza100598@gmail.com',
        subject: req.body.subject,
        text: text
    }

    transporter.sendMail(message, (err,info)=>{
        if(err)
            console.log(err)
        else
            console.log(info)
    })

    res.render("contact.hbs")
})






app.listen(process.env.PORT|| 3001, function(){
    console.log("Live at port 3001");
})
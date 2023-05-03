require('dotenv').config()
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const express = require("express");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const session = require('express-session');
const MongoDBSession = require('connect-mongodb-session')(session);

//require('from other js')
const {connectDB} = require("./models/connect.js");
const {User} = require("./models/user.js");
const {weeks,MONTH,currentDate} = require("./models/dateDetails.js");
const {findingDataOfTheDay}=require("./main_functions/fetch.js");
const {updateOraddevents} =  require("./main_functions/update.js");
const {deleteEvent}=  require("./main_functions/delete.js");
const {findbyMonth}=require("./main_functions/findList.js");
const {fetchArray} = require("./main_functions/fetchArray.js");


//main contet
const PORT = process.env.PORT || 3000;


const app = express();
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

connectDB();

const store = new MongoDBSession({
    uri:process.env['MONGODB_CON'],
    collection:"session"
  })

  app.use(session({
    secret: process.env['SESSION_SECRET'],
    resave: false,
    saveUninitialized: false,
    store:store,
  }));

const isAuth=(req,res,next) => {
    if(req.session.isAuth){
        next();
    }else{
        res.redirect("/login");
    }
};



//login.ejs
app.route("/login")
  .get(function (req, res) {
    if(req.session.isAuth){
      month=MONTH[currentDate[1]];
      res.render("/todayslist",{ currentDate: currentDate,month:month})
    }
    res.render("login",{ currentDate: currentDate});
  })
  .post(async function (req, res) {
        const{email, password} = req.body;
   const user=await User.findOne({email:email}) 
    if(!user){
        res.redirect("/login");
    }else{
        const Match = await bcrypt.compare(password,user.password);
        if(!Match){
            console.log("wrong password");
            res.redirect("/login");
        }else{
            req.session.isAuth= true;
            req.session.email = email;
            res.redirect("/todayslist")
        }
    }

    });


 //todayslist.ejs
  app.route("/todayslist")
  .get(isAuth,  function (req, res) {
    var date=[currentDate[0],currentDate[1],currentDate[2]];
    var useremail = req.session.email;
    // console.log(date);
 const Lt = findingDataOfTheDay(useremail,date)
.then(data=>{
    // console.log(data);
    var month = MONTH[date[1]]
    res.render("todayslist",{ currentDate: currentDate,newList:data,month:month});

})
.catch(err=>console.log(err));


  });



////signup.ejs
  app.route("/signup")
  .get(function (req, res) {
    if(req.session.isAuth){
      res.redirect("/todayslist")
    }
        res.render("signup",{ currentDate: currentDate});
  })
  .post(async function (req, res) {
   const{username,email,password} = req.body;
   let user=await User.findOne({email:email}) 
   if (user) {
        console.log("email already exists")
        return res.redirect("/signup");
    }else{
        const hashedPass = await bcrypt.hash(password,10);
        user = new User({
            username,
            email,
            password:hashedPass
        })
        await user.save();
        res.redirect("/login");

    }
  });



//homepage.ejs
app.route("/")
.get(function (req, res){
  res.render("homepage",{ currentDate: currentDate});
})



//find.ejs
app.route("/find")
.get(isAuth,function (req, res){
  // var ListItems = ["not"]
  res.render("find");
})
.post(function (req, res){
  useremail=req.session.email;
  const {month} = req.body;
  // console.log(month);
  mnt = MONTH.indexOf(month)

  var ML= findbyMonth(useremail,mnt)
  .then(data=>{
    // console.log(data);
    res.render("foundList",{ListItems:data,month:month});

  })
  .catch(err=>{
    console.log(err);
  });

});



//addevent.ejs
app.route("/addevent")
.get(isAuth,function (req, res){
  res.render("addevent");
})
.post(function (req, res){
  userEmail=req.session.email;
  const {eventdate,event} = req.body;
  console.log(eventdate);
  console.log(event);


    var date = eventdate.split("-")
    newDate=[date[2]-0,date[1]-1,date[0]-0];
  console.log(newDate);
  updateOraddevents(userEmail,newDate,event);
  res.redirect("/addevent")
});



//update user data
app.route("/update").post(function (req, res) {
    userEmail=req.session.email;
    const{date,month,year, newItem} = req.body;
    reqDate=[Number(date),Number(month),Number(year)];
    updateOraddevents(userEmail,reqDate,newItem);
    res.redirect("/todayslist");
});


///delete.js
app.route("/delete")
.post(function (req, res) {
  userEmail=req.session.email;
  const{date, delItem} = req.body;
  // console.log(date)
  const reqDate = (date.split(',')).map(Number);
  console.log(reqDate);
  console.log(delItem);
  fetchArray(userEmail,reqDate)
    .then(data=>{
    console.log(data[delItem]);
    deleteEvent(userEmail,reqDate,data[delItem]);
    })
    .catch(err=>{
      console.log(err);
    });

  res.redirect("/todayslist");
})



///logout
app.route("/logout")
.get(function (req, res) {
  req.session.destroy((err)=>{
    if(err) throw err;
  })
  res.redirect("/login")
})

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
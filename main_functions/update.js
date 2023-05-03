const {connectDB} = require(".././models/connect.js");
const {User} = require(".././models/user.js");
// connectDB();



function updateOrAddEvents(useremail,date,event){

      //add date and eventsto the user's data  
      const addDateEvent=async()=>{
        try{
          var result = await User
            .findOneAndUpdate({email: useremail}, 
              {$push: {eventDate: {date: date, events: [event]}}},
              {safe: true, upsert: true});
          console.log("Event and date added to users DB: "+result);
          }catch(err){
          console.log("Error in addind evet and date to user's database"+err);
        }
      };
      
      //add sigle to the esisting date of the user to dB
      const addEvent= async()=>{
        try{
          var result = await User
          .findOneAndUpdate({email:useremail,"eventDate.date":date},
          {$push : {"eventDate.$.events":event}});
          console.log("Added event to date: "+result);
        }catch(err){
          console.log("Error in adding the event to existing date in user db:" + err);
        }
      }



  //finding users data
  const findUser = async()=>{
    try{
      var result = await User
      .findOne({email: useremail,"eventDate.date":date});
      // console.log("data of the user of given date:"+result);
      
      if(result==null){
        console.log("no events found on the day");
        addDateEvent();
      }else{
        //events found on that date
        console.log(result.eventDate);
        addEvent();
      }

    }catch(err){
      console.log(err);
    }
  }
  findUser();




};


// updateOrAddEvents(useremail, currentDate,event);
module.exports={updateOrAddEvents};
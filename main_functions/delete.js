const {connectDB} = require(".././models/connect.js");
const {User} = require(".././models/user.js");
// connectDB();

const deleteEvent=async(useremail,date,event)=>{
try{
    var findevent = await User
    .findOne({email:useremail,"eventDate.date":date,"eventDate.events":event});
    // console.log(findevent.eventDate); 
    findevent.eventDate.forEach(item=>{
        if(item.date[0]===date[0] & item.date[1]===date[1] & item.date[2]===date[2] ){
                        // console.log(item.events.length);
                        eventLength=item.events.length;
                        event_id=item._id;
                        // console.log(event_id);
    }});
    if(eventLength ===1){
        var delEvent1 = await User.
        findOneAndUpdate({},{$pull:{eventDate:{ _id:event_id}}});
        console.log(delEvent1);

    }else if(eventLength > 1){
        var DelEvent = await User
        .findOneAndUpdate({email:useremail,"eventDate.date":date,"eventDate.$.events":event},
        {$pull : {"eventDate.$.events":event}})  ;
        console.log(DelEvent);
    }




   




}catch(err){
    console.log("error deleting event from the date :"+err)
}
}


module.exports ={deleteEvent};
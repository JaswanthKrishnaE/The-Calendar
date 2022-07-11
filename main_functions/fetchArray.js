const {connectDB} = require(".././models/connect.js");
const {User} = require(".././models/user.js");
// connectDB();
const fetchArray=async(useremail,date)=>{
    try{
        var list = [];
        var result = await User
        .findOne({email:useremail,"eventDate.date":date});
        // console.log(result);
                    if(result == null ){
                    // console.log("No events are saved in the day.");
                    list=[{date:date,events:["NO events found"]}]
                    }else if(result.eventDate){
                    result.eventDate.forEach(item=>{
                        // console.log(item.date)
                        // console.log(date)

                        if(item.date[0]===date[0] & item.date[1]===date[1] & item.date[2]===date[2]){
                            // console.log(item.events);
                            list = item.events
                            
                        }
                    })
                    
                }
                // console.log(list);
                return list;
        }catch(err){
        console.log(err);
    }
}

module.exports = {fetchArray}




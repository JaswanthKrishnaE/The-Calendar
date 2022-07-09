const {connectDB} = require(".././models/connect.js");
const {User} = require(".././models/user.js");
// connectDB();

const findbyMonth=async(useremail,month)=>{
try{    var list=[];
    var results = await User.
    findOne({email:useremail});
    // console.log(results.eventDate);
    if(results == null ){
        // console.log("No events are saved in the month.");

        list=[{date:[2,2,2022],events:["NO events found"]}]

    }
    else if(results.eventDate){

        results.eventDate.forEach(item=>{
            // console.log(item);
            if(item.date[1]==month){
                list.push(item);
            }
        })
    }
    // console.log(list);
    return list;
}catch(err){
    console.log(err);
}
}



module.exports = {findbyMonth}
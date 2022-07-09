// const {connectDB} = require("./models/connect.js");
// const {User} = require("./models/user.js");
// const {findingDataOfTheDay}=require("./main_functions/fetch.js");
// const {updateOrAddEvents} =  require("./main_functions/update.js");
// const {deleteEvent}=  require("./main_functions/delete.js")
// const {findbyMonth}=require("./main_functions/findList.js")



async function coDB(){
    try{
        await mongoose.connect("mongodb+srv://Jaswanthkrishna:9959133159@cluster0.au4y4vb.mongodb.net/Calendar?retryWrites=true&w=majority", {useNewUrlParser: true});
        console.log("Connected to server");
    }catch(err){
        console.log(err);
    }
};
coDB();



                
                
                
                const date=[9,6,2022];
                const delItem="2"
                const useremail = "Admin@admin.com";




// deleteEvent(useremail,date,delItem);

// findingDataOfTheDay(useremail,date);







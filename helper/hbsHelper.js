//helper functions for .hbs files

const exphbs = require('express-handlebars')
var hbs = exphbs.create({});

hbs.handlebars.registerHelper("find", function(data){
    console.log(data)
    return ""
});

hbs.handlebars.registerHelper("findWeight", function(data) {
    // get the latest value 
    return data[data.length -1].value;
});

hbs.handlebars.registerHelper("findInsulinTaken", function(data) {
    // get the latest value 
    return data[data.length -1].value;
});

hbs.handlebars.registerHelper("findExercise", function(data) {
    // get the latest value 
    return data[data.length -1].value;
});

hbs.handlebars.registerHelper("findBloodGlucose", function(data) {
    // get the latest value 
    return data[data.length -1].value;
});

hbs.handlebars.registerHelper("findTime", function(data) {
    // get the latest value 
    return data[data.length-1].time;
});

hbs.handlebars.registerHelper("findComment", function(data){
    console.log(data)
    let AuDate = new Date().toLocaleString("en-US", {timeZone: "Australia/Sydney"});
    let dateString = AuDate.toString().replace(',', ' ');
    const currentMonth = dateString.split('/')[1];
    const currentDay = dateString.split('/')[0];
    let time = data[data.length-1].time.split('/')
    if(data[data.length-1].comment == "Not Required"){
        return "+ Comment"
    }
    //if the time period not matching, return null
    if(time[0] != currentDay || time[1] != currentMonth){
        return ""
    }
    const comment = data[data.length-1].comment
    if(comment.length>30){
        return comment.substring(0, 30) + "...";
    }
    return comment;
});

hbs.handlebars.registerHelper("getValue", function(data) {
    // get the latest value 
    const latest = data[data.length-1]
    return latest.value
});

hbs.handlebars.registerHelper("getTime", function(data) {
    // get the data updated time, and do some formating
    const latest = data[data.length-1].time
    if (latest){
        const time = latest.split(" ")[2].split(":")
        const date = latest.split(" ")[0].split("/")
        // formating the time 
        return twoDigit(date[0])+"/"+twoDigit(date[1])+"/"+twoDigit(date[2])+" "+twoDigit(time[0])+":"+twoDigit(time[1])+" "+latest.split(" ")[3]
    }
    else{
        return latest
    }
    
});

//add a 0 prior to single digit date for example 1-9
function twoDigit(data){
    if (data.length<2){
        return "0"+data
    }else{
        return data
    }
}

// check patient's safty threshold
hbs.handlebars.registerHelper("checkSafety", function(safety,value,index) {
    const bound =  safety[index];
    // if the data is required 
    if(!bound.includes("Not Required")){
        // find the upper and lower bound
        const lower = Number(bound.split("-")[0])
        const upper = Number(bound.split("-")[1])
        const latestValue = value[value.length-1].value
        // if the updated value is <=lower or >= upper, change element style
        if(latestValue<=lower || latestValue>=upper){
            return "color: red; font-style: italic; font-weight: bold; "
        }
    }
    return ""
});


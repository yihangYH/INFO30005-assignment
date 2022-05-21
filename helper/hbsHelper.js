//helper functions for .hbs files

const exphbs = require('express-handlebars')
var hbs = exphbs.create({});

// Warning: untested code
hbs.handlebars.registerHelper('each_upto', function(ary, max, options) {
    if(!ary || ary.length == 0)
        return options.inverse(this);
    var result = [ ];
    const newary = ary.slice(-7);
    for(var i = 0; i < max && i < newary.length; ++i)
        result.push(options.fn(newary[i]));
    return result.join('');
});

hbs.handlebars.registerHelper('convert', function(safety,index){
    return String(safety[index])
});

hbs.handlebars.registerHelper('findRank', function(rank,index){
    return rank[index][0]
});

hbs.handlebars.registerHelper('findPatientRank', function(rank, userid){
    for(let i =0; i < rank.length; i++){
        if(rank[i][2] == userid){
            if(rank[i][1] > 100){
                return "100"
            }else{
                return rank[i][1]
            }
        }
    }
});

hbs.handlebars.registerHelper('findPatientPlace', function(rank, userid){
    for(let i =0; i < rank.length; i++){
        if(rank[i][2] == userid){
            if(i  == 1 || i == 0){
                return "1st"
            }else if(i == 2){
                return "2nd"
            }else if(i == 3){
                return "3rd"
            }else{
                return i+"th"
            }

        }
    }
});

hbs.handlebars.registerHelper("findLastDate", function(data){
    const lastDate = data.split(' ')[0];
    return lastDate
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

// reverse the data array, so the data will display from latest
hbs.handlebars.registerHelper("reverse", function(data) {
    var reverseArray = []
    for (var i = data.length - 1; i >= 0; i--) {
        reverseArray.push(data[i])
    }
    console.log(reverseArray)
    return reverseArray;
    
});

hbs.handlebars.registerHelper("patientDetailGetValue", function(value, require,index) {

    if(require[index].includes("Not")){
        return "Not Required"
    }else{
        return value
    }
})

hbs.handlebars.registerHelper("patientDetailGetTime", function(value, require,index) {

    if(require[index].includes("Not")){
        return ""
    }else{
        return value
    }
})

hbs.handlebars.registerHelper("patientDetailGetComment", function(value, require,index) {
    if(require[index].includes("Not")){
        return "Not Required"
    }else{
        return value
    }
})


hbs.handlebars.registerHelper("findBloodGlucose", function(data) {
    // get the latest value 
    return data[data.length -1].value;
});

hbs.handlebars.registerHelper("findTime", function(data) {
    if(data.length == 0){
        return "Not updated yet"
    }
    // get the latest value 
    return data[data.length-1].time;
});

// find the value from data
hbs.handlebars.registerHelper("value", function(data) {
    if(data.length == 0){
        return "No data yet"
    }
    if(data[data.length -1].value != "Not Required"){
        return data[data.length -1].value ;
    }
});

// find the comment from data
hbs.handlebars.registerHelper("comment", function(data) {
    if(data.length == 0){
        return "No comment yet"
    }
    if(data[data.length -1].value != "Not Required"){
        return data[data.length -1].comment ;
    }
});

// find the age based on the patient birth
hbs.handlebars.registerHelper("findAge", function(birth) {
    var year = birth.split("/")[0]
    let AuDate = new Date().toLocaleString("en-US", {timeZone: "Australia/Sydney"});
    let currentYear = AuDate.toString().split(" ")[0].replace(",","").split("/")[2]
    return currentYear - year
});

// check if the data is not required
hbs.handlebars.registerHelper("checkNotRequired", function(data, safety, index) {
    if(!safety[index]){
        return "display:none"
    }
    if(data.length == 0){
        return "No comment yet"
    }
    if(data[data.length -1].value == "Not Required"){
        return "display:none"
    }
});

// find the data comment
hbs.handlebars.registerHelper("findComment", function(data){
    let AuDate = new Date().toLocaleString("en-US", {timeZone: "Australia/Sydney"});
    let dateString = AuDate.toString().replace(',', ' ');
    const currentMonth = dateString.split('/')[1];
    const currentDay = dateString.split('/')[0];
    let time = data[data.length-1].time.split('/')
    if(data[data.length-1].comment == "Not Required" || data[data.length-1].comment == ""){
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

// get the data value
hbs.handlebars.registerHelper("getValue", function(data, safety, index) {
    if(!safety[index]){
        return "Not Required"
    }
    if(data.length == 0){
        return "No data yet"
    }
    // get the latest value 
    const latest = data[data.length-1]
    return latest.value
});

// get comment time
hbs.handlebars.registerHelper("getCommentTime", function(data) {
    if(data.length == 0){
        return "No time yet"
    }
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

// get the data updated time
hbs.handlebars.registerHelper("getTime", function(data, safety, index) {
    // get the data updated time, and do some formating
    if(!safety[index]){
        return 
    }
    if(data.length == 0){
        return "Not updated yet"
    }
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

    if(value.length == 0){
        return ""
    }
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

// check patient's safty threshold
hbs.handlebars.registerHelper("checkSafety1", function(safety,value,index) {
    if(value.includes("No")){
        return ""
    }
    const bound =  safety[index];
    // if the data is required 
    if(!bound.includes("Not Required")){
        // find the upper and lower bound
        const lower = Number(bound.split("-")[0])
        const upper = Number(bound.split("-")[1])
        // if the updated value is <=lower or >= upper, change element style
        if(value<=lower || value>=upper){
            return "color: red; font-style: italic; font-weight: bold; "
        }
    }
    return ""
});


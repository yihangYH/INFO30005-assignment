const exphbs = require('express-handlebars')
var hbs = exphbs.create({});


hbs.handlebars.registerHelper("findWeight", function(data) {

    return data[data.length -1].value;
});

hbs.handlebars.registerHelper("findInsulinTaken", function(data) {

    return data[data.length -1].value;
});

hbs.handlebars.registerHelper("findExercise", function(data) {

    return data[data.length -1].value;
});

hbs.handlebars.registerHelper("findBloodGlucose", function(data) {
    return data[data.length -1].value;
});

hbs.handlebars.registerHelper("findTime", function(data) {
    return data[data.length-1].time;
});

hbs.handlebars.registerHelper("findComment", function(data){
    let AuDate = new Date().toLocaleString("en-US", {timeZone: "Australia/Sydney"});
    let dateString = AuDate.toString().replace(',', ' ');
    const currentMonth = dateString.split('/')[1];
    const currentDay = dateString.split('/')[0];
    let time = data[data.length-1].time.split('/')

    if(data[data.length-1].comment == "Not Required"){
        return "+ Comment"
    }

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
    const latest = data[data.length-1]
    return latest.value
});

hbs.handlebars.registerHelper("getTime", function(data) {
    const latest = data[data.length-1].time
    if (latest){
        const time = latest.split(" ")[2].split(":")
        const date = latest.split(" ")[0].split("/")
        return twoDigit(date[0])+"/"+twoDigit(date[1])+"/"+twoDigit(date[2])+" "+twoDigit(time[0])+":"+twoDigit(time[1])+" "+latest.split(" ")[3]
    }
    else{
        return latest
    }
    
});

function twoDigit(data){
    if (data.length<2){
        return "0"+data
    }else{
        return data
    }
}

hbs.handlebars.registerHelper("checkSafety", function(safety,value,index) {
    const bound =  safety[index];
    if(!bound.includes("Not Required")){
        const lower = Number(bound.split("-")[0])
        const upper = Number(bound.split("-")[1])
        const latestValue = value[value.length-1].value
        if(latestValue<=lower || latestValue>=upper){
            return "color: red; font-style: italic; font-weight: bold; "
        }
    }
    return ""
});
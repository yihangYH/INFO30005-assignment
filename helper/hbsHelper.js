const exphbs = require('express-handlebars')
var hbs = exphbs.create({});

hbs.handlebars.registerHelper("Json", function(data) {
    // test purpose, will implement functionality later
    // console.log(Object(data).length);
    // console.log(Object(data)[0]);
});

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
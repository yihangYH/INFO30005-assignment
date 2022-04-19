const exphbs = require('express-handlebars')
var hbs = exphbs.create({});

hbs.handlebars.registerHelper("Json", function(data) {
    // test purpose, will implement functionality later
    // console.log(Object(data).length);
    // console.log(Object(data)[0]);
});


hbs.handlebars.registerHelper("ifEmpty", function(data) {
    console.log(data)
    if(data.length == 0){
        return "No Data Yet";
    }
});

hbs.handlebars.registerHelper("findWeight", function(data) {

    return data[data.length-1].weight;
});

hbs.handlebars.registerHelper("findInsulinTaken", function(data) {

    return data[data.length-1].insulin_taken;
});

hbs.handlebars.registerHelper("findExercise", function(data) {

    return data[data.length-1].exericse;
});

hbs.handlebars.registerHelper("findBloodGlucose", function(data) {

    return data[data.length-1].blood_glucose;
});

hbs.handlebars.registerHelper("findTime", function(data) {

    return data[data.length-1].time;
});
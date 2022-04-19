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
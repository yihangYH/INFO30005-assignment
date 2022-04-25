const exphbs = require('express-handlebars')
var hbs = exphbs.create({});


hbs.handlebars.registerHelper("getValue", function(data) {
    const latest = data[data.length-1]
    return latest.value
});

hbs.handlebars.registerHelper("getTime", function(data) {
    const latest = data[data.length-1].time
    const time = latest.split()[1]
    return time
});
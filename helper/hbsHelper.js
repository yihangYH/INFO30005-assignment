const exphbs = require('express-handlebars')
var hbs = exphbs.create({});

hbs.handlebars.registerHelper("Json", function(data) {
    // test purpose, will implement functionality later
    // console.log(Object(data).length);
    // console.log(Object(data)[0]);
});

const exphbs = require('express-handlebars')
var hbs = exphbs.create({});


hbs.handlebars.registerHelper("test", function(data) {
    console.log(data[0].weight)
});

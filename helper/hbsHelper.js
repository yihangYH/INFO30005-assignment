const exphbs = require('express-handlebars')
var hbs = exphbs.create({});


hbs.handlebars.registerHelper("getValue", function(data) {
    const latest = data[data.length-1]
    return latest.value
});

hbs.handlebars.registerHelper("getTime", function(data) {
    const latest = data[data.length-1].time
    if (latest){
        const time = latest.split(" ")[2].split(":")
        return twoDigit(time[0])+":"+twoDigit(time[1])+" "+latest.split(" ")[3]
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
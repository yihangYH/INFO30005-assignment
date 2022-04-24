const express = require('express')
const app = express()
const clinicianRouter = require('./routes/clinicianRouter')
require("./models")

app.get('/', (req, res) => {
    res.send('Our demo app is working')
});


app.use('/api/clinician', clinicianRouter)

app.use(express.static('public'))
const exphbs = require('express-handlebars')

app.engine('hbs', exphbs.engine({
    defaultlayout: 'main',
    extname: 'hbs'
}))

app.set('view engine', 'hbs')

app.use('/clinician', (req,res)=>{
    res.render('clinician.hbs')
})

app.listen(3000, ()=>{
    console.log('Demo app is listening on port 3000')
});
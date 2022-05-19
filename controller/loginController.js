const {patient} = require('../models/patient.js')
const {clinicianNote} = require("../models/data")
const clinicianData = require("../models/clinician")
// find specific patient based on the id, and populate with 4 data and render data.hbs
const getPatient = async(req,res,next) => {
    try {
        const patientData = await patient.findOne({_id:req.params.id})
        .populate("weight")
        .populate("exercise")
        .populate("bloodGlucose")
        .populate("insulinTaken").lean();
        var currentPatientRate= caculateRate(patientData);
        Object.assign(patientData, {"rate": patientData[1]});

        var patientRate = [];
        const allPatient = await patient.find({_id:{$nin:req.params.id}}).populate("weight")
        .populate("exercise")
        .populate("bloodGlucose")
        .populate("insulinTaken").lean();
        // caculate each patient engagement rate 
        for(let i =0 ; i < allPatient.length; i++){
            patientRate.push(caculateRate(allPatient[i]));
        }
        patientRate.push(currentPatientRate);
        // sort engagement rate 
        patientRate.sort(function(a,b){
            return b[1] - a[1];
        });
        // assign engagement rate  to patientData named as rank
        Object.assign(patientData, {"rank": patientRate});
        res.render('data.hbs', {patientInfo: patientData})
    } catch (error) {
        return next(error)
    }
}

// function use to caculate engagement rate
function caculateRate(patient){
    var maxCount = findMacCountDataUpdated(patient);
    if(maxCount[0]>0){var rate  = findRate(maxCount)};
    rate = (rate * 100)
    rate = Math.round(rate);
    return [patient.screen_name, rate,patient.userid]
}

// caculate engagement rate
function findRate(maxCount){
    var fisrtTime = maxCount[1][0].time;
    let AuDate = new Date().toLocaleString("en-US", {timeZone: "Australia/Sydney"});
    let dateString = AuDate.toString().replace(',', ' ');
    currDateString = dateString.split(" ")[0];
    firstUpdate = fisrtTime.split(" ")[0];
    var date1 = new Date(firstUpdate);
    var date2 = new Date(currDateString);
    var Difference_In_Time = date2.getTime() - date1.getTime();
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    if(Difference_In_Days == 0){
        Difference_In_Days = 1;
    }
    return maxCount[0]/Difference_In_Days;
};

// find which data has been updated most
function findMacCountDataUpdated(currentPatient){
    var max = 0;
    var dataName = null;
    if(currentPatient.bloodGlucose.length > max && currentPatient.bloodGlucose[0].value != "Not Required"){
        max = currentPatient.bloodGlucose.length;
        dataName = currentPatient.bloodGlucose;
    }
    if(currentPatient.weight.length > max && currentPatient.weight[0].value != "Not Required"){
        max = currentPatient.weight.length;
        dataName = currentPatient.weight;
    }
    if(currentPatient.insulinTaken.length > max &&  currentPatient.insulinTaken[0].value != "Not Required"){
        max = currentPatient.insulinTaken.length;
        dataName = currentPatient.insulinTaken;
    }
    if(currentPatient.exercise.length > max && currentPatient.exercise[0].value != "Not Required"){
        max = currentPatient.exercise.length;
        dataName = currentPatient.exercise;
    }
   return [max,dataName];
}


//get corresponding info from DB 
// and populate with patient and 4 data
// then render the clinician.hbs
const getClinician = async (req,res, next) =>{
    try{
        // find the clinician from DB based on the object id, and populate with patient collection
        const clinician = 
            await clinicianData.findOne({_id: req.params.id}).populate("patient").lean()
        // iterate all clinician's patients and populate the data related to the patitent 
        for(let i = 0; i < Object.keys(clinician.patient).length; i++){
            const patientData = await patient.findById({_id:clinician.patient[i]._id})
            .populate("weight")
            .populate("exercise")
            .populate("bloodGlucose")
            .populate("insulinTaken").lean()
            // assign founded data to the JSON
            clinician.patient[i].weight = patientData.weight
            clinician.patient[i].bloodGlucose = patientData.bloodGlucose
            clinician.patient[i].insulinTaken = patientData.insulinTaken
            clinician.patient[i].exercise = patientData.exercise
            // assign Clinician ID to each patientData
            Object.assign(clinician.patient[i], {clinicianID:req.params.id })
        }
        return res.render('clinician.hbs', {data: clinician})
    }catch(err){
        return next(err);
    }
}

module.exports = {getPatient,getClinician}


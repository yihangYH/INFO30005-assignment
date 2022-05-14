checkBox = ["bloodGlucoseCheckboxUpdate","weightCheckboxUpdate","insulinTakenCheckboxUpdate", "exerciseCheckboxUpdate"]
lowervalue= ["bloodGlucoseLowerValueUpdate","weightLowerValueUpdate", "insulinTakenLowerValueUpdate","exerciseLowerBalueUpdate"]
uppervalue= ["bloodGlucoseUpperValueUpdate", "weightUpperValueUpdate", "insulinTakenUpperValueUpdate","exerciseUpperValueUpdate"]
valueName = ["blood Glucose","weight", "insulin Taken","exercise"]

function setRequired(data,safetyThreshold){
    var values = safetyThreshold.split(",");
    for(let i =0 ;i<4; i++){
        if(data[i]){
            document.getElementById(checkBox[i]).checked = true;
            document.getElementById(lowervalue[i]).readOnly = false;
            document.getElementById(uppervalue[i]).readOnly = false;
            var value = values[i].split("-");
            document.getElementById(lowervalue[i]).value = value[0];
            document.getElementById(uppervalue[i]).value = value[1];
        }
    }
}

function updatePatientValidation(){
    for(let i =0; i < 4; i++){
        if(document.getElementById(checkBox[i]).checked){
            if(document.getElementById(lowervalue[i]).value == "" || document.getElementById(uppervalue[i]).value == ""){
                try {
                    Swal.fire(
                        'Please enter '+ valueName[i]  +' safety threshold values',
                        'please check',
                        'error'
                    )
                } catch (error) {
                    alert("Please enter safety threshold values")
                }
                return false;
            }
        }
    }
    console.log("hit");
    return false;
}
checkBox = ["bloodGlucoseCheckboxUpdate","weightCheckboxUpdate","insulinTakenCheckboxUpdate", "exerciseCheckboxUpdate"]
lowervalue= ["bloodGlucoseLowerValueUpdate","weightLowerValueUpdate", "insulinTakenLowerValueUpdate","exerciseLowerBalueUpdate"]
uppervalue= ["bloodGlucoseUpperValueUpdate", "weightUpperValueUpdate", "insulinTakenUpperValueUpdate","exerciseUpperValueUpdate"]
valueName = ["blood Glucose","weight", "insulin Taken","exercise"]


document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("bloodGlucoseCheckboxUpdate").addEventListener("change", function() {
        if(this.checked){
            document.getElementById('bloodGlucoseLowerValueUpdate').readOnly = false
            document.getElementById('bloodGlucoseUpperValueUpdate').readOnly = false
            // document.getElementById('bloodGlucoseTimeLowerValue').readOnly = false;
            // document.getElementById('bloodGlucoseTimeUpperValue').readOnly = false;
        }else{
            document.getElementById('bloodGlucoseLowerValueUpdate').readOnly = true
            document.getElementById('bloodGlucoseUpperValueUpdate').readOnly = true
            document.getElementById('bloodGlucoseLowerValueUpdate').value = ""
            document.getElementById('bloodGlucoseUpperValueUpdate').value = ""
            // document.getElementById('bloodGlucoseTimeLowerValue').readOnly = true
            // document.getElementById('bloodGlucoseTimeUpperValue').readOnly = true
            // document.getElementById('bloodGlucoseTimeLowerValue').value = ""
            // document.getElementById('bloodGlucoseTimeUpperValue').value = ""
        }
    });
    document.getElementById("weightCheckboxUpdate").addEventListener("change", function() {
        if(this.checked){
            document.getElementById('weightLowerValueUpdate').readOnly = false
            document.getElementById('weightUpperValueUpdate').readOnly = false
            // document.getElementById('weightTimeLowerValue').readOnly = false
            // document.getElementById('weightTimeUpperValue').readOnly = false
        }else{
            document.getElementById('weightLowerValueUpdate').readOnly = true
            document.getElementById('weightUpperValueUpdate').readOnly = true
            document.getElementById('weightLowerValueUpdate').value = ""
            document.getElementById('weightUpperValueUpdate').value = ""
            // document.getElementById('weightTimeLowerValue').readOnly = true
            // document.getElementById('weightTimeUpperValue').readOnly = true
            // document.getElementById('weightTimeLowerValue').value = ""
            // document.getElementById('weightTimeUpperValue').value = ""
        }
    });
    document.getElementById("insulinTakenCheckboxUpdate").addEventListener("change", function() {
        if(this.checked){
            document.getElementById('insulinTakenLowerValueUpdate').readOnly = false
            document.getElementById('insulinTakenUpperValueUpdate').readOnly = false
            // document.getElementById('insulinTakenTimeLowerValue').readOnly = false
            // document.getElementById('insulinTakenTimeUpperValue').readOnly = false
        }else{
            document.getElementById('insulinTakenLowerValueUpdate').readOnly = true
            document.getElementById('insulinTakenUpperValueUpdate').readOnly = true
            document.getElementById('insulinTakenLowerValueUpdate').value = ""
            document.getElementById('insulinTakenUpperValueUpdate').value = ""
            // document.getElementById('insulinTakenTimeLowerValue').readOnly = true
            // document.getElementById('insulinTakenTimeUpperValue').readOnly = true
            // document.getElementById('insulinTakenTimeLowerValue').value = ""
            // document.getElementById('insulinTakenTimeUpperValue').value = ""
        }
    });
    document.getElementById("exerciseCheckboxUpdate").addEventListener("change", function() {
        if(this.checked){
            document.getElementById('exerciseLowerBalueUpdate').readOnly = false
            document.getElementById('exerciseUpperValueUpdate').readOnly = false
            // document.getElementById('exerciseTimeLowerValue').readOnly = false
            // document.getElementById('exerciseTimeUpperValue').readOnly = false
        }else{
            document.getElementById('exerciseLowerBalueUpdate').readOnly = true
            document.getElementById('exerciseUpperValueUpdate').readOnly = true
            document.getElementById('exerciseLowerBalueUpdate').value = ""
            document.getElementById('exerciseUpperValueUpdate').value = ""
            // document.getElementById('exerciseTimeLowerValue').readOnly = true
            // document.getElementById('exerciseTimeUpperValue').readOnly = true
            // document.getElementById('exerciseTimeLowerValue').value = ""
            // document.getElementById('exerciseTimeUpperValue').value = ""
        }
    });
});





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
        }else{
            console.log(checkBox[i])
            document.getElementById(checkBox[i]).checked = false;
            document.getElementById(lowervalue[i]).readOnly = true;
            document.getElementById(uppervalue[i]).readOnly = true;
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
    return true;
}
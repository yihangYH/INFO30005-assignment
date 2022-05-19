checkBox = ["bloodGlucoseCheckboxUpdate","weightCheckboxUpdate","insulinTakenCheckboxUpdate", "exerciseCheckboxUpdate"]
lowervalue= ["bloodGlucoseLowerValueUpdate","weightLowerValueUpdate", "insulinTakenLowerValueUpdate","exerciseLowerBalueUpdate"]
uppervalue= ["bloodGlucoseUpperValueUpdate", "weightUpperValueUpdate", "insulinTakenUpperValueUpdate","exerciseUpperValueUpdate"]
valueName = ["blood glucose","weight", "insulin Taken","exercise"]

// same logic with eventListener in createPatient.js
document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("bloodGlucoseCheckboxUpdate").addEventListener("change", function() {
        if(this.checked){
            document.getElementById('bloodGlucoseLowerValueUpdate').readOnly = false
            document.getElementById('bloodGlucoseUpperValueUpdate').readOnly = false
            
        }else{
            document.getElementById('bloodGlucoseLowerValueUpdate').readOnly = true
            document.getElementById('bloodGlucoseUpperValueUpdate').readOnly = true
            document.getElementById('bloodGlucoseLowerValueUpdate').value = ""
            document.getElementById('bloodGlucoseUpperValueUpdate').value = ""
            
        }
    });
    document.getElementById("weightCheckboxUpdate").addEventListener("change", function() {
        if(this.checked){
            document.getElementById('weightLowerValueUpdate').readOnly = false
            document.getElementById('weightUpperValueUpdate').readOnly = false
            
        }else{
            document.getElementById('weightLowerValueUpdate').readOnly = true
            document.getElementById('weightUpperValueUpdate').readOnly = true
            document.getElementById('weightLowerValueUpdate').value = ""
            document.getElementById('weightUpperValueUpdate').value = ""
            
        }
    });
    document.getElementById("insulinTakenCheckboxUpdate").addEventListener("change", function() {
        if(this.checked){
            document.getElementById('insulinTakenLowerValueUpdate').readOnly = false
            document.getElementById('insulinTakenUpperValueUpdate').readOnly = false
            
        }else{
            document.getElementById('insulinTakenLowerValueUpdate').readOnly = true
            document.getElementById('insulinTakenUpperValueUpdate').readOnly = true
            document.getElementById('insulinTakenLowerValueUpdate').value = ""
            document.getElementById('insulinTakenUpperValueUpdate').value = ""
            
        }
    });
    document.getElementById("exerciseCheckboxUpdate").addEventListener("change", function() {
        if(this.checked){
            document.getElementById('exerciseLowerBalueUpdate').readOnly = false
            document.getElementById('exerciseUpperValueUpdate').readOnly = false
            
        }else{
            document.getElementById('exerciseLowerBalueUpdate').readOnly = true
            document.getElementById('exerciseUpperValueUpdate').readOnly = true
            document.getElementById('exerciseLowerBalueUpdate').value = ""
            document.getElementById('exerciseUpperValueUpdate').value = ""
            
        }
    });
});




// load data from DB and display in the updatePatient page
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
            document.getElementById(checkBox[i]).checked = false;
            document.getElementById(lowervalue[i]).readOnly = true;
            document.getElementById(uppervalue[i]).readOnly = true;
        }
    }
}

// validate input before send post request
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
            if(document.getElementById(lowervalue[i]).value >= document.getElementById(uppervalue[i]).value){
                try {
                    Swal.fire(
                        valueName[i]+' lower value should be less than upper value',
                        'please check',
                        'error'
                    )
                } catch (error) {
                    alert("Lower value should be less than upper value")
                }
                return false;
            }
            
        }
    }
    try {
        Swal.fire(
            'Account update successfully',
            'please check',
            'success'
        )
    } catch (error) {
        alert("Account update successfully")
    }
    return true;
}
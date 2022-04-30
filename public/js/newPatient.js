document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("bloodGlucoseCheckbox").addEventListener("change", function() {
        if(this.checked){
            document.getElementById('bloodGlucoseLowerValue').readOnly = false
            document.getElementById('bloodGlucoseUpperValue').readOnly = false
            document.getElementById('bloodGlucoseTimeLowerValue').readOnly = false;
            document.getElementById('bloodGlucoseTimeUpperValue').readOnly = false;
        }else{
            document.getElementById('bloodGlucoseLowerValue').readOnly = true
            document.getElementById('bloodGlucoseUpperValue').readOnly = true
            document.getElementById('bloodGlucoseLowerValue').value = ""
            document.getElementById('bloodGlucoseUpperValue').value = ""
            document.getElementById('bloodGlucoseTimeLowerValue').readOnly = true
            document.getElementById('bloodGlucoseTimeUpperValue').readOnly = true
            document.getElementById('bloodGlucoseTimeLowerValue').value = ""
            document.getElementById('bloodGlucoseTimeUpperValue').value = ""
        }
    });
    document.getElementById("weightCheckbox").addEventListener("change", function() {
        if(this.checked){
            document.getElementById('weightLowerValue').readOnly = false
            document.getElementById('weightUpperValue').readOnly = false
            document.getElementById('weightTimeLowerValue').readOnly = false
            document.getElementById('weightTimeUpperValue').readOnly = false
        }else{
            document.getElementById('weightLowerValue').readOnly = true
            document.getElementById('weightUpperValue').readOnly = true
            document.getElementById('weightLowerValue').value = ""
            document.getElementById('weightUpperValue').value = ""
            document.getElementById('weightTimeLowerValue').readOnly = true
            document.getElementById('weightTimeUpperValue').readOnly = true
            document.getElementById('weightTimeLowerValue').value = ""
            document.getElementById('weightTimeUpperValue').value = ""
        }
    });
    document.getElementById("insulinTakenCheckbox").addEventListener("change", function() {
        if(this.checked){
            document.getElementById('insulinTakenLowerValue').readOnly = false
            document.getElementById('insulinTakenUpperValue').readOnly = false
            document.getElementById('insulinTakenTimeLowerValue').readOnly = false
            document.getElementById('insulinTakenTimeUpperValue').readOnly = false
        }else{
            document.getElementById('insulinTakenLowerValue').readOnly = true
            document.getElementById('insulinTakenUpperValue').readOnly = true
            document.getElementById('insulinTakenLowerValue').value = ""
            document.getElementById('insulinTakenUpperValue').value = ""
            document.getElementById('insulinTakenTimeLowerValue').readOnly = true
            document.getElementById('insulinTakenTimeUpperValue').readOnly = true
            document.getElementById('insulinTakenTimeLowerValue').value = ""
            document.getElementById('insulinTakenTimeUpperValue').value = ""
        }
    });
    document.getElementById("exerciseCheckbox").addEventListener("change", function() {
        if(this.checked){
            document.getElementById('exerciseLowerBalue').readOnly = false
            document.getElementById('exerciseUpperValue').readOnly = false
            document.getElementById('exerciseTimeLowerValue').readOnly = false
            document.getElementById('exerciseTimeUpperValue').readOnly = false
        }else{
            document.getElementById('exerciseLowerBalue').readOnly = true
            document.getElementById('exerciseUpperValue').readOnly = true
            document.getElementById('exerciseLowerBalue').value = ""
            document.getElementById('exerciseUpperValue').value = ""
            document.getElementById('exerciseTimeLowerValue').readOnly = true
            document.getElementById('exerciseTimeUpperValue').readOnly = true
            document.getElementById('exerciseTimeLowerValue').value = ""
            document.getElementById('exerciseTimeUpperValue').value = ""
        }
    });
});

function checkInput(){
    if(document.getElementById('firstName').value == ""){
        alert("firstName please")
    }else if (document.getElementById('lastName').value == ""){
        alert("lastName please")
    }else if(document.getElementById('screenName').value == ""){
        alert("screenName please")
    }else if(document.getElementById('brith').value == ""){
        alert("birth please")
    }else if(document.getElementById('userId').value == ""){
        alert("userId please")
    }else if(document.getElementById('password').value == ""){
        alert("password please")
    }
    checkDataInput();
}

function checkDataInput(){
    console.log(document.getElementById("bloodGlucoseCheckbox").checked)
    if(!document.getElementById("bloodGlucoseCheckbox").checked &&
    !document.getElementById("weightCheckbox").checked &&
    !document.getElementById("insulinTakenCheckbox").checked &&
    !document.getElementById("exerciseCheckbox").checked ){
        alert("please select at least one data ")
    }
    if(document.getElementById("bloodGlucoseCheckbox").checked && 
    (document.getElementById('bloodGlucoseLowerValue').value == "" || 
    document.getElementById('bloodGlucoseUpperValue').value == "")){
        alert("please enter blood glucose safetythreshold")
    }

    if(document.getElementById("weightCheckbox").checked && 
    (document.getElementById('weightLowerValue').value == "" || 
    document.getElementById('weightUpperValue').value == "")){
        alert("please enter weight safetythreshold")
    }

    if(document.getElementById("insulinTakenCheckbox").checked && 
    (document.getElementById('insulinTakenLowerValue').value == "" || 
    document.getElementById('insulinTakenUpperValue').value == "")){
        alert("please enter insulin taken safetythreshold")
    }
    
    if(document.getElementById("exerciseCheckbox").checked && 
    (document.getElementById('exerciseLowerValue').value == "" || 
    document.getElementById('exerciseUpperValue').value == "")){
        alert("please enter exercise safetythreshold")
    }

    if(document.getElementById("bloodGlucoseCheckbox").checked && 
    (document.getElementById('bloodGlucoseTimeLowerValue').value == "" || 
    document.getElementById('bloodGlucoseTimeUpperValue').value == "")){
        alert("please selct time series for blood glucose")
    }

    if(document.getElementById("weightCheckbox").checked && 
    (document.getElementById('weightTimeLowerValue').value == "" || 
    document.getElementById('weightTimeUpperValue').value == "")){
        alert("please selct time series for weight")
    }

    if(document.getElementById("insulinTakenCheckbox").checked && 
    (document.getElementById('insulinTakenTimeLowerValue').value == "" || 
    document.getElementById('insulinTakenTimeUpperValue').value == "")){
        alert("please selct time series for insulin taken")
    }

    if(document.getElementById("exerciseCheckbox").checked && 
    (document.getElementById('exerciseTimeLowerValue').value == "" || 
    document.getElementById('exerciseTimeUpperValue').value == "")){
        alert("please selct time series for exercise")
    }
}
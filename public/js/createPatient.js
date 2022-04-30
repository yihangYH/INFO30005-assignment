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
        try {
            Swal.fire(
                'Please enter Frist name',
                'please check',
                'error'
            )
        } catch (error) {
            alert("Please enter Last name")
        }
        return
    }else if (document.getElementById('lastName').value == ""){
        try {
            Swal.fire(
                'Please enter Last name',
                'please check',
                'error'
            )
        } catch (error) {
            alert("Please enter Last name")
        }
        return
    }else if(document.getElementById('screenName').value == ""){
        try {
            Swal.fire(
                'Please enter Screen name',
                'please check',
                'error'
            )
        } catch (error) {
            alert("Please enter Screen name")
        }
        return
    }else if(document.getElementById('brith').value == ""){
        try {
            Swal.fire(
                'Please enter birth',
                'please check',
                'error'
            )
        } catch (error) {
            alert("Please enter birth")
        }
        return
    }else if(document.getElementById('userId').value == ""){
        try {
            Swal.fire(
                'Please enter User id',
                'please check',
                'error'
            )
        } catch (error) {
            alert("Please enter User id")
        }
        return
    }else if(document.getElementById('password').value == ""){
        try {
            Swal.fire(
                'Please enter Password',
                'please check',
                'error'
            )
        } catch (error) {
            alert("Please enter Password")
        }
        return
    }
    checkDataInput();
}

function checkDataInput(){
    console.log(document.getElementById("bloodGlucoseCheckbox").checked)
    if(!document.getElementById("bloodGlucoseCheckbox").checked &&
    !document.getElementById("weightCheckbox").checked &&
    !document.getElementById("insulinTakenCheckbox").checked &&
    !document.getElementById("exerciseCheckbox").checked ){
        try {
            Swal.fire(
                'Please select at least one data',
                'please check',
                'error'
            )
        } catch (error) {
            alert("Please select at least one data")
        }
        return
    }
    if(document.getElementById("bloodGlucoseCheckbox").checked && 
    (document.getElementById('bloodGlucoseLowerValue').value == "" || 
    document.getElementById('bloodGlucoseUpperValue').value == "")){
        try {
            Swal.fire(
                'please enter blood glucose safety threshold',
                'please check',
                'error'
            )
        } catch (error) {
            alert("please enter blood glucose safety threshold")
        }
        return
    }

    if(document.getElementById("weightCheckbox").checked && 
    (document.getElementById('weightLowerValue').value == "" || 
    document.getElementById('weightUpperValue').value == "")){
        try {
            Swal.fire(
                'please enter weight safety threshold',
                'please check',
                'error'
            )
        } catch (error) {
            alert("please enter weight safety threshold")
        }
        return
    }

    if(document.getElementById("insulinTakenCheckbox").checked && 
    (document.getElementById('insulinTakenLowerValue').value == "" || 
    document.getElementById('insulinTakenUpperValue').value == "")){
        try {
            Swal.fire(
                'please enter insulin taken safety threshold',
                'please check',
                'error'
            )
        } catch (error) {
            alert("please enter insulin taken safety threshold")
        }
        return
    }
    
    if(document.getElementById("exerciseCheckbox").checked && 
    (document.getElementById('exerciseLowerValue').value == "" || 
    document.getElementById('exerciseUpperValue').value == "")){
        try {
            Swal.fire(
                'please enter exercise safety threshold',
                'please check',
                'error'
            )
        } catch (error) {
            alert("please enter exercise safety threshold")
        }
        return
    }

    if(document.getElementById("bloodGlucoseCheckbox").checked && 
    (document.getElementById('bloodGlucoseTimeLowerValue').value == "" || 
    document.getElementById('bloodGlucoseTimeUpperValue').value == "")){
        try {
            Swal.fire(
                'please selct time series for blood glucose',
                'please check',
                'error'
            )
        } catch (error) {
            alert("please selct time series for blood glucose")
        }
        return
    }

    if(document.getElementById("weightCheckbox").checked && 
    (document.getElementById('weightTimeLowerValue').value == "" || 
    document.getElementById('weightTimeUpperValue').value == "")){
        try {
            Swal.fire(
                'please selct time series for weight',
                'please check',
                'error'
            )
        } catch (error) {
            alert("please selct time series for weight")
        }
        return
    }

    if(document.getElementById("insulinTakenCheckbox").checked && 
    (document.getElementById('insulinTakenTimeLowerValue').value == "" || 
    document.getElementById('insulinTakenTimeUpperValue').value == "")){
        try {
            Swal.fire(
                'please selct time series for insulin taken',
                'please check',
                'error'
            )
        } catch (error) {
            alert("please selct time series for insulin taken")
        }
        return
    }

    if(document.getElementById("exerciseCheckbox").checked && 
    (document.getElementById('exerciseTimeLowerValue').value == "" || 
    document.getElementById('exerciseTimeUpperValue').value == "")){
        try {
            Swal.fire(
                'please selct time series for exercise',
                'please check',
                'error'
            )
        } catch (error) {
            alert("please selct time series for exercise")
        }
        return
    }
}
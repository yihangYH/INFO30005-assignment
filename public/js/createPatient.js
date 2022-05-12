document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("bloodGlucoseCheckbox").addEventListener("change", function() {
        if(this.checked){
            document.getElementById('bloodGlucoseLowerValue').readOnly = false
            document.getElementById('bloodGlucoseUpperValue').readOnly = false
            // document.getElementById('bloodGlucoseTimeLowerValue').readOnly = false;
            // document.getElementById('bloodGlucoseTimeUpperValue').readOnly = false;
        }else{
            document.getElementById('bloodGlucoseLowerValue').readOnly = true
            document.getElementById('bloodGlucoseUpperValue').readOnly = true
            document.getElementById('bloodGlucoseLowerValue').value = ""
            document.getElementById('bloodGlucoseUpperValue').value = ""
            // document.getElementById('bloodGlucoseTimeLowerValue').readOnly = true
            // document.getElementById('bloodGlucoseTimeUpperValue').readOnly = true
            // document.getElementById('bloodGlucoseTimeLowerValue').value = ""
            // document.getElementById('bloodGlucoseTimeUpperValue').value = ""
        }
    });
    document.getElementById("weightCheckbox").addEventListener("change", function() {
        if(this.checked){
            document.getElementById('weightLowerValue').readOnly = false
            document.getElementById('weightUpperValue').readOnly = false
            // document.getElementById('weightTimeLowerValue').readOnly = false
            // document.getElementById('weightTimeUpperValue').readOnly = false
        }else{
            document.getElementById('weightLowerValue').readOnly = true
            document.getElementById('weightUpperValue').readOnly = true
            document.getElementById('weightLowerValue').value = ""
            document.getElementById('weightUpperValue').value = ""
            // document.getElementById('weightTimeLowerValue').readOnly = true
            // document.getElementById('weightTimeUpperValue').readOnly = true
            // document.getElementById('weightTimeLowerValue').value = ""
            // document.getElementById('weightTimeUpperValue').value = ""
        }
    });
    document.getElementById("insulinTakenCheckbox").addEventListener("change", function() {
        if(this.checked){
            document.getElementById('insulinTakenLowerValue').readOnly = false
            document.getElementById('insulinTakenUpperValue').readOnly = false
            // document.getElementById('insulinTakenTimeLowerValue').readOnly = false
            // document.getElementById('insulinTakenTimeUpperValue').readOnly = false
        }else{
            document.getElementById('insulinTakenLowerValue').readOnly = true
            document.getElementById('insulinTakenUpperValue').readOnly = true
            document.getElementById('insulinTakenLowerValue').value = ""
            document.getElementById('insulinTakenUpperValue').value = ""
            // document.getElementById('insulinTakenTimeLowerValue').readOnly = true
            // document.getElementById('insulinTakenTimeUpperValue').readOnly = true
            // document.getElementById('insulinTakenTimeLowerValue').value = ""
            // document.getElementById('insulinTakenTimeUpperValue').value = ""
        }
    });
    document.getElementById("exerciseCheckbox").addEventListener("change", function() {
        if(this.checked){
            document.getElementById('exerciseLowerBalue').readOnly = false
            document.getElementById('exerciseUpperValue').readOnly = false
            // document.getElementById('exerciseTimeLowerValue').readOnly = false
            // document.getElementById('exerciseTimeUpperValue').readOnly = false
        }else{
            document.getElementById('exerciseLowerBalue').readOnly = true
            document.getElementById('exerciseUpperValue').readOnly = true
            document.getElementById('exerciseLowerBalue').value = ""
            document.getElementById('exerciseUpperValue').value = ""
            // document.getElementById('exerciseTimeLowerValue').readOnly = true
            // document.getElementById('exerciseTimeUpperValue').readOnly = true
            // document.getElementById('exerciseTimeLowerValue').value = ""
            // document.getElementById('exerciseTimeUpperValue').value = ""
        }
    });
});



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
        return false
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
        return false
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
        return false
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
        return false
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
        return false
    }

    // if(document.getElementById("bloodGlucoseCheckbox").checked && 
    // (document.getElementById('bloodGlucoseTimeLowerValue').value == "" || 
    // document.getElementById('bloodGlucoseTimeUpperValue').value == "")){
    //     try {
    //         Swal.fire(
    //             'please selct time series for blood glucose',
    //             'please check',
    //             'error'
    //         )
    //     } catch (error) {
    //         alert("please selct time series for blood glucose")
    //     }
    //     return false
    // }

    // if(document.getElementById("weightCheckbox").checked && 
    // (document.getElementById('weightTimeLowerValue').value == "" || 
    // document.getElementById('weightTimeUpperValue').value == "")){
    //     try {
    //         Swal.fire(
    //             'please selct time series for weight',
    //             'please check',
    //             'error'
    //         )
    //     } catch (error) {
    //         alert("please selct time series for weight")
    //     }
    //     return false
    // }

    // if(document.getElementById("insulinTakenCheckbox").checked && 
    // (document.getElementById('insulinTakenTimeLowerValue').value == "" || 
    // document.getElementById('insulinTakenTimeUpperValue').value == "")){
    //     try {
    //         Swal.fire(
    //             'please selct time series for insulin taken',
    //             'please check',
    //             'error'
    //         )
    //     } catch (error) {
    //         alert("please selct time series for insulin taken")
    //     }
    //     return false
    // }

    // if(document.getElementById("exerciseCheckbox").checked && 
    // (document.getElementById('exerciseTimeLowerValue').value == "" || 
    // document.getElementById('exerciseTimeUpperValue').value == "")){
    //     try {
    //         Swal.fire(
    //             'please selct time series for exercise',
    //             'please check',
    //             'error'
    //         )
    //     } catch (error) {
    //         alert("please selct time series for exercise")
    //     }
    //     return false
    // }
    try {
        Swal.fire(
            'Account Created successfully',
            'please check',
            'success'
        )
    } catch (error) {
        alert("Account Created successfully")
    }
    return true;
}

function createPatientValidation(){
    // return false;
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
        
        return false
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
        
        return false
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
        
        return false
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
        
        return false
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
        
        return false
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
        
        return false
    }
    var password = document.getElementById('password').value
    if(password.length < 8){
        try {
            Swal.fire(
                'The Password at least at least 8 characters long.',
                'please check',
                'error'
            )
        } catch (error) {
            alert("The Password at least at least 8 characters long.")
        }
        
        return false
    }
    if(!checkPatientExists()){
        return false;
    }
    if(!checkDataInput()){
        return false;
    }
    return false;
}

async function checkPatientExists(){
    var userEmail = document.getElementById('userId').value
    try {
        let patient = {
            userId: userEmail,
        }
        let response = await fetch('/checkPatient', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(patient)
          });
          if(response.status == 201){
                try {
                    Swal.fire(
                        'Account already exists',
                        'please check',
                        'error'
                    )
                } catch (error) {
                    alert("Account already exists.")
                }
                
                return false;
            }else{
                
            }
    } catch (err) {
        console.error(`Error: ${err}`);
    }
    return true;
}
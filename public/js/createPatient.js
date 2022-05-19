// event listener for checkbox
// if corresponding data type check box checked, 
// clinician can enter the safety threshold value
// if unchecked, the safety threshold value should be cleared
document.addEventListener("DOMContentLoaded", function(){
    // clistent blood glucose check box
    document.getElementById("bloodGlucoseCheckbox").addEventListener("change", function() {
        // if checked, allow clinican to enter the safety threshold value
        if(this.checked){
            document.getElementById('bloodGlucoseLowerValue').readOnly = false
            document.getElementById('bloodGlucoseUpperValue').readOnly = false
        // if unchecked, not allow clinican to enter the safety threshold value
        // and clear the value
        }else{
            document.getElementById('bloodGlucoseLowerValue').readOnly = true
            document.getElementById('bloodGlucoseUpperValue').readOnly = true
            document.getElementById('bloodGlucoseLowerValue').value = ""
            document.getElementById('bloodGlucoseUpperValue').value = ""
        }
    });
    // same logic as above
    document.getElementById("weightCheckbox").addEventListener("change", function() {
        if(this.checked){
            document.getElementById('weightLowerValue').readOnly = false
            document.getElementById('weightUpperValue').readOnly = false
        }else{
            document.getElementById('weightLowerValue').readOnly = true
            document.getElementById('weightUpperValue').readOnly = true
            document.getElementById('weightLowerValue').value = ""
            document.getElementById('weightUpperValue').value = ""
        }
    });
    // same logic as above
    document.getElementById("insulinTakenCheckbox").addEventListener("change", function() {
        if(this.checked){
            document.getElementById('insulinTakenLowerValue').readOnly = false
            document.getElementById('insulinTakenUpperValue').readOnly = false
        }else{
            document.getElementById('insulinTakenLowerValue').readOnly = true
            document.getElementById('insulinTakenUpperValue').readOnly = true
            document.getElementById('insulinTakenLowerValue').value = ""
            document.getElementById('insulinTakenUpperValue').value = ""
        }
    });
    // same logic as above
    document.getElementById("exerciseCheckbox").addEventListener("change", function() {
        if(this.checked){
            document.getElementById('exerciseLowerBalue').readOnly = false
            document.getElementById('exerciseUpperValue').readOnly = false
        }else{
            document.getElementById('exerciseLowerBalue').readOnly = true
            document.getElementById('exerciseUpperValue').readOnly = true
            document.getElementById('exerciseLowerBalue').value = ""
            document.getElementById('exerciseUpperValue').value = ""
        }
    });
});


// validate if data has entered
function checkDataInput(){
    // check at least one data type is required
    // if all the data type check box is unchecked 
    // alert error message
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
    // if data type check box checked but not have safety threshold value
    // alert erro message
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
    // same logic above 
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
    // same logic above 
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
    // same logic above 
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
    // if data type check box checked but lower value >= upper value
    // alert error message
    if(document.getElementById("bloodGlucoseCheckbox").checked &&
    document.getElementById('bloodGlucoseLowerValue').value >= 
    document.getElementById('bloodGlucoseUpperValue').value){
        try {
            Swal.fire(
                'Blood Glucose Lower Value should be less than Upper Value',
                'please check',
                'error'
            )
        } catch (error) {
            alert("Blood Glucose Lower Value should be less than Upper Value")
        }
        return false
    }
    // same logic above 
    if(document.getElementById("weightCheckbox").checked &&
    document.getElementById('weightLowerValue').value >=
    document.getElementById('weightUpperValue').value){
        try {
            Swal.fire(
                'Weight Lower Value should be less than Upper Value',
                'please check',
                'error'
            )
        } catch (error) {
            alert("Weight Lower Value should be less than Upper Value")
        }
        return false
    }
    // same logic above 
    if(document.getElementById("insulinTakenCheckbox").checked &&
    document.getElementById('insulinTakenLowerValue').value >=
    document.getElementById('insulinTakenUpperValue').value){
        try {
            Swal.fire(
                'Insulin Taken Lower Value should be less than Upper Value',
                'please check',
                'error'
            )
        } catch (error) {
            alert("Insulin Taken Lower Value should be less than Upper Value")
        }
        return false
    }
    // same logic above 
    if(document.getElementById("exerciseCheckbox").checked &&
    document.getElementById('exerciseLowerValue').value >=
    document.getElementById('exerciseUpperValue').value){
        try {
            Swal.fire(
                'Exercise Lower Value should be less than Upper Value',
                'please check',
                'error'
            )
        } catch (error) {
            alert("Exercise Lower Value should be less than Upper Value")
        }
        return false
    }
    // alert success message
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

// check is patient detail has enterd and if it is valid
function createPatientValidation(){
    // the frist name cannot be empty
    if(document.getElementById('firstName').value.replace(/ /g,'') == ""){
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
        // last name cannot be empty
    }else if (document.getElementById('lastName').value.replace(/ /g,'') == ""){
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
        // screen name not empty
    }else if(document.getElementById('screenName').value.replace(/ /g,'') == ""){
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
        // birth not empty
    }else if(document.getElementById('brith').value.replace(/ /g,'') == ""){
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
        // user ID not empty
    }
    var date = document.getElementById('brith').value.split('/');
    if(date.length != 3){
        try {
            Swal.fire(
                'Please check birth',
                'please check',
                'error'
            )
        } catch (error) {
            alert("Please check birth")
        }
        
        return false
    }else if(date[0] > 31 || date[0] < 1 || date[1] > 12 || date[1] < 1 || date[2]<0 ||
        !Number.isInteger(date[0]) || !Number.isInteger(date[1]) || !Number.isInteger(date[2])){
        try {
            Swal.fire(
                'Please check birth',
                'please check',
                'error'
            )
        } catch (error) {
            alert("Please check birth")
        }
        
        return false
    }
        
    if(document.getElementById('userId').value.replace(/ /g,'') == ""){
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
        // password not empty
    }else if(document.getElementById('password').value.replace(/ /g,'') == ""){
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
    // password length must be greater than 8
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
    var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if(format.test(password) || /\s/g.test(password)){
        try {
            Swal.fire(
                'The password can only numbers and letters',
                'please check',
                'error'
            )
        } catch (error) {
            alert("The password can only numbers and letters")
        }
        
        return false
    }
    // check if the patient userid already exists
    if(!checkPatientExists()){
        return false;
    }
    // call checkDatainput function to check if clinician
    // has enter the valid safety threshold
    if(!checkDataInput()){
        return false;
    }
    return true;
}

// check if the userID is in the DB or not, if in the DB, need to change another one 
async function checkPatientExists(){
    var userEmail = document.getElementById('userId').value
    try {
        let patient = {
            userId: userEmail,
        }
        // call post method to check if patient userid already in the DB
        let response = await fetch('/checkPatient', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(patient)
          });
          console.log(response)
          // if post method response return 201 means userid exists
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
    // else return true 
    return true;
}
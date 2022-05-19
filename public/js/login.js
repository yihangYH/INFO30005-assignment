// this function is to show and hide password
function myFunction() {
  var x = document.getElementById("password");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

function changePassword(){
    document.getElementById("change-password-content").style.display = "inline-block"
    document.getElementById("back-icon").style.display = "inline-block"
}

function goback(){
  document.getElementById("change-password-content").style.display = "none"
  document.getElementById("back-icon").style.display = "none"
}

function loginValidation(){
  var userID = document.getElementById("userID").value;
  var password = document.getElementById("oldPassword").value;
  var newpassword = document.getElementById("newPassword").value;
  var confirmpassword = document.getElementById("confirmPassword").value;
  if(confirmpassword.length == 0 || newpassword.length == 0 || password.length == 0 || userID.length == 0){
    try {
      Swal.fire(
        'Please enter all the information',
        'please check',
        'error'
      )
    } catch (error) {
      // if sweetalert2 not working in the current moment, use defulat alert
      document.getElementById("myModal").style.display = "block";
      document.getElementById('error-message').innerHTML = "Please enter all the information";
    }
    return false;
  }
  if(password == newpassword){
    try {
      Swal.fire(
        'new password cannot be same as old password',
        'please check',
        'error'
      )
    } catch (error) {
      // if sweetalert2 not working in the current moment, use defulat alert
      document.getElementById("myModal").style.display = "block";
      document.getElementById('error-message').innerHTML = "new password cannot be same as old password";
    }
    return false;
  }
  document.getElementById("change-password-content").style.display = "none";
  if(newpassword != confirmpassword){
    try {
      Swal.fire(
        'new password does not match to confirm password',
        'please check',
        'error'
      )
    } catch (error) {
      // if sweetalert2 not working in the current moment, use defulat alert
      document.getElementById("myModal").style.display = "block";
      document.getElementById('error-message').innerHTML = "new password does not match to confirm password";
    }
    return false;
  }
  if(newpassword.length < 8){
    try {
      Swal.fire(
        'password must be at least 8 characters',
        'please check',
        'error'
      )
    } catch (error) {
      // if sweetalert2 not working in the current moment, use defulat alert
      document.getElementById("myModal").style.display = "block";
      document.getElementById('error-message').innerHTML = "password must be at least 8 characters";
    }
    return false;
  }

  try {
    Swal.fire(
      'password changed successfully',
      'please check',
      'success'
    )
  } catch (error) {
    // if sweetalert2 not working in the current moment, use defulat alert
    document.getElementById("myModal").style.display = "block";
    document.getElementById('error-message').innerHTML = "password must be at least 8 characters";
  }


  return true;
}


// thie function is used to validate login info
async function validate() {
  var patient = document.getElementById("patient");
  var doctor = document.getElementById("doctor");
  // get doctor and patient style to help to identify which one has been selected
  const doctorStyle = getComputedStyle(doctor);
  const patientStyle = getComputedStyle(patient);
  var doctor;
  var patient;
  // get password and username value 
  const password = document.getElementById("password").value;
  const username = document.getElementById("username").value;
  // based on the style, check which one has been selected
  if (patientStyle.color == "rgb(0, 0, 0)") {
    patient = true;
  } else if (doctorStyle.color == "rgb(0, 0, 0)") {
    doctor = true;
  }

  try {
    // create new patitent info object
    let patientInfo = {
      username: username,
      password: password,
      isDoctor: doctor,
      isPatient: patient
    }
    // error message if user not enter either username of password
    if (document.getElementById("username").value == "" || document.getElementById("password").value == "") {
      try {
        Swal.fire(
          'userID and password',
          'please enter',
          'error'
        )
      } catch (error) {
        // if sweetalert2 not working in the current moment, use defulat alert
        document.getElementById("myModal").style.display = "block";
        document.getElementById('error-message').innerHTML = "please enter a userID and password";
      }
      return
    }
    // post method for login
    if(patient == true){
      const response = await fetch('/patientlogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(patientInfo)
      });
      // based on the response, redirect to data page for patient, or showing error meesage
      if (response.status == 202) {
        window.location.href = "./data/" + response.statusText;
        return
      } else if (response.status == 201) {
        try {
          Swal.fire(
            'Invalid identity, userID or password',
            'please check',
            'error'
          )
        } catch (error) {
          // if sweetalert2 not working in the current moment, use defulat alert
          document.getElementById("myModal").style.display = "block";
          document.getElementById('error-message').innerHTML = "Invalid identity, userID or password";
        }
      } else if(response.status == 200){
        try {
          Swal.fire(
            'Invalid identity, userID or password',
            'please check',
            'error'
          )
        } catch (error) {
          // if sweetalert2 not working in the current moment, use defulat alert
          document.getElementById("myModal").style.display = "block";
          document.getElementById('error-message').innerHTML = "Invalid identity, userID or password";
        }
      }
    }
    if(doctor == true){
      const response = await fetch('/doctorLogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(patientInfo)
      });
  
      // based on the response, redirect to data page for patient, or showing error meesage
      if (response.status == 202) {
        window.location.href = "./dashboard/" + response.statusText;
        return
      } else if (response.status == 201) {
        try {
          Swal.fire(
            'Invalid identity, userID or password',
            'please check',
            'error'
          )
        } catch (error) {
          // if sweetalert2 not working in the current moment, use defulat alert
          document.getElementById("myModal").style.display = "block";
          document.getElementById('error-message').innerHTML = "Invalid identity, userID or password";
        }
      } else if(response.status == 200){
        try {
          Swal.fire(
            'Invalid identity, userID or password',
            'please check',
            'error'
          )
        } catch (error) {
          // if sweetalert2 not working in the current moment, use defulat alert
          document.getElementById("myModal").style.display = "block";
          document.getElementById('error-message').innerHTML = "Invalid identity, userID or password";
        }
      }
    }
  } catch (err) {
    console.error(`Error: ${err}`);
  }
}

// this function is used for change the color for patient and doctore when patient is selected
function identityPatient() {
  var patient = document.getElementById("patient");
  var doctor = document.getElementById("doctor");
  const doctorStyle = getComputedStyle(doctor);
  const patientStyle = getComputedStyle(patient);
  // if patient is black, cheng doctor to grey
  if (patientStyle.color == "rgb(0, 0, 0)") {
    document.getElementById("doctor").style.color = "grey";
  }

  if (patientStyle.color == "rgb(128, 128, 128)" && doctorStyle.color == "rgb(0, 0, 0)") {
    document.getElementById("patient").style.color = "black";
    document.getElementById("doctor").style.color = "grey";
    document.getElementById("change-password-btn").disabled = false;
  }
}

// this function is used for change the color for doctore and doctore when doctor is selected
function identityDoctor() {
  var patient = document.getElementById("patient");
  var doctor = document.getElementById("doctor");
  const doctorStyle = getComputedStyle(doctor);
  const patientStyle = getComputedStyle(patient);
  // same logic as above 
  if (patientStyle.color == "rgb(0, 0, 0)") {
    document.getElementById("doctor").style.color = "grey";
  }

  if (doctorStyle.color == "rgb(128, 128, 128)" && patientStyle.color == "rgb(0, 0, 0)") {
    document.getElementById("patient").style.color = "grey";
    document.getElementById("doctor").style.color = "black";
    document.getElementById("change-password-btn").disabled = true;
  }
}
function myFunction() {
  var x = document.getElementById("password");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

async function validate() {
  var patient = document.getElementById("patient");
  var doctor = document.getElementById("doctor");
  const doctor_style = getComputedStyle(doctor);
  const patient_style = getComputedStyle(patient);
  var doctor;
  var patient;
  const password = document.getElementById("password").value;
  const username = document.getElementById("username").value;

  if (patient_style.color == "rgb(0, 0, 0)") {
    patient = true;
  } else if (doctor_style.color == "rgb(0, 0, 0)") {
    doctor = true;
  }

  try {
    let patientInfo = {
      userid: username,
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
        document.getElementById("myModal").style.display = "block";
        document.getElementById('error-message').innerHTML = "please enter a userID and password";
      }
      return
    }

    // post method for login
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(patientInfo)
    });

    console.log(response);

    // based on the response, redirect to data page for patient, or showing error meesage
    if (response.status == 202) {
      window.location.href = "./data/" + response.statusText;
    } else if (response.status == 201) {
      try {
        Swal.fire(
          'Invalid identity, userID or password',
          'please check',
          'error'
        )
      } catch (error) {
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
        document.getElementById("myModal").style.display = "block";
        document.getElementById('error-message').innerHTML = "Invalid identity, userID or password";
      }
    }
  } catch (err) {
    console.error(`Error: ${err}`);
  }
}

function identity_patient() {
  var patient = document.getElementById("patient");
  var doctor = document.getElementById("doctor");
  const doctor_style = getComputedStyle(doctor);
  const patient_style = getComputedStyle(patient);

  if (patient_style.color == "rgb(0, 0, 0)") {
    document.getElementById("doctor").style.color = "grey";
  }

  if (patient_style.color == "rgb(128, 128, 128)" && doctor_style.color == "rgb(0, 0, 0)") {
    document.getElementById("patient").style.color = "black";
    document.getElementById("doctor").style.color = "grey";
  }
}

function identity_doctor() {
  var patient = document.getElementById("patient");
  var doctor = document.getElementById("doctor");
  const doctor_style = getComputedStyle(doctor);
  const patient_style = getComputedStyle(patient);

  if (patient_style.color == "rgb(0, 0, 0)") {
    document.getElementById("doctor").style.color = "grey";
  }

  if (doctor_style.color == "rgb(128, 128, 128)" && patient_style.color == "rgb(0, 0, 0)") {
    document.getElementById("patient").style.color = "grey";
    document.getElementById("doctor").style.color = "black";
  }
}
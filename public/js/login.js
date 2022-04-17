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
    if (document.getElementById("username").value == "" || document.getElementById("password").value == "") {
      document.getElementById('errorMessage').innerHTML = "please enter a username and password";
      return
    }
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(patientInfo)
    });
    console.log(response);
    if (response.status == 202) {
      window.location.href = "../data/" + response.statusText;
    } else if (response.status == 201) {
      document.getElementById('errorMessage').innerHTML = "Invalid identity, username or password";
    } else if(response.status == 200){
      document.getElementById('errorMessage').innerHTML = "Invalid identity, username or password";
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
function myFunction() {
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }
function validate(){
      var username = document.getElementById("username").value;
      var password = document.getElementById("password").value;
      var error = document.getElementById("errorMessage");
      var patient = document.getElementById("patient");
      var doctor = document.getElementById("doctor");
      const doctor_style = getComputedStyle(doctor);
      const patient_style = getComputedStyle(patient);
      var missing = document.getElementById("missing");
      var missing_identity = document.getElementById("missing-indentity");
      if(doctor_style.color == "rgb(0, 0, 0)" && patient_style.color == "rgb(0, 0, 0)"){
        missing_identity.style.display="block";
        console.log('asd');
        return;
      }else{
        missing_identity.style.display = "none";
        missing.style.display = "none";
        
      }
      if(username == "" || password == ""){
         missing.style.display = "block";
         error.style.display = "none";
         return
      }else{
          missing.style.display = "none";
          
      }
      if(password == "123" && username == "Admin"){
          error.style.display = "none";
          missing.style.display = "none";
          return;
        
      }else{
          error.style.display = "block";
          missing.style.display ="none"
          
      }
}

function identity_patient(){
  var patient = document.getElementById("patient");
  var doctor = document.getElementById("doctor");
  const doctor_style = getComputedStyle(doctor);
  const patient_style = getComputedStyle(patient);
  if(patient_style.color == "rgb(0, 0, 0)"){
    document.getElementById("doctor").style.color = "grey";
  }
  if(patient_style.color == "rgb(128, 128, 128)" && doctor_style.color == "rgb(0, 0, 0)"){
    document.getElementById("patient").style.color = "black";
    document.getElementById("doctor").style.color = "grey";
  }

  
  
}

function identity_doctor(){
  var patient = document.getElementById("patient");
  var doctor = document.getElementById("doctor");
  const doctor_style = getComputedStyle(doctor);
  const patient_style = getComputedStyle(patient);
  if(patient_style.color == "rgb(0, 0, 0)"){
    document.getElementById("doctor").style.color = "grey";
  }
  if(doctor_style.color == "rgb(128, 128, 128)" && patient_style.color == "rgb(0, 0, 0)"){
    document.getElementById("patient").style.color = "grey";
    document.getElementById("doctor").style.color = "black";
  }
  
  
}
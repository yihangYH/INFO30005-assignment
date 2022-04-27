function click_sideBtn (){
    // unfold side bar when clicked
    var sideBtn = document.getElementById("triangle")
    var sideBar = sideBtn.parentElement.lastElementChild
    
    if (sideBar.style.display == "none"){
        sideBar.style.display = "block"
        sideBtn.style.transform = "rotateX(180deg)"
    }
    else{
        sideBar.style.display = "none"
        sideBtn.style.transform = "none"
    }
}

function getCurrentTime(){
    // get the current time and display it on the dashboard page
    let AuDate = new Date().toLocaleString("en-US", {
        timeZone: "Australia/Sydney"
    });
    let dateString = AuDate.toString().replace(',', ' ');
    document.getElementById("tableTime").innerHTML = dateString.split(" ")[0]
}
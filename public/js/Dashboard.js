function click_sideBtn (){
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
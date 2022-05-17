function click_addButton(){
    var form = document.getElementById("noteForm");
    var note = document.getElementById("note");
    form.style.display = "block";
    note.style.display = "none";
}


function click_cancelButton(){
    var form = document.getElementById("noteForm");
    var note = document.getElementById("note");
    form.style.display = "none";
    note.style.display = "block";
}
// reload page after 1 sec
function reloadPage(){
    setTimeout(() => {
        window.location.reload()
    }, "1000")
}
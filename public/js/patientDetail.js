// perform some display change when add clicked
function clickAddButton(){
    var form = document.getElementById("noteForm");
    var note = document.getElementById("note");
    form.style.display = "block";
    note.style.display = "none";
}

// perform some display change when cancel clicked
function clickCancelButton(){
    var form = document.getElementById("noteForm");
    var note = document.getElementById("note");
    form.style.display = "none";
    note.style.display = "block";
}

// set time out to reload the current page
function reloadSupportmessagePage(){
    if(document.getElementById("supportMessageContent").value != ''){
        setTimeout(() => {
            window.location.reload()
        }, "1000")
    }
}

// reload page after 1 sec
function reloadPage(){
    if(document.getElementById("content").value != ''){
        setTimeout(() => {
            window.location.reload()
        }, "1000")
    }
}
// check if support message input is valid 
function supportMessageValidation(){
    // cannot submit empty support message
    if(document.getElementById("supportMessageContent").value.replace(/ /g,'') == ''){
        try {
            Swal.fire(
                'Please enter a support message',
                'please check',
                'error'
            )
        } catch (error) {
            alert("Please enter a support message")
        }
        return false;
    }
    return true;
}
// check if comment message input is valid 
function commentValidation(){
    // cannot submit empty comment
    if(document.getElementById("content").value.replace(/ /g,'') == ''){
        try {
            Swal.fire(
                'Please enter a note',
                'please check',
                'error'
            )
        } catch (error) {
            alert("Please enter a note")
        }
        return false;
    }
    return true;
}
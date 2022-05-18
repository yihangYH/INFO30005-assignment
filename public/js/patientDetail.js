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
function supportMessageValidation(){
    if(document.getElementById("supportMessageContent").value == ''){
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
function commentValidation(){
    if(document.getElementById("content").value == ''){
        try {
            Swal.fire(
                'Please enter a comment',
                'please check',
                'error'
            )
        } catch (error) {
            alert("Please enter a comment")
        }
        return false;
    }
    return true;
}
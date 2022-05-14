// init some helper array, which has same order
const datas = ['blood-glucose-data', 'weight-data', 'insulin-taken-data', 'exercise-data'];
const dates = ['blood-glucose-date', 'weight-date', 'insulin-taken-date', 'exercise-date'];
const inputs = ['blood-glucose-input', 'weight-input', 'insulin-taken-input', 'exericse-input'];
const pens = ['pen', 'pen1', 'pen2', 'pen3'];
const butns = ['butn1', 'butn2', 'butn3', 'butn4'];
const comments = ['comment', 'comment1', 'comment2', 'comment3'];
const names = ['blood-glucose', 'weight', 'insulin-taken', 'exercise'];
const arrows = ["blood-glucose-arrow", "weight-arrow", "insulin-taken-arrow", "exercise-arrow"];

// this function is used for change display when update btn clicked
function updateBtnclick() {
    document.getElementById('main-body').style.display = 'none';
    document.getElementById('date').style.display = 'none';
    document.getElementById('text').style.display = 'none';
    document.getElementById('blur').style.display = 'flex';
    document.getElementById('cancel').style.display = 'flex';
    document.getElementById('container').style.display = 'block';
    // reload update page to get the corresponding info
    reloadUpdatePage();
}


function reloadUpdatePage() {
    for (let i = 0; i < 4; i++) {
        var date = document.getElementById(dates[i]).innerHTML
        // if the date not include no
        if(!date.includes("No")){
            // date display in the page
            date = date.substring(17, date.length - 10).split('/')
            // get current time
            let AuDate = new Date().toLocaleString("en-US", {
                timeZone: "Australia/Sydney"
            });
            let dateString = AuDate.toString().replace(',', ' ');
            const currentMonth = dateString.split('/')[0];
            const currentDay = dateString.split('/')[1];
            // check the if in the same day, if in the same day, update field display today's updated data 
            if (currentDay == date[1].replace(/\s/g,'') && currentMonth == date[0].replace(/\s/g,'')) {
                document.getElementById(inputs[i]).value = document.getElementById(datas[i]).innerHTML.split('&')[0].replace(/\s/g, '');
            }
        }
    }
}

// check if data are entered. before submit post request
function validation() {
    for (let i = 0; i < 4; i++) {
        if (document.getElementById(inputs[i]).value != "Not Required" && document.getElementById(inputs[i]).value != "" && !document.getElementById(inputs[i]).readOnly) {
            // call checkComment function, if data is entered
            if (!checkComment()) {
                return false;
            }
            // call updatePulsClick function
            updatePlusClick();
            return true;
        }
    }
    // if all data has updated, alert message
    if (document.getElementById('blood-glucose-input').readOnly && document.getElementById('weight-input').readOnly && document.getElementById('insulin-taken-input').readOnly && document.getElementById('exericse-input').readOnly) {
        try {
            Swal.fire(
                'All data has been updated',
                'please close',
                'error'
            )
        } catch (error) {
            // if sweetalert2 not working, use defualt alert
            document.getElementById("myModal").style.display = "block";
            document.getElementById("error-message").innerHTML = "All data has been updated"
        }
        return false;
    }

    try {
        // if no data entered, alert error message
        Swal.fire(
            'Please enter at least one data before update',
            'please check',
            'error'
        )
    } catch (error) {
        document.getElementById("myModal").style.display = "block";
        document.getElementById("error-message").innerHTML = "Please enter at least one data before update"
    }
    try {
        // if no data entered, alert error message
        Swal.fire(
            'Data update successfully',
            'please check',
            'success'
        )
    } catch (error) {
        document.getElementById("myModal").style.display = "block";
        document.getElementById("error-message").innerHTML = "Data update successfully"
    }

    return true;
}

// if only data entered and comment is not entered, return false 
// if only comment entered and data is not entered, return false 
function checkComment() {
    for (let i = 0; i < 4; i++) {
        // check if only data is entered
        if (document.getElementById(inputs[i]).value != "Not Required" && document.getElementById(inputs[i]).value != "" && document.getElementById(comments[i]).innerHTML.includes("+ Comment")) {
            try {
                Swal.fire(
                    'Please enter ' + names[i] + ' comment before update',
                    'please check',
                    'error'
                )
            } catch (error) {
                document.getElementById("myModal").style.display = "block";
                document.getElementById("error-message").innerHTML = "Please enter " + names[i] + " comment before update"
            }
            return false;
        }
    }
    // check if only comment is enterd 
    for (let i = 0; i < 4; i++) {
        if (!document.getElementById(comments[i]).innerHTML.includes("+ Comment") && document.getElementById(inputs[i]).value == "") {
            try {
                Swal.fire(
                    'Please enter ' + names[i] + ' data before update',
                    'please check',
                    'error'
                )
            } catch (error) {
                document.getElementById("myModal").style.display = "block";
                document.getElementById("error-message").innerHTML = "Please enter " + names[i] + " data before update"
            }
            return false;
        }
    }
    return true;
}

function updatePlusClick() {
    var validator = false;
    // if data is entered validator = true
    for (let i = 0; i < 4; i++) {
        if (document.getElementById(inputs[i]).value != "Not Required" && document.getElementById(inputs[i]).value != "") {
            validator = true;
        }
    }
    // display orginal data page and hide update data page.
    if (validator) {
        document.getElementById('main-body').style.display = '';
        document.getElementById('date').style.display = 'flex';
        document.getElementById('text').style.display = 'block';
        document.getElementById('blur').style.display = 'none';
        document.getElementById('cancel').style.display = 'none';
        document.getElementById('container').style.display = 'none';
    }
}

// display comment area
function setCommentWindow() {
    document.getElementById('text-block').style.display = 'flex';
    document.getElementById('comment').style.display = 'none';
    document.getElementById('butn1').style.display = 'none';
    document.getElementById('submit-div').style.display = 'flex';
    document.getElementById('pen').style.display = 'none';

}

// display comment area
function setCommentWindow1() {
    document.getElementById('text-block1').style.display = 'flex';
    document.getElementById('comment1').style.display = 'none';
    document.getElementById('butn2').style.display = 'none';
    document.getElementById('submit-div1').style.display = 'flex';
    document.getElementById('pen1').style.display = 'none';
}

// display comment area
function setCommentWindow2() {
    document.getElementById('text-block2').style.display = 'flex';
    document.getElementById('comment2').style.display = 'none';
    document.getElementById('butn3').style.display = 'none';
    document.getElementById('submit-div2').style.display = 'flex';
    document.getElementById('pen2').style.display = 'none';
}

// display comment area
function setCommentWindow3() {
    document.getElementById('text-block3').style.display = 'flex';
    document.getElementById('submit-div3').style.display = 'flex';
    document.getElementById('comment3').style.display = 'none';
    document.getElementById('butn4').style.display = 'none';
    document.getElementById('pen3').style.display = 'none';
}

// comment arra submit button logic 
function submit0() {
    document.getElementById('text-block').style.display = 'none';
    document.getElementById('comment').style.display = 'flex';
    document.getElementById('butn1').style.display = 'flex';
    document.getElementById('submit-div').style.display = 'none';
    var text = document.getElementById('text-block').value;

    if(text == ""){
        document.getElementById('pen').style.display = 'flex';
    }
    // when submit is clicked, display comment.
    if(/\p{L}/u.test(text)){
        // if comment length is > 22, display part of it 
        if (String(text).length > 22) {
            document.getElementById('comment').innerHTML = text.substring(0, 22) + "...";
            imgp = document.createElement("IMG");
            imgp.setAttribute("src", "../res/pen.png");
            imgp.setAttribute('class', "pen");
            imgp.setAttribute('id', 'pen');
            document.getElementById('comment').appendChild(imgp);
            document.getElementById('pen').style.position = 'absolute';

            if (window.innerWidth == 375) {
                document.getElementById('pen').style.left = '122%';
            }else if(window.innerWidth > 1900) {
                document.getElementById('pen').style.left = '98%';
            }else if(window.innerWidth > 1000 && window.innerWidth < 1200){
                document.getElementById('pen').style.left = '98%';
            }
        // else display all the comments 
        } else {
            // create a new pen img for display purpose after submit clicked
            document.getElementById('comment').innerHTML = text;
            imgp = document.createElement("IMG");
            imgp.setAttribute("src", "../res/pen.png");
            imgp.setAttribute('class', "pen");
            imgp.setAttribute('id', 'pen');
            document.getElementById('comment').appendChild(imgp);
            document.getElementById('pen').style.position = 'absolute';
            // set different position based on the different screen size 
            if (window.innerWidth == 375) {
                document.getElementById('pen').style.left = '122%';
            }else if(window.innerWidth > 1900) {
                document.getElementById('pen').style.left = '98%';
            }else if( window.innerWidth > 1000 && window.innerWidth < 1200){
                document.getElementById('pen').style.left = '98%';
            }
        }
    }
}

// comment area submit button logic 
// same logic as above 
function submit1() {
    document.getElementById('text-block1').style.display = 'none';
    document.getElementById('comment1').style.display = 'flex';
    document.getElementById('butn2').style.display = 'flex';
    document.getElementById('submit-div1').style.display = 'none';
    var text = document.getElementById('text-block1').value;

    if (text == "") {
        document.getElementById('pen1').style.display = 'flex';
    }

    if (/\p{L}/u.test(text)) {
        if (String(text).length > 22) {
            document.getElementById('comment1').innerHTML = text.substring(0, 22) + "...";
            imgp = document.createElement("IMG");
            imgp.setAttribute("src", "../res/pen.png");
            imgp.setAttribute('class', "pen");
            imgp.setAttribute('id', 'pen1');
            document.getElementById('comment1').appendChild(imgp);
            document.getElementById('pen1').style.position = 'absolute';
            if (window.innerWidth == 375) {
                document.getElementById('pen1').style.left = '120%';
            } else if (window.innerWidth > 1900) {
                document.getElementById('pen1').style.left = '98%';
            } else if( window.innerWidth > 1000 && window.innerWidth < 1200){
                document.getElementById('pen1').style.left = '98%';
            }
        } else {
            document.getElementById('comment1').innerHTML = text;
            imgp = document.createElement("IMG");
            imgp.setAttribute("src", "../res/pen.png");
            imgp.setAttribute('class', "pen");
            imgp.setAttribute('id', 'pen1');
            document.getElementById('comment1').appendChild(imgp);
            document.getElementById('pen1').style.position = 'absolute';
            if (window.innerWidth == 375) {
                document.getElementById('pen1').style.left = '120%';
            } else if (window.innerWidth > 1900) {
                document.getElementById('pen1').style.left = '98%';
            } else if( window.innerWidth > 1000 && window.innerWidth < 1200){
                document.getElementById('pen1').style.left = '98%';
            }
        }
    }
}

// comment area submit button logic 
// same logic as above
function submit2() {
    document.getElementById('text-block2').style.display = 'none';
    document.getElementById('comment2').style.display = 'flex';
    document.getElementById('butn3').style.display = 'flex';
    document.getElementById('submit-div2').style.display = 'none';
    var text = document.getElementById('text-block2').value;

    if (text == "") {
        document.getElementById('pen2').style.display = 'flex';
    }

    if (/\p{L}/u.test(text)) {
        if (String(text).length > 22) {
            document.getElementById('comment2').innerHTML = text.substring(0, 22) + "...";
            imgp = document.createElement("IMG");
            imgp.setAttribute("src", "../res/pen.png");
            imgp.setAttribute('class', "pen");
            imgp.setAttribute('id', 'pen2');
            document.getElementById('comment2').appendChild(imgp);
            document.getElementById('pen2').style.position = 'absolute';

            if (window.innerWidth == 375) {
                document.getElementById('pen2').style.left = '120%';
            } else if (window.innerWidth == 1980) {
                document.getElementById('pen2').style.left = '98%';
            } else if( window.innerWidth > 1000 && window.innerWidth < 1200){
                document.getElementById('pen2').style.left = '98%';
            }
        } else {
            document.getElementById('comment2').innerHTML = text;
            imgp = document.createElement("IMG");
            imgp.setAttribute("src", "../res/pen.png");
            imgp.setAttribute('class', "pen");
            imgp.setAttribute('id', 'pen2');
            document.getElementById('comment2').appendChild(imgp);
            document.getElementById('pen2').style.position = 'absolute';
            if (window.innerWidth == 375) {
                document.getElementById('pen2').style.left = '120%';
            } else if (window.innerWidth > 1900) {
                document.getElementById('pen2').style.left = '98%';
            } else if( window.innerWidth > 1000 && window.innerWidth < 1200){
                document.getElementById('pen2').style.left = '98%';
            }
        }
    }
}

// comment area submit button logic 
// same logic as above
function submit3() {
    document.getElementById('text-block3').style.display = 'none';
    document.getElementById('comment3').style.display = 'flex';
    document.getElementById('butn4').style.display = 'flex';
    document.getElementById('submit-div3').style.display = 'none';
    var text = document.getElementById('text-block3').value;
    if (text == "") {
        document.getElementById('pen3').style.display = 'flex';
    }
    if (/\p{L}/u.test(text)) {
        if (String(text).length > 22) {
            document.getElementById('comment3').innerHTML = text.substring(0, 22) + "...";
            imgp = document.createElement("IMG");
            imgp.setAttribute("src", "../res/pen.png");
            imgp.setAttribute('class', "pen");
            imgp.setAttribute('id', 'pen3');
            document.getElementById('comment3').appendChild(imgp);
            document.getElementById('pen3').style.position = 'absolute';
            if (window.innerWidth == 375) {
                document.getElementById('pen3').style.left = '120%';
            } else if (window.innerWidth >1900) {
                document.getElementById('pen3').style.left = '98%';
            } else if( window.innerWidth > 1000 && window.innerWidth < 1200){
                document.getElementById('pen3').style.left = '98%';
            }
        } else {
            document.getElementById('comment3').innerHTML = text;
            imgp = document.createElement("IMG");
            imgp.setAttribute("src", "../res/pen.png");
            imgp.setAttribute('class', "pen");
            imgp.setAttribute('id', 'pen3');
            document.getElementById('comment3').appendChild(imgp);
            document.getElementById('pen3').style.position = 'absolute';
            if (window.innerWidth == 375) {
                document.getElementById('pen3').style.left = '120%';
            } else if (window.innerWidth > 1900) {
                document.getElementById('pen3').style.left = '98%';
            } else if( window.innerWidth > 1000 && window.innerWidth < 1200){
                document.getElementById('pen3').style.left = '98%';
            }
        }
    }

}

// clear cooment area
function commentClear() {
    document.getElementById('text-block').value = "";
    document.getElementById('comment').innerHTML = "+ Comment"
    imgp = document.createElement("IMG");
    imgp.setAttribute("src", "../res/pen.png");
    imgp.setAttribute('class', "pen");
    imgp.setAttribute('id', 'pen');
    document.getElementById('comment').appendChild(imgp);
    document.getElementById('pen').style.position = 'absolute';
    // set position for different screen size
    if (window.innerWidth == 375) {
        document.getElementById('pen').style.left = '122%';
    } else if (window.innerWidth > 1900) {
        document.getElementById('pen').style.left = '98%';
    } else if( window.innerWidth > 1000 && window.innerWidth < 1200){
        document.getElementById('pen').style.left = '98%';
    }
}

// clear cooment area
// same logic as above
function commentClear1() {
    document.getElementById('text-block1').value = "";
    document.getElementById('comment1').innerHTML = "+ Comment"
    imgp = document.createElement("IMG");
    imgp.setAttribute("src", "../res/pen.png");
    imgp.setAttribute('class', "pen");
    imgp.setAttribute('id', 'pen1');
    document.getElementById('comment1').appendChild(imgp);
    document.getElementById('pen1').style.position = 'absolute';
    if (window.innerWidth == 375) {
        document.getElementById('pen1').style.left = '122%';
    } else if (window.innerWidth > 1900) {
        document.getElementById('pen1').style.left = '98%';
    } else if( window.innerWidth > 1000 && window.innerWidth < 1200){
        document.getElementById('pen1').style.left = '98%';
    }
}

// clear cooment area
// same logic as above
function commentClear2() {
    document.getElementById('text-block2').value = "";
    document.getElementById('comment2').innerHTML = "+ Comment"
    imgp = document.createElement("IMG");
    imgp.setAttribute("src", "../res/pen.png");
    imgp.setAttribute('class', "pen");
    imgp.setAttribute('id', 'pen2');
    document.getElementById('comment2').appendChild(imgp);
    document.getElementById('pen2').style.position = 'absolute';
    if (window.innerWidth == 375) {
        document.getElementById('pen2').style.left = '122%';
    } else if (window.innerWidth > 1900) {
        document.getElementById('pen2').style.left = '98%';
    } else if( window.innerWidth > 1000 && window.innerWidth < 1200){
        document.getElementById('pen2').style.left = '98%';
    }
}

// clear cooment area
// same logic as above 
function commentClear3() {
    document.getElementById('text-block3').value = "";
    document.getElementById('comment3').innerHTML = "+ Comment"
    imgp = document.createElement("IMG");
    imgp.setAttribute("src", "../res/pen.png");
    imgp.setAttribute('class', "pen");
    imgp.setAttribute('id', 'pen3');
    document.getElementById('comment3').appendChild(imgp);
    document.getElementById('pen3').style.position = 'absolute';
    if (window.innerWidth == 375) {
        document.getElementById('pen3').style.left = '122%';
    } else if (window.innerWidth > 1900) {
        document.getElementById('pen3').style.left = '98%';
    } else if( window.innerWidth > 1000 && window.innerWidth < 1200){
        document.getElementById('pen3').style.left = '98%';
    }
}

// close data update page and display data page
function cancel() {
    document.getElementById('main-body').style.display = '';
    document.getElementById('date').style.display = 'flex';
    document.getElementById('text').style.display = 'block';
    document.getElementById('blur').style.display = 'none';
    document.getElementById('cancel').style.display = 'none';
    document.getElementById('container').style.display = 'none';

}
// display not required if this data is not requried
function setPatientDataValue(data) {
    for (let i = 0; i < 4; i++) {
        if (!data[i]) {
            document.getElementById(datas[i]).innerHTML = "Not Required"
            document.getElementById(dates[i]).innerHTML = "Updated on: No Record"
            document.getElementById(inputs[i]).readOnly = true
            document.getElementById(inputs[i]).value = "Not Required"
            document.getElementById(butns[i]).disabled = true
            document.getElementById(butns[i]).style.cursor = "none"
            document.getElementById(arrows[i]).style.pointerEvents = "none"
            // document.getElementById(comments[i]).style.display = "none"
           
        }
        if (document.getElementById(inputs[i]).readOnly) {
            document.getElementById(pens[i]).style.display = "none"
        }
    }
}

// display value in update data page based on different logic
function checkUpdated(data) {
    // get current time
    let AuDate = new Date().toLocaleString("en-US", {
        timeZone: "Australia/Sydney"
    });
    let dateString = AuDate.toString().replace(',', ' ');
    for (let i = 0; i < 4; i++) {
        // get the data updated time 
        const currentMonth = dateString.split('/')[0];
        const currentDay = dateString.split('/')[1];
        const updateTime = document.getElementById(dates[i]).innerHTML;
        let time = updateTime.substring(18).split(' ')[0].split('/');
        const day = time[1];
        const month = time[0];
        // if the data is entered is today, display this data, and 
        // set corresponding field to not eidtable 
        if (day == currentDay && month == currentMonth) {
            document.getElementById(inputs[i]).readOnly = true
            document.getElementById(inputs[i]).value = document.getElementById(inputs[i]).innerHTML
            document.getElementById(butns[i]).disabled = true
            document.getElementById(butns[i]).style.cursor = "none"
        } else {
            // if data value contains Not means, this data is not reuqired
            // display orginal text
            if (data[i]&&!document.getElementById(datas[i]).innerHTML.includes("Yet")) {
                document.getElementById(comments[i]).innerHTML = "+ Comment" + document.getElementById(comments[i]).innerHTML
            }
        }

    }

}

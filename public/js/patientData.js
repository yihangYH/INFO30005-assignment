

function updateBtnclick() {
    document.getElementById('main-body').style.display = 'none';
    document.getElementById('date').style.display = 'none';
    document.getElementById('text').style.display = 'none';
    document.getElementById('blur').style.display = 'flex';
    document.getElementById('cancel').style.display = 'flex';
    document.getElementById('container').style.display = 'block';
    // the comment out function is for detecting if patient has already uploaded the data
    reloadUpdatePage();
}

function reloadUpdatePage(){
    var date = document.getElementById('blood-glucose-date').innerHTML
    date = date.substring(17, date.length - 10).split('/')
    let today = new Date();
    if(today.getDate() == date[1] && today.getMonth() == date[0] - 1){
        document.getElementById('blood-glucose-input').value = document.getElementById('blood-glucose-data').innerHTML.split('&')[0];
    }
    date = document.getElementById('weight-date').innerHTML
    date = date.substring(17, date.length - 10).split('/')
    if(today.getDate() == date[1] && today.getMonth() == date[0] - 1){
        document.getElementById('weight-input').value = document.getElementById('weight-data').innerHTML.split('&')[0];
    }
    date = document.getElementById('insulin-taken-date').innerHTML
    date = date.substring(17, date.length - 10).split('/')
    if(today.getDate() == date[1] && today.getMonth() == date[0] - 1){
        document.getElementById('insulin-taken-input').value = document.getElementById('insulin-taken-data').innerHTML.split('&')[0];
    }
    date = document.getElementById('exercise-date').innerHTML
    date = date.substring(17, date.length - 10).split('/')
    if(today.getDate() == date[1] && today.getMonth() == date[0] - 1){
        document.getElementById('exericse-input').value = document.getElementById('exercise-data').innerHTML.split('&')[0];
    }
}

function validation(){
    if(document.getElementById('weight-input').readOnly && document.getElementById('weight-input').readOnly
        && document.getElementById('insulin-taken-input').readOnly && document.getElementById('exericse-input').readOnly){
            try {
                Swal.fire(
                    'You already update all datas',
                    'please close',
                    'error'
                  )
            } catch (error) {
                document.getElementById("myModal").style.display = "block";
                document.getElementById("error-message").innerHTML ="You already update all datas"
            }
            return false;
    }
    if(document.getElementById('blood-glucose-input').value != "Not required" && document.getElementById('blood-glucose-input').value != ""){

        return true;
    }
    if(document.getElementById('weight-input').value != "Not required" && document.getElementById('weight-input').value != ""){

        return true;
    }
    if(document.getElementById('insulin-taken-input').value != "Not required" && document.getElementById('insulin-taken-input').value != ""){

        return true;
    }
    if(document.getElementById('exericse-input').value != "Not required" && document.getElementById('exericse-input').value != ""){

        return true;
    }
    try {
        Swal.fire(
            'Please enter at least one data before update',
            'please check',
            'error'
          )
    } catch (error) {
        document.getElementById("myModal").style.display = "block";
        document.getElementById("error-message").innerHTML ="Please enter at least one data before update"
    }
    
    return false;
}

function updatePlusClick() {
    var validator = false;
    if(document.getElementById('blood-glucose-input').value != "Not required" && document.getElementById('blood-glucose-input').value != ""){
        validator = true;
    }
    if(document.getElementById('weight-input').value != "Not required" && document.getElementById('weight-input').value != ""){
        validator = true;
    }
    if(document.getElementById('insulin-taken-input').value != "Not required" && document.getElementById('insulin-taken-input').value != ""){
        validator = true;
    }
    if(document.getElementById('exericse-input').value != "Not required" && document.getElementById('exericse-input').value != ""){
        validator = true;
    }
    if(validator){
        document.getElementById('main-body').style.display = 'flex';
        document.getElementById('date').style.display = 'flex';
        document.getElementById('text').style.display = 'flex';
        document.getElementById('blur').style.display = 'none';
        document.getElementById('cancel').style.display = 'none';
        document.getElementById('container').style.display = 'none';
}
    }


function setCommentWindow() {
    document.getElementById('text-block').style.display = 'flex';
    document.getElementById('comment').style.display = 'none';
    document.getElementById('butn1').style.display = 'none';
    document.getElementById('submit-div').style.display = 'flex';
    document.getElementById('pen').style.display = 'none';

}

function setCommentWindow1() {
    document.getElementById('text-block1').style.display = 'flex';
    document.getElementById('comment1').style.display = 'none';
    document.getElementById('butn2').style.display = 'none';
    document.getElementById('submit-div1').style.display = 'flex';
    document.getElementById('pen1').style.display = 'none';
}

function setCommentWindow2() {
    document.getElementById('text-block2').style.display = 'flex';
    document.getElementById('comment2').style.display = 'none';
    document.getElementById('butn3').style.display = 'none';
    document.getElementById('submit-div2').style.display = 'flex';
    document.getElementById('pen2').style.display = 'none';
}

function setCommentWindow3() {
    document.getElementById('text-block3').style.display = 'flex';
    document.getElementById('submit-div3').style.display = 'flex';
    document.getElementById('comment3').style.display = 'none';
    document.getElementById('butn4').style.display = 'none';
    document.getElementById('pen3').style.display = 'none';
}

function submit0() {
    document.getElementById('text-block').style.display = 'none';
    document.getElementById('comment').style.display = 'flex';
    document.getElementById('butn1').style.display = 'flex';
    document.getElementById('submit-div').style.display = 'none';
    var text = document.getElementById('text-block').value;
    if (text == "") {
        document.getElementById('pen').style.display = 'flex';
    }
    if (/\p{L}/u.test(text)) {
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
            } else if (window.innerWidth == 1980) {
                document.getElementById('pen').style.left = '98%';
            }
            // document.getElementById('pen').style.left='122%';


        } else {
            document.getElementById('comment').innerHTML = text;
            imgp = document.createElement("IMG");
            imgp.setAttribute("src", "../res/pen.png");
            imgp.setAttribute('class', "pen");
            imgp.setAttribute('id', 'pen');
            document.getElementById('comment').appendChild(imgp);
            document.getElementById('pen').style.position = 'absolute';
            if (window.innerWidth == 375) {
                document.getElementById('pen').style.left = '122%';
            } else if (window.innerWidth == 1980) {
                document.getElementById('pen').style.left = '98%';
            }
        }
    }
}

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
            } else if (window.innerWidth == 1980) {
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
            } else if (window.innerWidth == 1980) {
                document.getElementById('pen1').style.left = '98%';
            }
        }
    }

}


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
        // const comment = document.getElementById('text-block1').value;
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
            } else if (window.innerWidth == 1980) {
                document.getElementById('pen2').style.left = '98%';
            }
        }
    }
}

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
            } else if (window.innerWidth == 1980) {
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
            } else if (window.innerWidth == 1980) {
                document.getElementById('pen3').style.left = '98%';
            }
        }
    }

}

function commentClear() {
    document.getElementById('text-block').value = "";
    document.getElementById('comment').innerHTML = "+ Comment"
    imgp = document.createElement("IMG");
    imgp.setAttribute("src", "../res/pen.png");
    imgp.setAttribute('class', "pen");
    imgp.setAttribute('id', 'pen');
    document.getElementById('comment').appendChild(imgp);
    document.getElementById('pen').style.position = 'absolute';
    if (window.innerWidth == 375) {
        document.getElementById('pen').style.left = '122%';
    } else if (window.innerWidth == 1980) {
        document.getElementById('pen').style.left = '98%';
    }
}

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
    } else if (window.innerWidth == 1980) {
        document.getElementById('pen1').style.left = '98%';
    }
}

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
    } else if (window.innerWidth == 1980) {
        document.getElementById('pen2').style.left = '98%';
    }
}

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
    } else if (window.innerWidth == 1980) {
        document.getElementById('pen3').style.left = '98%';
    }
}


function cancel() {
    document.getElementById('main-body').style.display = 'flex';
    document.getElementById('date').style.display = 'flex';
    document.getElementById('text').style.display = 'flex';
    document.getElementById('blur').style.display = 'none';
    document.getElementById('cancel').style.display = 'none';
    document.getElementById('container').style.display = 'none';
    // window.location.reload();
}

function weightFunction(){
    document.getElementById('weight-input').readOnly = true
    document.getElementById('weight-input').value = "Not required"
    document.getElementById('butn2').disabled = true
    document.getElementById('butn2').style.cursor = "none"
}
function bloodGlucose(){
    document.getElementById('blood-glucose-input').readOnly = true
    document.getElementById('blood-glucose-input').value = "Not required"
    document.getElementById('butn1').disabled = true
    document.getElementById('butn1').style.cursor = "none"
}
function insulin(){
    document.getElementById('insulin-taken-input').readOnly = true
    document.getElementById('insulin-taken-input').value = "Not required"
    document.getElementById('butn3').disabled = true
    document.getElementById('butn3').style.cursor = "none"
}

function exerciseFunction(){
    document.getElementById('exericse-input').readOnly = true
    document.getElementById('exericse-input').value = "Not required"
    document.getElementById('butn4').disabled = true
    document.getElementById('butn4').style.cursor = "none"
}

function setPatientDataValue(data){
    for(let i = 0; i < 4; i++){
        if(i == 0 ){
            if(!data[0]){
                document.getElementById("blood-glucose-data").innerHTML = "Not required"
                document.getElementById("blood-glucose-date").innerHTML = "Updated on: No Record"
                bloodGlucose()
            }
        }else if(i==1 ){
            if(!data[1]){
                document.getElementById("weight-data").innerHTML = "Not required"
                document.getElementById("weight-date").innerHTML = "Updated on: No Record"
                weightFunction()
            }
        }else if(i==2){
            if(!data[2]){
                document.getElementById("insulin-taken-data").innerHTML = "Not required"
                document.getElementById("insulin-taken-date").innerHTML = "Updated on: No Record"
                insulin()
            }
        }else{
            if(!data[3]){
                document.getElementById("exercise-data").innerHTML = "Not required"
                document.getElementById("exercise-date").innerHTML = "Updated on: No Record"
                exericseFunction()
            }
        }
    }

}

function checkUpdated(){
    let AuDate = new Date().toLocaleString("en-US", {timeZone: "Australia/Sydney"});
    let dateString = AuDate.toString().replace(',', ' ');
    for(let i = 0 ; i < 4; i++){
        if(i == 0){
            const currentMonth = dateString.split('/')[1];
            const currentDay = dateString.split('/')[0];
            const updateTime = document.getElementById('blood-glucose-date').innerHTML;
            let time = updateTime.substring(18).split(' ')[0].split('/');
            const day = time[0];
            const month = time[1];
            if(day == currentDay && month == currentMonth){
                document.getElementById('blood-glucose-input').readOnly = true
                document.getElementById('blood-glucose-input').value = document.getElementById('blood-glucose-input').innerHTML
                document.getElementById('butn1').disabled = true
                document.getElementById('butn1').style.cursor = "none"
            }
        }else if(i == 1){
            const currentMonth = dateString.split('/')[1];
            const currentDay = dateString.split('/')[0];
            const updateTime = document.getElementById('weight-date').innerHTML;
            let time = updateTime.substring(18).split(' ')[0].split('/');
            const day = time[0];
            const month = time[1];
            if(day == currentDay && month == currentMonth){
                document.getElementById('weight-input').readOnly = true
                document.getElementById('weight-input').value = document.getElementById('weight-input').innerHTML
                document.getElementById('butn2').disabled = true
                document.getElementById('butn2').style.cursor = "none"
            }
        }else if(i == 2){
            const currentMonth = dateString.split('/')[1];
            const currentDay = dateString.split('/')[0];
            const updateTime = document.getElementById('insulin-taken-date').innerHTML;
            let time = updateTime.substring(18).split(' ')[0].split('/');
            const day = time[0];
            const month = time[1];
            if(day == currentDay && month == currentMonth){
                document.getElementById('insulin-taken-input').readOnly = true
                document.getElementById('insulin-taken-input').value = document.getElementById('insulin-taken-input').innerHTML
                document.getElementById('butn3').disabled = true
                document.getElementById('butn3').style.cursor = "none"
            }
        }else{
            const currentMonth = dateString.split('/')[1];
            const currentDay = dateString.split('/')[0];
            const updateTime = document.getElementById('exercise-date').innerHTML;
            let time = updateTime.substring(18).split(' ')[0].split('/');
            const day = time[0];
            const month = time[1];
            if(day == currentDay && month == currentMonth){
                document.getElementById('exericse-input').readOnly = true
                document.getElementById('exericse-input').value = document.getElementById('exericse-input').innerHTML
                document.getElementById('butn4').disabled = true
                document.getElementById('butn4').style.cursor = "none"
            }
        }
    }
}
function updateBtnclick(){
    document.getElementById('main-body').style.display='none';
    document.getElementById('date').style.display='none';
    document.getElementById('text').style.display = 'none';
    document.getElementById('blur').style.display = 'flex';
    document.getElementById('cancel').style.display = 'flex';
    document.getElementById('container').style.display = 'block';
}


function updatePlusClick(){
    document.getElementById('main-body').style.display='flex';
    document.getElementById('date').style.display='flex';
    document.getElementById('text').style.display = 'flex';
    document.getElementById('blur').style.display = 'none';
    document.getElementById('cancel').style.display = 'none';
    document.getElementById('container').style.display = 'none';
}

function setCommentWindow(){
    document.getElementById('text-block').style.display = 'flex';
    document.getElementById('comment').style.display = 'none';
    document.getElementById('butn1').style.display = 'none';
    document.getElementById('submit-div').style.display = 'flex';
    document.getElementById('pen').style.display = 'none';
   
}

function setCommentWindow1(){
    document.getElementById('text-block1').style.display = 'flex';
    document.getElementById('comment1').style.display = 'none';
    document.getElementById('butn2').style.display = 'none';
    document.getElementById('submit-div1').style.display = 'flex';
    document.getElementById('pen1').style.display = 'none';
}
function setCommentWindow2(){
    document.getElementById('text-block2').style.display = 'flex';
    document.getElementById('comment2').style.display = 'none';
    document.getElementById('butn3').style.display = 'none';
    document.getElementById('submit-div2').style.display = 'flex';
    document.getElementById('pen2').style.display = 'none';
}

function setCommentWindow3(){
    document.getElementById('text-block3').style.display = 'flex';
    document.getElementById('submit-div3').style.display = 'flex';
    document.getElementById('comment3').style.display = 'none';
    document.getElementById('butn4').style.display = 'none';
    document.getElementById('pen3').style.display = 'none';
}

function submit(){
    document.getElementById('text-block').style.display = 'none';
    document.getElementById('comment').style.display = 'flex';
    document.getElementById('butn1').style.display = 'flex';
    document.getElementById('submit-div').style.display = 'none';
    var text = document.getElementById('text-block').value;
    if(text == "" ){
        document.getElementById('pen').style.display = 'flex';
    }
    if(/\p{L}/u.test(text)){
        if(String(text).length > 22){
            document.getElementById('comment').innerHTML= text.substring(0,22) + "..." ;
            imgp = document.createElement("IMG");
            imgp.setAttribute("src", "../public/res/pen.png");
            imgp.setAttribute('class',"pen");
            imgp.setAttribute('id','pen');
            document.getElementById('comment').appendChild(imgp);
            document.getElementById('pen').style.position='absolute';
            if(window.innerWidth == 375){
                document.getElementById('pen').style.left='122%';
            }else if (window.innerWidth==1980){
                document.getElementById('pen').style.left='98%';
            }
            // document.getElementById('pen').style.left='122%';

            
        }else{
            document.getElementById('comment').innerHTML= text;
            imgp = document.createElement("IMG");
            imgp.setAttribute("src", "../public/res/pen.png");
            imgp.setAttribute('class',"pen");
            imgp.setAttribute('id','pen');
            document.getElementById('comment').appendChild(imgp);
            document.getElementById('pen').style.position='absolute';
            if(window.innerWidth == 375){
                document.getElementById('pen').style.left='122%';
            }else if (window.innerWidth==1980){
                document.getElementById('pen').style.left='98%';
            }
        }
    }
}

function submit1(){
    document.getElementById('text-block1').style.display = 'none';
    document.getElementById('comment1').style.display = 'flex';
    document.getElementById('butn2').style.display = 'flex';
    document.getElementById('submit-div1').style.display = 'none';
    var text = document.getElementById('text-block1').value;
    if(text == "" ){
        document.getElementById('pen1').style.display = 'flex';
    }
    if(/\p{L}/u.test(text)){
        if(String(text).length > 22){
            document.getElementById('comment1').innerHTML= text.substring(0,22) + "...";
            imgp = document.createElement("IMG");
            imgp.setAttribute("src", "../public/res/pen.png");
            imgp.setAttribute('class',"pen");
            imgp.setAttribute('id','pen1');
            document.getElementById('comment1').appendChild(imgp);
            document.getElementById('pen1').style.position='absolute';
            if(window.innerWidth == 375){
                document.getElementById('pen1').style.left='120%';
            }else if (window.innerWidth==1980){
                document.getElementById('pen1').style.left='98%';
            }
        }else{
            document.getElementById('comment1').innerHTML= text;
            imgp = document.createElement("IMG");
            imgp.setAttribute("src", "../public/res/pen.png");
            imgp.setAttribute('class',"pen");
            imgp.setAttribute('id','pen1');
            document.getElementById('comment1').appendChild(imgp);
            document.getElementById('pen1').style.position='absolute';
            if(window.innerWidth == 375){
                document.getElementById('pen1').style.left='120%';
            }else if (window.innerWidth==1980){
                document.getElementById('pen1').style.left='98%';
            }
        }
    }

}


function submit2(){
    document.getElementById('text-block2').style.display = 'none';
    document.getElementById('comment2').style.display = 'flex';
    document.getElementById('butn3').style.display = 'flex';
    document.getElementById('submit-div2').style.display = 'none';
    var text = document.getElementById('text-block2').value;
    if(text == "" ){
        document.getElementById('pen2').style.display = 'flex';
    }
    if(/\p{L}/u.test(text)){
        // const comment = document.getElementById('text-block1').value;
        if(String(text).length > 22){
            document.getElementById('comment2').innerHTML= text.substring(0,22) + "...";
            imgp = document.createElement("IMG");
            imgp.setAttribute("src", "../public/res/pen.png");
            imgp.setAttribute('class',"pen");
            imgp.setAttribute('id','pen2');
            document.getElementById('comment2').appendChild(imgp);
            document.getElementById('pen2').style.position='absolute';
            if(window.innerWidth == 375){
                document.getElementById('pen2').style.left='120%';
            }else if (window.innerWidth==1980){
                document.getElementById('pen2').style.left='98%';
            }
        }else{
            document.getElementById('comment2').innerHTML= text;
            imgp = document.createElement("IMG");
            imgp.setAttribute("src", "../public/res/pen.png");
            imgp.setAttribute('class',"pen");
            imgp.setAttribute('id','pen2');
            document.getElementById('comment2').appendChild(imgp);
            document.getElementById('pen2').style.position='absolute';
            if(window.innerWidth == 375){
                document.getElementById('pen2').style.left='120%';
            }else if (window.innerWidth==1980){
                document.getElementById('pen2').style.left='98%';
            }
        }
    }
}

function submit3(){
    document.getElementById('text-block3').style.display = 'none';
    document.getElementById('comment3').style.display = 'flex';
    document.getElementById('butn4').style.display = 'flex';
    document.getElementById('submit-div3').style.display = 'none';
    var text = document.getElementById('text-block3').value;
    if(text == "" ){
        document.getElementById('pen3').style.display = 'flex';
    }
    if(/\p{L}/u.test(text)){
        if(String(text).length > 22){
            document.getElementById('comment3').innerHTML= text.substring(0,22) + "...";
            imgp = document.createElement("IMG");
            imgp.setAttribute("src", "../public/res/pen.png");
            imgp.setAttribute('class',"pen");
            imgp.setAttribute('id','pen3');
            document.getElementById('comment3').appendChild(imgp);
            document.getElementById('pen3').style.position='absolute';
            if(window.innerWidth == 375){
                document.getElementById('pen3').style.left='120%';
            }else if (window.innerWidth==1980){
                document.getElementById('pen3').style.left='98%';
            }
        }else{
            document.getElementById('comment3').innerHTML= text;
            imgp = document.createElement("IMG");
            imgp.setAttribute("src", "../public/res/pen.png");
            imgp.setAttribute('class',"pen");
            imgp.setAttribute('id','pen3');
            document.getElementById('comment3').appendChild(imgp);
            document.getElementById('pen3').style.position='absolute';
            if(window.innerWidth == 375){
                document.getElementById('pen3').style.left='120%';
            }else if (window.innerWidth==1980){
                document.getElementById('pen3').style.left='98%';
            }
        }
    }

}

function commentClear(){
    document.getElementById('text-block').value = "";
    document.getElementById('comment').innerHTML = "+ Comment"
    imgp = document.createElement("IMG");
            imgp.setAttribute("src", "../public/res/pen.png");
            imgp.setAttribute('class',"pen");
            imgp.setAttribute('id','pen');
            document.getElementById('comment').appendChild(imgp);
            document.getElementById('pen').style.position='absolute';
            if(window.innerWidth == 375){
                document.getElementById('pen').style.left='122%';
            }else if (window.innerWidth==1980){
                document.getElementById('pen').style.left='98%';
            }
}

function commentClear1(){
    document.getElementById('text-block1').value = "";
    document.getElementById('comment1').innerHTML = "+ Comment"
    imgp = document.createElement("IMG");
            imgp.setAttribute("src", "../public/res/pen.png");
            imgp.setAttribute('class',"pen");
            imgp.setAttribute('id','pen1');
            document.getElementById('comment1').appendChild(imgp);
            document.getElementById('pen1').style.position='absolute';
            if(window.innerWidth == 375){
                document.getElementById('pen1').style.left='122%';
            }else if (window.innerWidth==1980){
                document.getElementById('pen1').style.left='98%';
            }
}

function commentClear2(){
    document.getElementById('text-block2').value = "";
    document.getElementById('comment2').innerHTML = "+ Comment"
    imgp = document.createElement("IMG");
    imgp.setAttribute("src", "../public/res/pen.png");
    imgp.setAttribute('class',"pen");
    imgp.setAttribute('id','pen2');
    document.getElementById('comment2').appendChild(imgp);
    document.getElementById('pen2').style.position='absolute';
    if(window.innerWidth == 375){
        document.getElementById('pen2').style.left='122%';
    }else if (window.innerWidth==1980){
        document.getElementById('pen2').style.left='98%';
    }
}

function commentClear3(){
    document.getElementById('text-block3').value = "";
    document.getElementById('comment3').innerHTML = "+ Comment"
    imgp = document.createElement("IMG");
            imgp.setAttribute("src", "../public/res/pen.png");
            imgp.setAttribute('class',"pen");
            imgp.setAttribute('id','pen3');
            document.getElementById('comment3').appendChild(imgp);
            document.getElementById('pen3').style.position='absolute';
            if(window.innerWidth == 375){
                document.getElementById('pen3').style.left='122%';
            }else if (window.innerWidth ==1980){
                document.getElementById('pen3').style.left='98%';
            }
}


function cancel(){
    document.getElementById('main-body').style.display='flex';
    document.getElementById('date').style.display='flex';
    document.getElementById('text').style.display = 'flex';
    document.getElementById('blur').style.display = 'none';
    document.getElementById('cancel').style.display = 'none';
    document.getElementById('container').style.display = 'none';
}
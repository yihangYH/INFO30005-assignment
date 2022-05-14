checkBox = ["bloodGlucoseCheckboxUpdate","weightCheckboxUpdate","insulinTakenCheckboxUpdate", "exerciseCheckboxUpdate"]
lowervalue= ["bloodGlucoseLowerValueUpdate","weightLowerValueUpdate", "insulinTakenLowerValueUpdate","exerciseLowerBalueUpdate"]
uppervalue= ["bloodGlucoseUpperValueUpdate", "weightUpperValueUpdate", "insulinTakenUpperValueUpdate","exerciseUpperValueUpdate"]
function setRequired(data){
    for(let i =0 ;i<4; i++){
        if(data[i]){
            document.getElementById(checkBox[i]).checked = true;
            document.getElementById(lowervalue[i]).readOnly = false;
            document.getElementById(uppervalue[i]).readOnly = false;
        }
    }
}
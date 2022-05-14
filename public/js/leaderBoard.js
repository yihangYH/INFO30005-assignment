function findMaxDataRecorded(bloodGlucose,weight,exercise,insulinTaken) {
    var count = 0;
    var dataName="";
    if(bloodGlucose > count) {
        count = bloodGlucose;
        dataName = "bloodGlucose";
    }
    if(weight > count) {
        count = weight;
        dataName = "weight";
    }
    if(exercise > count) {
        count = exercise;
        dataName = "exercise";
    }
    if(insulinTaken > count) {
        count = insulinTaken;
        dataName = "insulinTaken";
    }
    return dataName;
}
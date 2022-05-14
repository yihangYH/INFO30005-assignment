function findMaxDataRecorded(bloodGlucose,weight,exercise,insulinTaken) {
    var count = 0;
    if(bloodGlucose > count) {
        count = bloodGlucose;
    }
    if(weight > count) {
        count = weight;
    }
    if(exercise > count) {
        count = exercise;
    }
    if(insulinTaken > count) {
        count = insulinTaken;
    }
    return count;
}
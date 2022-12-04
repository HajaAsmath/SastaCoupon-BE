const checkObjectForNullValue = (obj) => {
    for(const ele in obj) {
        if(!checkIfNull(obj[ele])) {
            return true;
        }
    }
    return false;
}

const checkIfNull = (ele) => {
    if(ele) {
        return true;
    }
    return false;
}

const checkPastDate = (date) => {
    const today = new Date();
    today.setHours(23, 59, 59, 998);
    console.log(date > today);
    return date > today;
}

const checkContainsNumber = (str) => {
    return /[0-9]/.test(str)
}
 
module.exports = {checkIfNull, checkPastDate, checkObjectForNullValue, checkContainsNumber}
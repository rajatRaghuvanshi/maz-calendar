const getDates = (working) => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    let curr = new Date();
    let week = []
    let start = 0;
    let end = 6;
    if (working) {
        start = 1;
        end = 5
    }
    for (let i = start; i <= end; i++) {
        let first = curr.getDate() - curr.getDay() + i 
            console.log(curr.getDate(), curr.getDay())
        let day = new Date(curr.setDate(first)).toString().slice(3, 15)
            console.log(first, day);
        let fullDay = days[new Date(day).getDay()];
        week.push(fullDay + ", " + day);
    }
    return week;
}

const TIMES = ["8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM"];
const DAYS = getDates();
const WORKINGHOURS = ["9 AM", "10 AM", "11 AM", "12 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM"];
const WORKINGDAYS = getDates(true);

const FULLTIMES = {
    "8 AM" : "8:00 am",
    "9 AM" : "9:00 am",
    "10 AM" : "10:00 am",
    "11 AM" : "11:00 am",
    "12 PM" : "12:00 pm",
    "1 PM" : "1:00 pm",
    "2 PM" : "2:00 pm",
    "3 PM" : "3:00 pm",
    "4 PM" : "4:00 pm",
    "5 PM" : "5:00 pm",
    "6 PM" : "6:00 pm",
    "7 PM" : "7:00 pm",
    "8 PM" : "8:00 pm",
    "9 PM" : "9:00 pm",
}




export {
    TIMES,
    DAYS,
    WORKINGHOURS,
    WORKINGDAYS,
    FULLTIMES
}
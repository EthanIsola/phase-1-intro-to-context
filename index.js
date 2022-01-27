// Your code here
function createEmployeeRecord(data) {
    let employee = {
        firstName: data[0],
        familyName: data[1],
        title: data[2],
        payPerHour: data[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employee
}

function createEmployeeRecords(data) {
    let employees = []
    for(let arr of data){
        employees.push(createEmployeeRecord(arr))
    }
    return employees
}

function createTimeInEvent(record, stamp) {
    let data = stamp.split(' ')
    let timeIn = {
    type: "TimeIn",
    hour: Number(data[1]),
    date: data[0]
    }
    record.timeInEvents.push(timeIn)
    return record
}

function createTimeOutEvent(record, stamp){
    let data = stamp.split(' ')
    let timeIn = {
    type: "TimeOut",
    hour: Number(data[1]),
    date: data[0]
    }
    record.timeOutEvents.push(timeIn)
    return record
}

function hoursWorkedOnDate(record, date){
    let firstTime;
    let secondTime;
    for(let item of record.timeInEvents){
        if(item.date == date){
            firstTime = item.hour
        }
    }
    for(let item of record.timeOutEvents){
        if(item.date == date){
            secondTime = item.hour
        }
    }
    return (secondTime-firstTime)/100
}

function wagesEarnedOnDate(record, date){
    return hoursWorkedOnDate(record, date)*record.payPerHour
}

function allWagesFor(record){
    let totalPay = 0
    for(let item of record.timeOutEvents){
        totalPay = totalPay + wagesEarnedOnDate(record, item.date)
    }
    return totalPay
}

function calculatePayroll(records){
    let totalOwed = 0
    for(let record of records){
        totalOwed = totalOwed + allWagesFor(record)
    }
    return totalOwed
}
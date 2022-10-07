import React from "react";
import { Component, Property } from "immutable-ics";

import "./CalGen.sass";

const dayDefs = ["M", "T", "W", "R", "F", "S", "U"];
function generateRRULE(days, semEndDate) {
    const RRULE_DAYS = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];
    const freq = "WEEKLY";
    const interval = 1;
    const until = new Property({
        name: "DTSTART",
        value: new Date(2022, 11, 24),
    }); //returns 2021-12-31T00:00:00.000Z

    var reqDays = "";
    days.split("").forEach((day) => {
        reqDays += RRULE_DAYS[dayDefs.indexOf(day)] + ",";
    });
    console.log("reqDays: " + reqDays);
    //remove last char of reqDays
    reqDays = reqDays.slice(0, -1);

    const RRULE_STRING = `FREQ=${freq};WKST=${
        RRULE_DAYS[dayDefs.indexOf(days.split("")[0])]
    };BYDAY=${reqDays};INTERVAL=1;UNTIL=${until}`.replace("DTSTART:", "");
    return RRULE_STRING;
}

function parseDayAndTimeToData(DATString, semStartDate, semEndDate) {
    // DATString FORMAT : MTWRFSU 08:00AM-09:00AM
    const days = DATString.split(" ")[0];
    const time = DATString.split(" ")[1];
    const timeStart = time.split("-")[0];
    const timeEnd = time.split("-")[1];
    //format [YEAR, MONTH, DAY, HOUR, MINUTE]
    const timeStartArray = [0, 0, 0, 0, 0];
    const timeEndArray = [0, 0, 0, 0, 0];

    //working with timeStartArray
    //day
    const dayIndex = dayDefs.indexOf(days[0]);
    const classDate = new Date(semStartDate);
    classDate.setDate(classDate.getDate() + dayIndex);
    //log
    console.log("classDate: " + classDate);
    console.log(semEndDate);
    timeStartArray[2] = classDate.getDate();
    //year
    timeStartArray[0] = classDate.getFullYear(); //returns 2021
    //month
    timeStartArray[1] = classDate.getMonth(); //returns 9
    //hour
    timeStartArray[3] =
        timeStart.slice(-2) == "PM" && timeStart.slice(0, 2) != "12"
            ? parseInt(timeStart.split(":")[0]) + 12
            : parseInt(timeStart.split(":")[0]);
    //minute
    timeStartArray[4] = parseInt(timeStart.split(":")[1].slice(0, 2));

    //working with timeEndArray
    //year
    timeEndArray[0] = classDate.getFullYear(); //returns 2021
    //month
    timeEndArray[1] = classDate.getMonth(); //returns 9
    //day
    timeEndArray[2] = classDate.getDate(); //returns 1
    //hour
    timeEndArray[3] =
        timeEnd.slice(-2) == "PM" && timeEnd.slice(0, 2) != "12"
            ? parseInt(timeEnd.split(":")[0]) + 12
            : parseInt(timeEnd.split(":")[0]);
    //minute
    timeEndArray[4] = parseInt(timeEnd.split(":")[1].slice(0, 2));

    return {
        start: new Date(
            timeStartArray[0],
            timeStartArray[1],
            timeStartArray[2],
            timeStartArray[3],
            timeStartArray[4]
        ),
        end: new Date(
            timeEndArray[0],
            timeEndArray[1],
            timeEndArray[2],
            timeEndArray[3],
            timeEndArray[4]
        ),
        // RRULE: generateRRULE(days, semEndDate),
    };
}

function generateICSString(Courses, semStartDate, semEndDate) {
    console.log("here");
    let calender;

    const versionProperty = new Property({ name: "VERSION", value: "2.0" });
    const prodIdProperty = new Property({
        name: "PRODID",
        value: "mfaseehuddin@pro-mirage",
    });

    calender = new Component({ name: "VCALENDAR" });
    calender.pushProperty(versionProperty);
    calender.pushProperty(prodIdProperty);

    if(Courses.length == 0) {
        return "No courses selected";
    }

    Courses.forEach((course) => {
        let event = new Component({ name: "VEVENT" });
        const courseDetails = parseDayAndTimeToData(
            course.Day_and_Time,
            semStartDate,
            semEndDate
        );
        const summaryProperty = new Property({
            name: "SUMMARY",
            value: course.Course_Code + " | " + course.Course_Title,
        });
        const description = new Property({
            name: "DESCRIPTION",
            value: "Instructor: " + course.Instructor,
        });
        const dtstampProperty = new Property({
            name: "DTSTAMP",
            value: new Date(),
        });
        const dtstartProperty = new Property({
            name: "DTSTART",
            value: courseDetails.start,
        });
        const dtendProperty = new Property({
            name: "DTEND",
            value: courseDetails.end,
        });
        const rruleProperty = new Property({
            name: "RRULE",
            value: generateRRULE(course.Day_and_Time.split(" ")[0], semEndDate),
        });

        event = event.pushProperty(summaryProperty);
        event = event.pushProperty(description);
        event = event.pushProperty(dtstampProperty);
        event = event.pushProperty(dtstartProperty);
        event = event.pushProperty(dtendProperty);
        event = event.pushProperty(rruleProperty);

        calender = calender.pushComponent(event);
    });

    console.log("outta here");
    return calender.toString();
}

function generateICSFile(Courses, semStartDate, semEndDate) {
    const icsString = generateICSString(Courses, semStartDate, semEndDate);
    if(icsString == "No courses selected") {
        alert("No courses selected");
        return;
    }
    const blob = new Blob([icsString], { type: "text/calendar" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "LUMS Fall 22 Schedule.ics";
    link.click();
}



export default function CalGen({ SelectorState, Courses }) {
    /**
     * TODO:
     * input sem start date: ✅
     * iterate through the courses and generate the ICS string: ✅
     * Add a button to generate the ICS file
     * put the string into a file and make it downloadable
     */
    //pretty print the string
    const semStartDate = new Date(2022, 8, 5);
    const semEndDate = new Date(2022, 11, 24);

    return (
        <div className="addToCalender" onClick={()=>{
            generateICSFile(Courses, semStartDate, semEndDate);
        }}>
            <p>Add To Calender</p>
        </div>
    );
}

import * as React from "react";
import { useCourseQuery } from "../hooks/useCourseQuery";
import { useState } from "react";
import Courses from "../components/Courses/Courses";
import addNew from "../components/Courses/Images/addNew.png";
import Calender from "../components/Calender/Calender";
import CalGen from "../components/CalGen/CalGen";

import linkedin from "./linkedin.png";
import mirage from "./projectMirage.png";
import instagram from "./instagram.png";

import "./index.sass";

const IndexPage = () => {
    const data = useCourseQuery();
    const [credits, setCredits] = useState(0);
    //Course data
    const [courseCode, setCourseCode] = useState();
    const [selectedCourses, setSelectedCourses] = useState([]);
    const addCourse = (courseID, chr) => {
        if (
            selectedCourses.filter((course) => course.id === courseID)
                .length === 0
        ) {
            setSelectedCourses(
                selectedCourses.concat(
                    data.nodes.filter((course) => course.id === courseID)
                )
            );
            setCredits(credits + parseInt(chr));
            // console.log(courseID)
        }
    };

    const removeCourse = (courseID) => {
        setSelectedCourses(
            selectedCourses.filter((course) => course.id !== courseID)
        );
        setFinalCourses(
            finalCourses.filter((course) => !course.id.match(courseID))
        );
        setCredits(
            credits -
                parseInt(
                    finalCourses.filter((course) =>
                        course.id.match(courseID)
                    )[0].Cr_Hrs
                )
        );
    };

    const [finalCourses, setFinalCourses] = useState([]);
    const addFinalCourse = (courseCopyFinal) => {
        if (
            finalCourses.filter((course) => course.id === courseCopyFinal.id)
                .length === 0
        ) {
            setFinalCourses(finalCourses.concat(courseCopyFinal));
        }
    };
    //Course Panel
    const [courseSelector, setCourseSelector] = useState(false);
    const toggleCourseSelector = () => {
        setCourseSelector(!courseSelector);
    };

    //parsing functions
    const parseDay = (inputDayTime) => {
        var dayAndTime = inputDayTime.split(" ");
        var days = dayAndTime[0].split("");
        for (let i = 0; i < days.length; i++) {
            if (days[i] === "M") {
                days[i] = "Monday";
            } else if (days[i] === "T") {
                days[i] = "Tuesday";
            } else if (days[i] === "W") {
                days[i] = "Wednesday";
            } else if (days[i] === "R") {
                days[i] = "Thursday";
            } else if (days[i] === "F") {
                days[i] = "Friday";
            } else if (days[i] === "S") {
                days[i] = "Saturday";
            } else if (days[i] === "U") {
                days[i] = "Sunday";
            }
        }
        return days;
    };

    const parseTimeLength = (dayAndTime) => {
        // console.log(dayAndTime)
        var timeString = dayAndTime.split(" ")[1].split("-");
        // console.log(timeString)

        var timeStart = timeString[0];
        var timeEnd = timeString[1];

        // console.log(timeStart)
        // console.log(timeEnd)

        var minutesDiff = 0;

        if (timeStart.slice(0, 2) === "12" && timeEnd.slice(-2) === "PM") {
            var minutesStart =
                parseInt(timeStart.split(":")[0]) * 60 +
                parseInt(timeStart.split(":")[1].slice(0, 2));
            var minutesEnd =
                parseInt(timeEnd.split(":")[0]) * 60 +
                60 * 12 +
                parseInt(timeEnd.split(":")[1].slice(0, 2));
            minutesDiff = minutesEnd - minutesStart;
            console.log(minutesDiff + "5");
        } else if (
            timeEnd.slice(0, 2) === "12" &&
            timeStart.slice(-2) === "AM"
        ) {
            var minutesEnd =
                parseInt(timeEnd.split(":")[0]) * 60 +
                parseInt(timeEnd.split(":")[1].slice(0, 2));
            var minutesStart =
                parseInt(timeStart.split(":")[0]) * 60 +
                parseInt(timeStart.split(":")[1].slice(0, 2));
            minutesDiff = minutesEnd - minutesStart;
            console.log(minutesDiff + "2");
        } else if (timeEnd.slice(-2) === "PM" && timeStart.slice(-2) === "AM") {
            var minutesEnd =
                parseInt(timeEnd.split(":")[0]) * 60 +
                60 * 12 +
                parseInt(timeEnd.split(":")[1].slice(0, 2));
            var minutesStart =
                parseInt(timeStart.split(":")[0]) * 60 +
                parseInt(timeStart.split(":")[1].slice(0, 2));
            minutesDiff = minutesEnd - minutesStart;
            console.log(minutesDiff + "3");
        } else if (
            (timeEnd.slice(-2) === "AM" && timeStart.slice(-2) === "AM") ||
            (timeEnd.slice(-2) === "PM" && timeStart.slice(-2) === "PM")
        ) {
            // console.log(parseInt(timeEnd.split(":")[0])*60 + parseInt(timeEnd.slice(2)))
            var minutesEnd =
                parseInt(timeEnd.split(":")[0]) * 60 +
                parseInt(timeEnd.split(":")[1].slice(0, 2));
            console.log(minutesEnd);
            var minutesStart =
                parseInt(timeStart.split(":")[0]) * 60 +
                parseInt(timeStart.split(":")[1].slice(0, 2));
            console.log(minutesStart);
            minutesDiff = minutesEnd - minutesStart;
            console.log(minutesDiff + "A");
        }

        return minutesDiff;
    };

    const parseTimeMargin = (timeStart) => {
        // console.log(timeString)

        var timeInital = 420;

        // console.log(timeStart)
        // console.log(timeEnd)

        var minutesDiff = 0;

        if (timeStart.slice(-2) === "AM") {
            var minutesStart =
                parseInt(timeStart.split(":")[0]) * 60 +
                parseInt(timeStart.split(":")[1].slice(0, 2));
            // console.log(minutesStart)
            minutesDiff = minutesStart - timeInital;
            // console.log(minutesDiff)
        } else if (timeStart.slice(0, 2) === "12") {
            var minutesStart =
                parseInt(timeStart.split(":")[0]) * 60 +
                parseInt(timeStart.split(":")[1].slice(0, 2));
            minutesDiff = minutesStart - timeInital;
            // console.log(minutesDiff)
        } else if (timeStart.slice(-2) === "PM") {
            var minutesStart =
                parseInt(timeStart.split(":")[0]) * 60 +
                60 * 12 +
                parseInt(timeStart.split(":")[1].slice(0, 2));
            minutesDiff = minutesStart - timeInital;
            // console.log(minutesDiff)
        }

        return minutesDiff;
    };

    return (
        <main className="Main">
            <div className="Heading">
                <h1>LUMS Course Scheduler | Project Mirage</h1>
                
                <h5>Updated Fall 2022</h5>
            </div>
            
            <div className="calenderContainer">
                <div className="calender">
                    <Calender
                        SelectedCourses={selectedCourses}
                        parseDay={parseDay}
                        finalCourses={finalCourses}
                        onAdd={addFinalCourse}
                        parseTimeLength={parseTimeLength}
                        parseTimeMargin={parseTimeMargin}
                    />
                </div>
            </div>

            <div className="courses">
                <Courses
                    className="courseSelectorPanel"
                    onAdd={addCourse}
                    onRemove={removeCourse}
                    SelectedCourses={selectedCourses}
                    SelectorState={courseSelector}
                    toggle={toggleCourseSelector}
                    Credits={credits}
                />
            </div>

            <div
                className="Toggler"
                onClick={(e) => {
                    toggleCourseSelector();
                }}
                style={
                    courseSelector
                        ? { transform: "rotate(45deg)" }
                        : { transform: "rotate(0)" }
                }
            >
                <img src={addNew} />
            </div>

            <div className="credits">
                <p>mfaseehuddin | made with ♥ by Project Mirage 2021</p>
                <div>
                    <a href="https://instagram.com/mfaseehuddin">
                        <img src={instagram} />
                    </a>
                    <a href="https://pro-mirage.com">
                        <img src={mirage} />
                    </a>
                    <a href="https://www.linkedin.com/in/mfaseehuddin2001/">
                        <img src={linkedin} />
                    </a>
                </div>
            </div>
            <CalGen Courses={selectedCourses} />
        </main>
    );
};

export default IndexPage;

import React, { useState } from 'react'
import Courses from '../Courses/Courses';
import "./Calender.sass"



export default function Calender({SelectedCourses, finalCourses, onAdd, parseDay, parseTimeLength, parseTimeMargin}) {
    const [timeSlots, setTimeSlots] = useState([7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]);
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    const calenderHeight = 700;

    return (
        <div className="Calender">
            <div className="InnerContainer">
                <div className="Time">
                    {timeSlots.map(timeSlot => {
                        
                        const timeID = timeSlot > 12 ? "PM"+(timeSlot-12) : "AM"+timeSlot
                        const printTime = timeSlot > 12 ? (timeSlot-12)+":00 PM" : timeSlot + ":00 AM"

                        return <div key = {timeID}>
                            <p>{printTime}</p>
                        </div>
                            
                    })}       
                </div>
                <div className="days">
                    {days.map(day => (<div key = {day} style={{height:"100%", width:"calc(1100px/8)"}}>
                        <p className = "dayName">{day}</p>
                        <div className="Time">
                            {timeSlots.map(timeSlot => {
                              const timeID = timeSlot > 12 ? "PM"+(timeSlot-12) : "AM"+timeSlot
                              return <div key = {timeID}>
                                  
                              </div>  
                            })}
                        </div>
                    </div>))}
                    <div className="Classes">
                        {SelectedCourses.map(course => {
                            const height = (parseInt(parseTimeLength(course.Day_and_Time))/(14*60))*calenderHeight
                            const width = 1100/8;
                            const classDays = parseDay(course.Day_and_Time)
                            const marginLeft = 0;
                            const timePrep = course.Day_and_Time.split(" ")[1].split("-")[0]
                            const timeStart = parseInt(parseTimeMargin(timePrep))
                            const marginTop = (timeStart/(14*60))*calenderHeight
                            
                            for (let day = 0; day < classDays.length; day++) {
                                
                                const courseCopyFinal = {...course}
                                courseCopyFinal.id = courseCopyFinal.id + ":" + classDays[day]
                                courseCopyFinal.marginTop = marginTop
                                courseCopyFinal.height = height
                                courseCopyFinal.width = width
                                courseCopyFinal.marginLeft = days.findIndex(currentDay => currentDay === classDays[day]) * (1100/8)
                                
                                onAdd(courseCopyFinal)

                            }
                            console.log(finalCourses)
                        })}


                        {finalCourses.map(course => {

                            return(<div className="Class" key={course.id} style={{height:course.height, width: course.width, position:"absolute", marginLeft: course.marginLeft, marginTop: course.marginTop, backgroundColor:"#FF9090"}}>
                                {course.Course_Code}
                            </div>)
                        })}
                    </div>
                </div> 
            </div>
        </div>
    )
}

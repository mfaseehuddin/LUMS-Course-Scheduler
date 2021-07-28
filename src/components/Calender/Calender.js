import React, { useState } from 'react'
import Courses from '../Courses/Courses';
import "./Calender.sass"



export default function Calender({SelectedCourses, finalCourses, onAdd, parseDay, parseTimeLength, parseTimeMargin}) {
    const [timeSlots, setTimeSlots] = useState([7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]);
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    const calenderHeight = 700;
    const coolColors = ["#90AFFF", "#FF9090", "#84D160", "#D1C660", "#FFCC90", "#4FC098","#4F6FC0","#C04FB5","#C04F4F","#B04FC0","#63DBDB", "#74BE91"]
    
    // const [lastID, setLastID] = useState(0);
    var lastID = 0;
    var colorID = 0
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
                            
                            
                            var currentID = course.id.split(":")[0]
                            if (currentID !== lastID && colorID < coolColors.length){
                                colorID += 1
                                lastID = currentID
                                console.log("Change")
                            }else if(colorID === coolColors.length-1){
                                colorID = 0
                            }
                            return(<div className="Class" key={course.id} style={{height:course.height, width: course.width, position:"absolute", marginLeft: course.marginLeft, marginTop: course.marginTop, backgroundColor:coolColors[colorID]}}>
                                <div className="ClassInner">
                                <h5>{course.Course_Code}</h5>
                                <p>{course.Instructor_s_}</p>
                                <p>{course.Day_and_Time.split(" ")[1]}</p>
                                </div>
                            </div>)
                        })}
                    </div>
                </div> 
            </div>
        </div>
    )
}

import * as React from "react"
import {useCourseQuery} from "../hooks/useCourseQuery" 
import { useState } from "react"
import Courses from "../components/Courses/Courses"
import addNew from "../components/Courses/Images/addNew.png"
import Calender from "../components/Calender/Calender"
import "./index.sass"


const IndexPage = () => {
  const data = useCourseQuery()
  
  //Course data
  const [courseCode, setCourseCode] = useState()
  const [selectedCourses, setSelectedCourses] = useState([])
  const addCourse = (courseID) => {
    if (selectedCourses.filter(course => course.id === courseID).length === 0){
      setSelectedCourses(selectedCourses.concat(data.nodes.filter(course => course.id === courseID)))
      // console.log(courseID)
    }
  }
  
  const removeCourse = (courseID) => {
    setSelectedCourses(selectedCourses.filter(course => course.id !== courseID))
    setFinalCourses(finalCourses.filter(course => !course.id.match(courseID)))
  }
  
  const [finalCourses, setFinalCourses] = useState([])
  const addFinalCourse = (courseCopyFinal) => {
    if(finalCourses.filter(course => course.id === courseCopyFinal.id).length === 0){
      setFinalCourses(finalCourses.concat(courseCopyFinal))
  }

  }
  const removeFinalCourse = () => {}

  //Course Panel
  const [courseSelector, setCourseSelector] = useState(false)
  const toggleCourseSelector = () => {
    setCourseSelector(!courseSelector)
  } 

  //parsing functions
  const parseDay = (inputDayTime) => {
    var dayAndTime = inputDayTime.split(" ")
    var days = dayAndTime[0].split("")
    for(let i = 0; i < days.length; i++){
        if (days[i] === "M"){
            days[i] = "Monday"
        } else if (days[i] === "T"){
            days[i] = "Tuesday"
        } else if (days[i] === "W"){
            days[i] = "Wednesday"
        } else if (days[i] === "R"){
            days[i] = "Thursday"
        } else if (days[i] === "F"){
            days[i] = "Friday"
        }
    }
    return days
  }

  const parseTimeLength = (dayAndTime) => {
    // console.log(dayAndTime)
    var timeString = dayAndTime.split(" ")[1].split("-")
    // console.log(timeString)
    
    var timeStart = timeString[0]
    var timeEnd = timeString[1]

    // console.log(timeStart)
    // console.log(timeEnd)

    var minutesDiff = 0

    if((timeStart.slice(0, 2) === "12" && timeEnd.slice(-2) === "PM")){ 
      var minutesStart = ( parseInt(timeStart.split(":")[0])*60 + parseInt(timeStart.split(":")[1].slice(0,2)))
      var minutesEnd = ( parseInt(timeEnd.split(":")[0])*60 + (60*12) + parseInt(timeEnd.split(":")[1].slice(0,2)))
      minutesDiff = (minutesEnd-minutesStart)
      // console.log(minutesDiff + "25")      
    } else if((timeEnd.slice(0, 2) === "12" && timeStart.slice(-2) === "AM")){
      var minutesEnd = ( parseInt(timeEnd.split(":")[0])*60 + parseInt(timeEnd.split(":")[1].slice(0,2)))
      var minutesStart = ( parseInt(timeStart.split(":")[0])*60 + parseInt(timeStart.split(":")[1].slice(0,2)))
      minutesDiff = (minutesEnd-minutesStart)
      // console.log(minutesDiff + "2")      
    } else if((timeEnd.slice(-2) === "PM"  && timeStart.slice(-2) === "AM")){
      var minutesEnd = ( parseInt(timeEnd.split(":")[0])*60 + 60*12 + parseInt(timeEnd.split(":")[1].slice(0,2)))
      var minutesStart = ( parseInt(timeStart.split(":")[0])*60 + parseInt(timeStart.split(":")[1].slice(0,2)))
      minutesDiff = (minutesEnd-minutesStart)
      //  console.log(minutesDiff + "3")
    } else if ((timeEnd.slice(-2) === "AM" && timeStart.slice(-2) === "AM")||(timeEnd.slice(-2) === "PM" && timeStart.slice(-2) === "PM")){
      // console.log(parseInt(timeEnd.split(":")[0])*60 + parseInt(timeEnd.slice(2)))
      var minutesEnd = parseInt(timeEnd.split(":")[0])*60 + parseInt(timeEnd.slice(2))
      // console.log(minutesEnd)
      var minutesStart = parseInt(timeStart.split(":")[0])*60 + parseInt(timeStart.slice(2))
      // console.log(minutesStart)
      minutesDiff = (minutesEnd-minutesStart)
      // console.log(minutesDiff + "1")      
    }

    return minutesDiff
  }

  const parseTimeMargin = (timeStart) => {
    
    // console.log(timeString)
    
    var timeInital = 420

    // console.log(timeStart)
    // console.log(timeEnd)

    var minutesDiff = 0

    if ((timeStart.slice(-2) === "AM")){
      var minutesStart = parseInt(timeStart.split(":")[0])*60 + parseInt(timeStart.split(":")[1].slice(0,2))
      // console.log(minutesStart)
      minutesDiff = (minutesStart-timeInital)
      // console.log(minutesDiff)      
    } else if((timeStart.slice(0, 2) === "12")){
      var minutesStart = ( parseInt(timeStart.split(":")[0])*60 + parseInt(timeStart.split(":")[1].slice(0,2)))
      minutesDiff = (minutesStart-timeInital)
      // console.log(minutesDiff)      
    } else if((timeStart.slice(-2) === "PM")){
      var minutesStart = ( parseInt(timeStart.split(":")[0])*60 + (60*12) + parseInt(timeStart.split(":")[1].slice(0,2)))
      minutesDiff = (minutesStart-timeInital)
      // console.log(minutesDiff)
    }

    return minutesDiff
  }











  return (
    <main className="Main">
      <div className="Heading">
        <h1>the most simple course scheduler</h1>
        <h5>just add courses and check if they play nice together :)</h5>
      </div>
      
      <Calender SelectedCourses = {selectedCourses}
                parseDay = {parseDay}
                finalCourses = {finalCourses}
                onAdd = {addFinalCourse}
                parseTimeLength = {parseTimeLength} 
                parseTimeMargin = {parseTimeMargin}
                />




      <div className="courses">
        <Courses className = "courseSelectorPanel" 
               onAdd = {addCourse}  
               onRemove = {removeCourse} 
               SelectedCourses = {selectedCourses} 
               SelectorState = {courseSelector} 
               toggle = {toggleCourseSelector}/>
      </div>
      <div className="Toggler" onClick={e => {toggleCourseSelector()}}>
            <img src={addNew}/>
        </div>
      
    </main>
  )
}

export default IndexPage

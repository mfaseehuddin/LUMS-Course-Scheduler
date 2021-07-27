import * as React from "react"
import {useCourseQuery} from "../hooks/useCourseQuery" 
import { useState } from "react"
import Courses from "../components/Courses/Courses"
import "./index.sass"


const IndexPage = () => {
  const data = useCourseQuery()
  
  //Course data
  const [courseCode, setCourseCode] = useState()
  const [selectedCourses, setSelectedCourses] = useState([])
  const addCourse = (courseID) => {
    if (selectedCourses.filter(course => course.id === courseID).length === 0){
      setSelectedCourses(selectedCourses.concat(data.nodes.filter(course => course.id === courseID)))
      console.log(courseID)
    }
  }
  
  const removeCourse = (courseID) => {
    setSelectedCourses(selectedCourses.filter(course => course.id !== courseID))
  }
  
  
  //Course Panel
  const [courseSelector, setCourseSelector] = useState(false)
  const toggleCourseSelector = () => {
    setCourseSelector(!courseSelector)
  } 

  return (
    <main className="Main">
      <Courses className = "courseSelectorPanel" 
               onAdd = {addCourse}  
               onRemove = {removeCourse} 
               SelectedCourses = {selectedCourses} 
               SelectorState = {courseSelector} 
               toggle = {toggleCourseSelector}/>
    </main>
  )
}

export default IndexPage

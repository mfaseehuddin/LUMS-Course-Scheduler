import * as React from "react"
import {useCourseQuery} from "../hooks/useCourseQuery" 
import { useState } from "react"
import { black } from "chalk"
// markup




const IndexPage = () => {



  
  const data = useCourseQuery()
  const [courseCode, setCourseCode] = useState()
  const [selectedCourses, setSelectedCourses] = useState([])
  return (
    <main>
      <div className="CourseSearching">
        <h1>All Fall 2021 Courses</h1>
        <input onChange={ e => setCourseCode(e.target.value.toUpperCase())}/>
        <ul style={{
          background:"black",
          padding:0,
          overflowY:"scroll",
          height:"50vh"
        }}>
          
          {data.nodes.filter(course => course.Course_Code.match(courseCode)).filter(course => !course.Course_Code.match("w/")).filter(course => course.Course_Code !== "").map(course => (
            <li key = {course.id} 
            style={{
              padding:"0.2em",
              margin:"0.2em",
              backgroundColor:"#FF9090",
              display:"flex",
              justifyContent:"space-between",
              alignItems:"center"
            }}
            
            


            // onClick = {e => {
            //   setSelectedCourses(selectedCourses.concat((data.nodes.filter(course => course.id === e.currentTarget.getElementsByClassName("courseID")[0].innerHTML))))
            //   console.log(selectedCourses)
            // }}
            >
              
              <div>
                <p className="courseID" style={{display:"none"}}>{course.id}</p>{course.Course_Code} | {course.Course_Title}<br/> {course.Day_and_Time} <br/> {course.Instructor_s_}
              </div>
              
                <h2 className={course.id} onClick = {e => setSelectedCourses(selectedCourses.concat(data.nodes.filter(course => course.id === e.target.className)))}>+</h2>
              
            </li>
          ))}
        </ul>
      </div>





      <div className="SelectedCourses">
      <ul style={{
          background:"black",
          padding:0,
          overflowY:"scroll",
          height:"50vh"
        }}>
          
          {selectedCourses.map(course => (
            <li key={course.id}
            style={{
              padding:"0.2em",
              margin:"0.2em",
              backgroundColor:"#FF90F0",
              display:"flex",
              justifyContent:"space-between",
              alignItems:"center"
            }}>
              <div>
                <p className="courseID" style={{display:"none"}}>{course.id}</p>{course.Course_Code} | {course.Course_Title}<br/> {course.Day_and_Time} <br/> {course.Instructor_s_}
              </div>
              
                <h2 className={course.id} onClick = {e => setSelectedCourses(selectedCourses.filter(course => course.id !== e.target.className))}>-</h2>
              
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}

export default IndexPage

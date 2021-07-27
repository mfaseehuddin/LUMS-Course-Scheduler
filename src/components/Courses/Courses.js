import React, { useState } from 'react'
import { useCourseQuery } from '../../hooks/useCourseQuery'
import tick from "./Images/Tick.png"
import Delete from "./Images/Delete.png"
import Search from "./Images/Search.png"

import "./CoursesStyle.sass"


export default function Courses({onAdd, onRemove, Courses, SelectedCourses, SelectorState, toggle}) {
    const courseData = useCourseQuery();
    const [searchCourse, setSearchCourse] = useState();

    
    return (
        <>
        <div className="CourseComponent" style={!SelectorState ? {right:"-1000px"}: {right:0}}>
            <div className = "SearchBox">
                <input placeholder="Course Code" onChange={e => {setSearchCourse(e.target.value.toUpperCase())}}/>
                <img className="SearchIcon" src={Search}/>    
            </div>
            
            <div className = "CourseSearching">
                <h3>Available Courses:</h3>
                <ul>
                    {courseData.nodes.filter(course => course.Course_Code.match(searchCourse)).filter(course => !course.Course_Code.match("w/")).filter(course => course.Course_Code !== "").map(course => (
                        <li key = {course.id}>
                            <div>
                                <h2>{course.Course_Code} | {course.Course_Title}</h2>
                                <p>{course.Day_and_Time}</p>
                                <p>{course.Instructor_s_}</p>
                                <p>{course.Instructions_Mode}</p>
                            </div>
                            <div>
                                <img src={tick} className={course.id} onClick={e => onAdd(e.target.className)} />
                                
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className = "SelectedCourses">
            <h3>Selected Courses:</h3>
                <ul>
                    {SelectedCourses.map(course => (
                        <li key = {course.id}>
                            <div>
                                <h2>{course.Course_Code} | {course.Course_Title}</h2>
                                <p>{course.Day_and_Time}</p>
                                <p>{course.Instructor_s_}</p>
                            </div>
                            <div>
                            <img src={Delete} className={course.id} onClick={e => onRemove(e.target.className)} />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        </>
    )
}

import { graphql, useStaticQuery } from "gatsby"

export const useCourseQuery = () => {
    const {allF2021Csv} = useStaticQuery(
        graphql`
            query allCourses {
                allF2021Csv {
                    nodes {
                        id
                        Course_Code
                        Course_Title
                        Instructor_s_
                        Cr_Hrs
                        Day_and_Time
                        Instructions_Mode
                    }
                }
            }
        `
    )
    return allF2021Csv
}
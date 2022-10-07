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
                        Instructor
                        Cr_Hrs
                        Day_and_Time
                    }
                }
            }
        `
    )
    return allF2021Csv
}
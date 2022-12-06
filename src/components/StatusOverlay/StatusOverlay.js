import React from "react";

export default function StatusOverlay({ credits, courses }) {
    return (
        <div
            style={{
                position: "absolute",
                zIndex: 100,
                bottom: "10px",
                right: "10px",
                height: "100px",
                width: "150px",
                backgroundColor: "white",
                borderRadius: "20px",
                opacity: 0.9,
                backdropFilter: "blur(100px)",
                padding: "10px 20px",
            }}
        >
            <div
                style={{
                    //set font to semi-bold
                    fontWeight: "600",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <p style={{ margin: "5px" }}>
                    Courses:{" "}
                    {
                        //filter only the courses that have LEC in course_code, and get len
                        courses.filter((course) =>
                            course.Course_Code.includes("LEC")
                        ).length
                    }
                </p>
                <p style={{ margin: "5px" }}>
                    Labs:{" "}
                    {
                        //filter only the courses that have LAB in course_code, and get len
                        courses.filter((course) =>
                            course.Course_Code.includes("LAB")
                        ).length
                    }
                </p>
                <p style={{ margin: "5px" }}>Credit Hours: {credits}</p>
            </div>
        </div>
    );
}

import React, { useEffect, useState } from "react";
import CourseTable from "./Tables/CourseTable";
import { Container } from "@mui/material";
import PageTitleWrapper from "../PageTitleWrapper";
import PageHeader from "../PageHeader";
import { useSnackbar } from "notistack";
import { useAuth } from "../Redux/AuthContext";


const Courses = () => {
  const [coursesData, setCoursesData] = useState([]);
  const [refreshData, setRefreshData] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { state } = useAuth();

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await fetch(
          "http://localhost:9191/api/course/getAllCourse",
          {
            headers: {
              "Content-Type": "application/json",
              "x-api-key": state.user.apiKey,
            },
          }
        );
        const data = await response.json();
        if (data.status === "OK") {
          setCoursesData(data.courses);
          enqueueSnackbar(`Found ${data.courses.length} courses`, {
            autoHideDuration: 3000,
            variant: "success",
            preventDuplicate: true,
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "right",
            },
          });
        } else {
          console.error("Failed to fetch course data");
        }
      } catch (error) {
        console.log(error);
        console.error("Error fetching course data:", error);
      }
    };

    fetchCourseData();
  }, [enqueueSnackbar, refreshData, state.user.apiKey]);

  const handleRefreshData = () => {
    setRefreshData((prev) => !prev);
  };

  return (
    <div>
      <PageTitleWrapper>
        <PageHeader
          pagename={"Course Details"}
          description={
            "Empower administrative prowess: Edit, delete, and oversee seamlessly for optimal course management. Elevate your institution's efficiency with comprehensive control."
          }
        />
      </PageTitleWrapper>
      <Container maxWidth="">
        <CourseTable
          courseData={coursesData}
          onRefreshData={handleRefreshData}
        />
      </Container>
    </div>
  );
};

export default Courses;

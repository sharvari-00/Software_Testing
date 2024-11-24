import * as React from "react";
import {
  TextField,
  Box,
  Button,
  FormControl,
  ListItemText,
  Checkbox,
  OutlinedInput,
  InputLabel,
  MenuItem,
  Select,
  Radio,
  Stack,
  CircularProgress,
} from "@mui/material";
import SaveAsTwoToneIcon from "@mui/icons-material/SaveAsTwoTone";
import { useSnackbar } from "notistack";
import { useAuth } from "../../Redux/AuthContext";
import Label from "../../Label";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function UpdateCourse({ courseData }) {
  const { enqueueSnackbar } = useSnackbar();
  const { state } = useAuth();
  const [isLoading, setLoading] = React.useState(false);
  const [tempCourseData, setTempCourseData] = React.useState(courseData);
  const [coursesData, setCoursesData] = React.useState([]);
  const [facultyData, setFacultyData] = React.useState([]);
  const [courseName, setCourseName] = React.useState(tempCourseData.name);
  const [facultyId, setFacultyId] = React.useState(
    tempCourseData.faculty.employeeId
  );
  const [courseCode, setcourseCode] = React.useState(tempCourseData.courseCode);
  const [coursedescription, setCoursedescription] = React.useState(
    tempCourseData.description
  );
  const [courseyear, setCourseyear] = React.useState(tempCourseData.year);
  const [courseterm, setCourseterm] = React.useState(tempCourseData.term);
  const [coursecredits, setCoursecredits] = React.useState(
    tempCourseData.credits
  );
  const [coursecapacity, setCoursecapacity] = React.useState(
    tempCourseData.capacity
  );
  const [selectedFaculty, setSelectedFaculty] = React.useState(
    tempCourseData.faculty ? [tempCourseData.faculty.email] : []
  );
  const [prerequisite, setPrerequisite] = React.useState(
    tempCourseData.prerequisites.map((prerequisite) => prerequisite.courseCode)
  );
  const [prerequisiteIds, setPrerequisiteIds] = React.useState(
    tempCourseData.prerequisites.map((prerequisite) => ({
      id: prerequisite.id,
    }))
  );

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedFaculty(typeof value === "string" ? value.split(",") : value);
  };

  const handleChange2 = (event) => {
    const {
      target: { value },
    } = event;
    setPrerequisite(typeof value === "string" ? value.split(",") : value);
  };

  React.useEffect(() => {
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
          setCoursesData((prevCoursesData) =>
            prevCoursesData.filter((course) => course.id !== tempCourseData.id)
          );
        } else {
          console.error("Failed to fetch course data");
        }
      } catch (error) {
        console.log(error);
        console.error("Error fetching course data:", error);
      }
    };

    fetchCourseData();
  }, [state.user.apiKey, tempCourseData.id]);

  React.useEffect(() => {
    const fetchFacultyData = async () => {
      try {
        const response = await fetch(
          "http://localhost:9191/api/employee/getAllFaculty",
          {
            headers: {
              "Content-Type": "application/json",
              "x-api-key": state.user.apiKey,
            },
          }
        );
        const data = await response.json();
        if (data.status === "OK") {
          setFacultyData(data.employees);
        } else {
          console.error("Failed to fetch faculty data");
        }
      } catch (error) {
        console.log(error);
        console.error("Error fetching faculty data:", error);
      }
    };

    fetchFacultyData();
  }, [state.user.apiKey]);

  const handleToggleCheckboxCourse = (value) => {
    let newChecked = [...prerequisiteIds];
    const currentIndex = newChecked.findIndex((item) => item.id === value);
    if (currentIndex === -1) {
      newChecked.push({ id: value });
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setPrerequisiteIds(newChecked);
  };

  const handlefacultyChange = (value) => {
    setFacultyId(value);
  };

  const handleUpdate = async () => {
    setLoading(true);
    if (coursecredits < 0) {
      enqueueSnackbar("Course credit cannot be in negative", {
        autoHideDuration: 3000,
        variant: "error",
        preventDuplicate: true,
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
      });
      setCoursecredits(1)
      setLoading(false);
      return;
    }
    if (courseyear < 1900) {
      enqueueSnackbar("Course year cannot be in negative", {
        autoHideDuration: 3000,
        variant: "error",
        preventDuplicate: true,
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
      });
      setCourseyear(new Date().getFullYear())
      setLoading(false);
      return;
    }
    if (coursecapacity < 0) {
      enqueueSnackbar("Course capacity cannot be in negative", {
        autoHideDuration: 3000,
        variant: "error",
        preventDuplicate: true,
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
      });
      setCoursecapacity(1)
      setLoading(false);
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:9191/api/course/updateCourse/${tempCourseData.id}`,
        {
          method: "PUT",
          body: JSON.stringify({
            courseCode: courseCode,
            name: courseName,
            description: coursedescription,
            year: courseyear,
            term: courseterm,
            credits: coursecredits,
            capacity: coursecapacity,
            faculty: {
              employeeId: facultyId,
            },
            prerequisites: prerequisiteIds,
          }),
          headers: {
            "Content-Type": "application/json",
            "x-api-key": state.user.apiKey,
          },
        }
      );
      const data = await response.json();
      if (data.status === "OK") {
        setTempCourseData(data.updated);
        enqueueSnackbar(data.message, {
          autoHideDuration: 3000,
          variant: "success",
          preventDuplicate: true,
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
        setLoading(false);
        return;
      } else {
        console.error("Failed to fetch course data");
        enqueueSnackbar(data.message, {
          autoHideDuration: 3000,
          variant: "error",
          preventDuplicate: true,
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching course data:", error);
      setLoading(false);
    }
  };

  return (
    <Box
      maxWidth="lg"
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1 },
      }}
      noValidate
      autoComplete="off"
    >
      <Stack direction={{ xs: "column", sm: "row" }}>
        <TextField
          fullWidth
          error={courseName.length ? false : true}
          id="outlined-error-helper-text"
          label="Course Name"
          onChange={(e) => setCourseName(e.target.value)}
          defaultValue={courseName}
          value={courseName}
          helperText={courseName.length ? "" : "Can't be empty"}
        />
        <TextField
          fullWidth
          id="outlined-error-helper-text"
          label="Course Code"
          error={courseCode.length ? false : true}
          onChange={(e) => setcourseCode(e.target.value)}
          defaultValue={courseCode}
          Value={courseCode}
          helperText={courseCode.length ? "" : "Can't be empty"}
        />
        <TextField
          fullWidth
          id="outlined-error-helper-text"
          label="Year"
          type="number"
          InputProps={{
            inputProps: { min: 1900, max: 3000 },
          }}
          error={
            courseyear === "" ||
            isNaN(courseyear) ||
            courseyear < 1900 ||
            courseyear > 3000
          }
          onChange={(e) => setCourseyear(e.target.value)}
          defaultValue={courseyear}
          value={courseyear}
          helperText={
            courseyear === ""
              ? "Can't be empty"
              : isNaN(courseyear)
              ? "Must be a number"
              : courseyear < 1900 || courseyear > 3000
              ? "Range 1900 to 3000"
              : ""
          }
        />
      </Stack>
      <Stack direction={{ xs: "column", sm: "row" }}>
        <TextField
          fullWidth
          id="outlined-error-helper-text"
          label="Term"
          error={courseterm.length ? false : true}
          onChange={(e) => setCourseterm(e.target.value)}
          defaultValue={courseterm}
          Value={courseterm}
          helperText={courseterm.length ? "" : "Can't be empty"}
        />
        <TextField
          fullWidth
          id="outlined-error-helper-text"
          label="Credits"
          type="number"
          InputProps={{
            inputProps: { min: 1, max: 100 },
          }}
          error={
            coursecredits === "" ||
            isNaN(coursecredits) ||
            coursecredits < 1 ||
            coursecredits > 100
          }
          onChange={(e) => setCoursecredits(e.target.value)}
          defaultValue={coursecredits}
          Value={coursecredits}
          helperText={
            coursecredits === ""
              ? "Can't be empty"
              : isNaN(coursecredits)
              ? "Must be a number"
              : coursecredits < 1 || coursecredits > 100
              ? "Range 1 to 100"
              : ""
          }
        />
        <TextField
          fullWidth
          id="Capacity"
          label="Capacity"
          InputProps={{
            inputProps: { min: 1, max: 1000 },
          }}
          type="number"
          error={
            coursecapacity === "" ||
            isNaN(coursecapacity) ||
            coursecapacity < 1 ||
            coursecapacity > 1000
          }
          onChange={(e) => setCoursecapacity(e.target.value)}
          defaultValue={coursecapacity}
          value={coursecapacity}
          helperText={
            coursecapacity === ""
              ? "Can't be empty"
              : isNaN(coursecapacity)
              ? "Must be a number"
              : coursecapacity < 1 || coursecapacity > 1000
              ? "Range 1 to 1000"
              : ""
          }
        />
      </Stack>
      <Stack direction="column">
        <TextField
          error={coursedescription.length ? false : true}
          id="outlined-error-helper-text"
          label="Description"
          onChange={(e) => setCoursedescription(e.target.value)}
          defaultValue={coursedescription}
          value={coursedescription}
          helperText={coursedescription.length ? "" : "Can't be empty"}
        />
        <FormControl sx={{ m: 1, width: "97%" }}>
          <InputLabel id="Facluty">Prerequisites</InputLabel>
          <Select
            labelId="Prerequisites-checkbox-label"
            id="Prerequisites-checkbox"
            multiple
            value={prerequisite}
            onChange={handleChange2}
            input={<OutlinedInput label="Prerequisites" />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
          >
            {coursesData.map((course) => (
              <MenuItem
                key={course.id}
                value={course.courseCode}
                onClick={() => handleToggleCheckboxCourse(course.id)}
              >
                <Checkbox checked={prerequisite.includes(course.courseCode)} />
                <ListItemText
                  primary={
                    <>
                      <Label color="error">Code: {course.courseCode}</Label>{" "}
                      <Label color="success">Name: {course.name}</Label>{" "}
                      <Label color="warning">Credit: {course.credits}</Label>
                    </>
                  }
                />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, width: "97%" }}>
          <InputLabel id="Facluty">Faculty</InputLabel>
          <Select
            labelId="faculty-checkbox-label"
            id="faculty-checkbox"
            value={selectedFaculty}
            onChange={handleChange}
            input={<OutlinedInput label="Facluty" />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
          >
            {facultyData.map((faculty) => (
              <MenuItem
                key={faculty.employeeId}
                value={`${faculty.email}`}
                onClick={() => handlefacultyChange(faculty.employeeId)}
              >
                <Radio checked={selectedFaculty.includes(`${faculty.email}`)} />
                <ListItemText primary={`${faculty.email}`} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
      <div>
        <FormControl sx={{ m: 1, width: "97%" }}>
          <Button
            fullWidth
            type="button"
            variant={"contained"}
            size="small"
            onClick={(e) => handleUpdate()}
            sx={{
              mb: 2,
              background:
                "linear-gradient(180deg, #00bcd4 0%, #1da1f2 100%) !important",
              color: "white",
              height: "54px",
            }}
          >
            {isLoading ? (
              <CircularProgress style={{ color: "#2196f3" }} />
            ) : (
              <SaveAsTwoToneIcon sx={{ mr: 1 }} />
            )}
            Update
          </Button>
        </FormControl>
      </div>
    </Box>
  );
}

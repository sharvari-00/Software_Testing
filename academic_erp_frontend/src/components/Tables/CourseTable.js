import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Divider,
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Modal,
  Button,
  Typography,
  CardHeader,
  TextField,
  Stack,
  Tooltip,
  IconButton,
  InputAdornment,
  Skeleton,
} from "@mui/material";
import BorderColorTwoToneIcon from "@mui/icons-material/BorderColorTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import SearchIcon from "@mui/icons-material/Search";
import InboxTwoToneIcon from "@mui/icons-material/InboxTwoTone";
import CloseIcon from "@mui/icons-material/Close";
import PrerequisitesTable from "./PrerequisitesTable";
import TableViewTwoToneIcon from "@mui/icons-material/TableViewTwoTone";
import Label from "../../Label";
import UpdateCourse from "./UpdateCourse";
import { useSnackbar } from "notistack";
import { useAuth } from "../../Redux/AuthContext";

const CourseTable = ({ courseData, onRefreshData }) => {
  const { state } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [coursesData, setCoursesData] = useState([]);
  const [coursesPrerequisitesData, setCoursesPrerequisitesData] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [loadingData, setLoadingData] = useState(true);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [openConfirmationFormEdit, setOpenConfirmationFormEdit] =
    useState(false);
  const [courseDataUpdate, setCourseDataUpdate] = useState({});

  const handleClose = () => {
    setOpenConfirmation(false);
    setCoursesPrerequisitesData([]);
  };

  const handleCloseEdit = () => {
    setOpenConfirmationFormEdit(false);
    setCourseDataUpdate({});
    onRefreshData();
  };

  const handleEdit = async (course) => {
    setOpenConfirmationFormEdit(true);
    setCourseDataUpdate(course);
  };

  useEffect(() => {
    if (courseData.length > 0) {
      setLoadingData(false);
      setCoursesData(courseData);
    } else {
      setLoadingData(false);
    }
  }, [courseData]);

  const handlePageChange = (_event, newPage) => {
    setPage(newPage);
  };

  const handleDelete = async (id) => {
    setLoadingData(true);
    try {
      const response = await fetch(
        `http://localhost:9191/api/course/deleteCourse/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": state.user.apiKey,
          },
        }
      );
      const data = await response.json();
      if (data.status === "OK") {
        setCoursesData(data.courses);
        setLoadingData(false);
        enqueueSnackbar(data.message, {
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
        enqueueSnackbar(data.message, {
          autoHideDuration: 3000,
          variant: "error",
          preventDuplicate: true,
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
      }
    } catch (error) {
      console.error("Error fetching course data:", error);
      setLoadingData(false);
    }
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
  };

  const filtereduserDatas = coursesData.filter((queryData) => {
    let matches = true;
    if (
      searchQuery &&
      !queryData.courseCode.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      matches = false;
    }
    return matches;
  });

  const paginateduserDatas = filtereduserDatas.slice(
    page * limit,
    page * limit + limit
  );

  return (
    <>
      <Card>
        <CardHeader
          sx={{
            "& > .MuiCardHeader-content": {
              flex: 0,
            },
            "& > .MuiCardHeader-action": {
              width: "100%",
            },
          }}
          action={
            <Stack
              direction="row"
              gap="1rem"
              justifyContent="space-between"
              flexWrap="wrap"
              alignItems="center"
              position="relative"
            >
              <TextField
                inputProps={{
                  style: {
                    padding: "0.25rem",
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon style={{ height: 16 }} />
                    </InputAdornment>
                  ),
                }}
                label="Search course"
                size="small"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Stack>
          }
        />
        <Divider />
        <TableContainer sx={{ height: "50vh" }}>
          <Table size="small" stickyHeader>
            <TableHead
              sx={{
                "& > tr > th": {
                  fontWeight: 600,
                  fontSize: 15,
                  textTransform: "none",
                  color: "#1da1f2 !important",
                },
              }}
            >
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Course Code</TableCell>
                <TableCell>Year</TableCell>
                <TableCell>Term</TableCell>
                <TableCell align="right">Credits</TableCell>
                <TableCell align="right">Capacity</TableCell>
                <TableCell>Faculty</TableCell>
                <TableCell align="center">Prerequisites</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody
              sx={{
                "& > .MuiTableRow-root > .MuiTableCell-root": {
                  paddingBlock: 0,
                  fontSize: "14px !important",
                  height: "55px",
                },
              }}
            >
              {loadingData ? (
                <>
                  {Array.from({ length: 6 }, (_, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell align="right">
                          <Skeleton variant="text" width="80%" />
                        </TableCell>
                        <TableCell align="right">
                          <Skeleton variant="text" width="80%" />
                        </TableCell>
                        <TableCell align="right">
                          <Skeleton variant="text" width="80%" />
                        </TableCell>
                        <TableCell align="right">
                          <Skeleton variant="text" width="100%" />
                        </TableCell>
                        <TableCell align="right">
                          <Skeleton variant="text" width="100%" />
                        </TableCell>
                        <TableCell align="right">
                          <Skeleton variant="text" width="100%" />
                        </TableCell>
                        <TableCell align="right">
                          <Skeleton variant="text" width="100%" />
                        </TableCell>
                        <TableCell align="right">
                          <Skeleton variant="text" width="100%" />
                        </TableCell>
                        <TableCell align="right">
                          <Skeleton variant="text" width="100%" />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </>
              ) : paginateduserDatas.length ? (
                paginateduserDatas.map((queryData) => {
                  return (
                    <TableRow
                      hover
                      sx={{
                        "&:hover": {
                          backgroundColor: "rgba(34, 51, 84, 0.1) !important",
                        },
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                      key={queryData.id}
                    >
                      <TableCell>
                        <Typography
                          variant="body1"
                          //   fontWeight="bold"
                          sx={{ fontSize: "14px !important" }}
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {queryData.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          noWrap
                        >
                          {queryData.description}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body1"
                          //   fontWeight="bold"
                          sx={{ fontSize: "14px !important" }}
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {queryData.courseCode}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body1"
                          //   fontWeight="bold"
                          sx={{ fontSize: "14px !important" }}
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {queryData.year}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body1"
                          //   fontWeight="bold"
                          sx={{ fontSize: "14px !important" }}
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {queryData.term}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography
                          variant="body1"
                          //   fontWeight="bold"
                          sx={{ fontSize: "14px !important" }}
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {queryData.credits}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography
                          variant="body1"
                          //   fontWeight="bold"
                          sx={{ fontSize: "14px !important" }}
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {queryData.capacity}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body1"
                          //   fontWeight="bold"
                          sx={{ fontSize: "14px !important" }}
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {queryData.faculty.email}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          noWrap
                        >
                          {queryData.faculty.firstName}{" "}
                          {queryData.faculty.lastName}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography
                          variant="body1"
                          sx={{ fontSize: "14px !important" }}
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          <Tooltip
                            title={`See ${queryData.prerequisites.length} prerequisites`}
                            arrow
                          >
                            <IconButton
                              onClick={(e) => {
                                setOpenConfirmation(true);
                                setCoursesPrerequisitesData(
                                  queryData.prerequisites
                                );
                              }}
                              disabled={!queryData.prerequisites.length}
                            >
                              {!queryData.prerequisites.length ? (
                                <Label color="error">No prerequisites</Label>
                              ) : (
                                <TableViewTwoToneIcon
                                  sx={{ color: "#1da1f2" }}
                                />
                              )}
                            </IconButton>
                          </Tooltip>
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" gap="1">
                          <Tooltip title="Edit course" arrow>
                            <IconButton onClick={(e) => handleEdit(queryData)}>
                              <BorderColorTwoToneIcon
                                sx={{ color: "#1da1f2" }}
                              />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete course" arrow>
                            <IconButton
                              onClick={(e) => handleDelete(queryData.id)}
                            >
                              <DeleteTwoToneIcon sx={{ color: "red" }} />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={9} sx={{ opacity: 0.5 }}>
                    <span
                      style={{
                        padding: "2rem",
                        display: "grid",
                        placeItems: "center",
                      }}
                    >
                      <InboxTwoToneIcon
                        sx={{ fontSize: "5rem" }}
                        color="disabled"
                      />
                      <Typography
                        fontSize="1.2rem"
                        fontWeight="bold"
                        color="gray"
                      >
                        No data to display
                      </Typography>
                    </span>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Box p={2}>
          <TablePagination
            component="div"
            count={coursesData.length}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleLimitChange}
            page={page}
            rowsPerPage={limit}
            rowsPerPageOptions={[5, 10, 25, 30]}
          />
        </Box>
      </Card>
      <Modal
        open={openConfirmation}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#fff",
            padding: "20px",
            paddingTop: "0.75rem",
            borderRadius: "4px",
            outline: "none",
            width: "90%",
            height: "90vh",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          <Stack direction="row" sx={{ alignSelf: "flex-end" }}>
            <Button
              sx={{
                color: "#FF1943",
                borderRadius: "4px !important",
                padding: "0.1rem !important",
                minWidth: "0 !important",
                "&:hover": {
                  backgroundColor: "rgba(255, 25, 67, 0.1) !important",
                },
              }}
              variant="text"
              onClick={handleClose}
            >
              <CloseIcon sx={{ height: 20 }} />
            </Button>
          </Stack>
          <PrerequisitesTable courseData={coursesPrerequisitesData} />
        </Box>
      </Modal>
      <Modal
        open={openConfirmationFormEdit}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginLeft: { xs: "10%", sm: "25%"},
          width: { xs: "78%", sm: "50%"}
        }}
      >
        <Box
          sx={{
            backgroundColor: "#fff",
            padding: "20px",
            paddingTop: "0.75rem",
            borderRadius: "4px",
            outline: "none",
            width: "90%",
            height: "90vh",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          <Stack direction="row" sx={{ alignSelf: "flex-end" }}>
            <Button
              sx={{
                color: "#FF1943",
                borderRadius: "4px !important",
                padding: "0.1rem !important",
                minWidth: "0 !important",
                "&:hover": {
                  backgroundColor: "rgba(255, 25, 67, 0.1) !important",
                },
              }}
              variant="text"
              onClick={handleCloseEdit}
            >
              <CloseIcon sx={{ height: 20 }} />
            </Button>
          </Stack>
          <UpdateCourse courseData={courseDataUpdate} />
        </Box>
      </Modal>
    </>
  );
};

CourseTable.propTypes = {
  courseData: PropTypes.array.isRequired,
};

CourseTable.defaultProps = {
  courseData: [],
};

export default CourseTable;

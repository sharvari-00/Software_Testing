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
  Typography,
  CardHeader,
  Skeleton,
} from "@mui/material";
import InboxTwoToneIcon from "@mui/icons-material/InboxTwoTone";

const PrerequisitesTable = ({ courseData }) => {
  const [coursesData, setCoursesData] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (courseData.length > 0) {
      setLoadingData(false);
      setCoursesData(courseData);
    }
  }, [courseData]);

  const handlePageChange = (_event, newPage) => {
    setPage(newPage);
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
        />
        <Divider />
        <TableContainer sx={{ height: "60vh" }}>
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
                {/* <TableCell>Prerequisites</TableCell> */}
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
                        <TableCell>
                          <Skeleton variant="text" width="80%" />
                        </TableCell>
                        <TableCell>
                          <Skeleton variant="text" width="80%" />
                        </TableCell>
                        <TableCell>
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
                        {/* <TableCell align="right">
                          <Skeleton variant="text" width="100%" />
                        </TableCell> */}
                      </TableRow>
                    );
                  })}
                </>
              ) : paginateduserDatas.length ? (
                paginateduserDatas.map((queryData) => {
                  console.log(queryData)
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
                      {/* <TableCell>
                        <Typography
                          variant="body1"
                          //   fontWeight="bold"
                          sx={{ fontSize: "14px !important" }}
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {queryData.prerequisites.length ? (
                            queryData.prerequisites.map(
                              (prerequisites, index) => {
                                return (
                                  <Typography>{index+1}. {prerequisites.name}</Typography>
                                );
                              }
                            )
                          ) : (
                            <Label color="error">No prerequisites</Label>
                          )}
                        </Typography>
                      </TableCell> */}
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
    </>
  );
};

PrerequisitesTable.propTypes = {
  courseData: PropTypes.array.isRequired,
};

PrerequisitesTable.defaultProps = {
  courseData: [],
};

export default PrerequisitesTable;

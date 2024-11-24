import { Toolbar, Typography, IconButton } from "@mui/material";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import { styled, alpha, ListSubheader, Button, useTheme } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import MenuIcon from "@mui/icons-material/Menu";
import { useLocation } from "react-router-dom";
import HomeWorkTwoToneIcon from "@mui/icons-material/HomeWorkTwoTone";
import BadgeTwoToneIcon from "@mui/icons-material/BadgeTwoTone";
import LibraryBooksTwoToneIcon from "@mui/icons-material/LibraryBooksTwoTone";
import Scrollbar from "./Scrollbar";
import { useAuth } from "../Redux/AuthContext";
import { useSnackbar } from "notistack";

const drawerWidth = 270;

const SidebarWrapper = styled(Box)(
  ({ theme }) => `
        width: ${theme.sidebar.width};
        min-width: ${theme.sidebar.width};
        color: ${theme.colors.alpha.trueWhite[70]};
        position: relative;
        z-index: 7;
        height: 100%;
        padding-bottom: 68px;
`
);

const MenuWrapper = styled(Box)(
  ({ theme }) => `
  .MuiList-root {
    padding: ${theme.spacing(1)};

    & > .MuiList-root {
      padding: 0 ${theme.spacing(0)} ${theme.spacing(1)};
    }
  }

    .MuiListSubheader-root {
      text-transform: uppercase;
      font-weight: bold;
      font-size: ${theme.typography.pxToRem(12)};
      color: ${theme.colors.alpha.trueWhite[50]};
      padding: ${theme.spacing(0, 2.5)};
      line-height: 1.4;
    }
`
);

const SubMenuWrapper = styled(Box)(
  ({ theme }) => `
    .MuiList-root {

      .MuiListItem-root {
        padding: 1px 0;

        .MuiBadge-root {
          position: absolute;
          right: ${theme.spacing(3.2)};

          .MuiBadge-standard {
            background: ${theme.colors.primary.main};
            font-size: ${theme.typography.pxToRem(10)};
            font-weight: bold;
            text-transform: uppercase;
            color: ${theme.palette.primary.contrastText};
          }
        }
    
        .MuiButton-root {
          display: flex;
          color: ${theme.colors.alpha.trueWhite[70]};
          background-color: transparent;
          width: 100%;
          justify-content: flex-start;
          padding: ${theme.spacing(1.2, 3)};

          .MuiButton-startIcon,
          .MuiButton-endIcon {
            transition: ${theme.transitions.create(["color"])};

            .MuiSvgIcon-root {
              font-size: inherit;
              transition: none;
            }
          }

          .MuiButton-startIcon {
            color: ${theme.colors.alpha.trueWhite[70]};
            font-size: ${theme.typography.pxToRem(20)};
            margin-right: ${theme.spacing(1)};
          }
          
          .MuiButton-endIcon {
            color: ${theme.colors.alpha.trueWhite[50]};
            margin-left: auto;
            opacity: .8;
            font-size: ${theme.typography.pxToRem(20)};
          }

          &.active,
          &:hover {
            background-color: ${alpha(theme.colors.alpha.trueWhite[100], 0.06)};
            color: ${theme.colors.alpha.trueWhite[100]};

            .MuiButton-startIcon,
            .MuiButton-endIcon {
              color: ${theme.colors.alpha.trueWhite[100]};
            }
          }
        }

        &.Mui-children {
          flex-direction: column;

          .MuiBadge-root {
            position: absolute;
            right: ${theme.spacing(7)};
          }
        }

        .MuiCollapse-root {
          width: 100%;

          .MuiList-root {
            padding: ${theme.spacing(1, 0)};
          }

          .MuiListItem-root {
            padding: 1px 0;

            .MuiButton-root {
              padding: ${theme.spacing(0.8, 3)};

              .MuiBadge-root {
                right: ${theme.spacing(3.2)};
              }

              &:before {
                content: ' ';
                background: ${theme.colors.alpha.trueWhite[100]};
                opacity: 0;
                transition: ${theme.transitions.create([
                  "transform",
                  "opacity",
                ])};
                width: 6px;
                height: 6px;
                transform: scale(0);
                transform-origin: center;
                border-radius: 20px;
                margin-right: ${theme.spacing(1.8)};
              }

              &.active,
              &:hover {

                &:before {
                  transform: scale(1);
                  opacity: 1;
                }
              }
            }
          }
        }
      }
    }
`
);

function ResponsiveDrawer() {
  const { enqueueSnackbar } = useSnackbar();
  const { state, dispatch } = useAuth();
  const [sidebarToggle, setSidebarToggle] = React.useState(false);
  const location = useLocation();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    enqueueSnackbar("Logged out successfully", {
      autoHideDuration: 3000,
      variant: "warning",
      preventDuplicate: true,
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "right",
      },
    });
  };

  const toggleSidebar = () => {
    setSidebarToggle(!sidebarToggle);
  };

  const closeSidebar = () => {
    setSidebarToggle(false);
  };

  const currentRoute = location.pathname;

  const theme = useTheme();

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <MenuWrapper>
        <List component="div" sx={{ mb: 5 }}>
          <SubMenuWrapper>
            <ListItem disablePadding></ListItem>
          </SubMenuWrapper>
        </List>
        <Divider
          sx={{
            background: theme.colors.alpha.trueWhite[10],
          }}
        />
        <List
          component="div"
          subheader={
            <ListSubheader component="div" disableSticky>
              Department
            </ListSubheader>
          }
        >
          <SubMenuWrapper>
            <ListItem component={Link} to="/department" key={"Department"}>
              <Button
                disableRipple
                component="a"
                onClick={toggleSidebar}
                startIcon={<HomeWorkTwoToneIcon />}
                fullWidth
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  color:
                    currentRoute === "/department"
                      ? theme.colors.alpha.trueWhite[100]
                      : theme.colors.alpha.trueWhite[70],
                  background:
                    currentRoute === "/department"
                      ? "rgba(29, 161, 242, 0.1) !important"
                      : "transparent",
                }}
              >
                All Departments
              </Button>
            </ListItem>
          </SubMenuWrapper>
        </List>
      </MenuWrapper>
      <Divider
        sx={{
          background: theme.colors.alpha.trueWhite[10],
        }}
      />
      <MenuWrapper>
        <List
          component="div"
          subheader={
            <ListSubheader component="div" disableSticky>
              Faculty
            </ListSubheader>
          }
        >
          <SubMenuWrapper>
            <ListItem component={Link} to="/faculty" key={"Faculty"}>
              <Button
                disableRipple
                component="a"
                startIcon={<BadgeTwoToneIcon />}
                onClick={toggleSidebar}
                fullWidth
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  color:
                    currentRoute === "/faculty"
                      ? theme.colors.alpha.trueWhite[100]
                      : theme.colors.alpha.trueWhite[70],
                  background:
                    currentRoute === "/faculty"
                      ? "rgba(29, 161, 242, 0.1) !important"
                      : "transparent",
                }}
              >
                All Faculty
              </Button>
            </ListItem>
          </SubMenuWrapper>
        </List>
      </MenuWrapper>
      <Divider
        sx={{
          background: theme.colors.alpha.trueWhite[10],
        }}
      />
      <MenuWrapper>
        <List
          component="div"
          subheader={
            <ListSubheader component="div" disableSticky>
              Courses
            </ListSubheader>
          }
        >
          <SubMenuWrapper>
            <ListItem component={Link} to="/courses" key={"Courses"}>
              <Button
                disableRipple
                component="a"
                startIcon={<LibraryBooksTwoToneIcon />}
                onClick={toggleSidebar}
                fullWidth
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  color:
                    currentRoute === "/courses"
                      ? theme.colors.alpha.trueWhite[100]
                      : theme.colors.alpha.trueWhite[70],
                  background:
                    currentRoute === "/courses"
                      ? "rgba(29, 161, 242, 0.1) !important"
                      : "transparent",
                }}
              >
                All Courses
              </Button>
            </ListItem>
          </SubMenuWrapper>
        </List>
      </MenuWrapper>
    </div>
  );

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          background: "#252525",
          display: { xs: "block", sm: "block" },
          width: { sm: `calc(100% - ${290}px)` },
          ml: { sm: `${drawerWidth}px` },
          height: 65,
          p: 1.3,
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <Typography
            variant="h3"
            noWrap
            component="div"
            sx={{ color: "white" }}
          >
            Academic ERP
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={toggleSidebar}
            sx={{ display: { sm: "none" } }}
          >
            <MenuIcon sx={{ color: "white" }} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <SidebarWrapper
          sx={{
            display: {
              xs: "none",
              sm: "inline-block",
            },
            position: "fixed",
            left: 0,
            top: 0,
            background: "#252525",
            boxShadow:
              theme.palette.mode === "dark" ? theme.sidebar.boxShadow : "none",
          }}
        >
          <Scrollbar>{drawer}</Scrollbar>
          {state.isAuthenticated && (
            <>
              <Divider
                sx={{
                  background: theme.colors.alpha.trueWhite[10],
                }}
              />
              <Box p={2} sx={{ background: "#252525" }}>
                <Button
                  onClick={handleLogout}
                  variant="contained"
                  color="success"
                  size="small"
                  fullWidth
                  sx={{
                    background:
                      "linear-gradient(180deg, #00bcd4 0%, #1da1f2 100%) !important",
                  }}
                >
                  Logout
                </Button>
              </Box>
            </>
          )}
        </SidebarWrapper>
        <Drawer
          sx={{
            display: {
              xs: "block",
              md: "none",
            },
            boxShadow: `${theme.sidebar.boxShadow}`,
          }}
          anchor={theme.direction === "rtl" ? "right" : "left"}
          open={sidebarToggle}
          onClose={closeSidebar}
          variant="temporary"
          elevation={9}
        >
          <SidebarWrapper
            sx={{
              background: "#252525",
            }}
          >
            <Scrollbar>{drawer}</Scrollbar>
            {state.isAuthenticated && (
              <>
                <Divider
                  sx={{
                    background: theme.colors.alpha.trueWhite[10],
                  }}
                />
                <Box p={2} sx={{ background: "#252525" }}>
                  <Button
                    onClick={handleLogout}
                    variant="contained"
                    color="success"
                    size="small"
                    fullWidth
                    sx={{
                      background:
                        "linear-gradient(180deg, #00bcd4 0%, #1da1f2 100%) !important",
                    }}
                  >
                    Logout
                  </Button>
                </Box>
              </>
            )}
          </SidebarWrapper>
        </Drawer>
      </Box>
    </>
  );
}

export default ResponsiveDrawer;

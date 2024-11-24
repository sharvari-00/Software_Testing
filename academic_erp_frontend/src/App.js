import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Box } from "@mui/material";
import { ThemeProvider, CssBaseline } from "@mui/material";
import Sidebar from "./Layout/Sidebar";
import Courses from "./components/Courses";
import Login from "./components/Login";
import { PureLightTheme } from "./Theme/PureLightTheme";
import Faculty from "./components/Faculty";
import Department from "./components/Department";
import { SnackbarProvider } from "notistack";
import { AuthProvider, useAuth } from "./Redux/AuthContext";

const drawerWidth = 240;

const AuthenticatedLayout = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: 6,
          pl: { sm: 2 },
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

const AppContent = () => {
  const { state } = useAuth();
  return (
    <Routes>
      <Route
        path="/courses"
        element={
          state.isAuthenticated ? (
            <AuthenticatedLayout>
              <Courses />
            </AuthenticatedLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/login"
        element={state.isAuthenticated ? <Navigate to="/courses" /> : <Login />}
      />
      <Route
        path="/"
        element={<Navigate to="/login" />}
      />
      <Route
        path="/faculty"
        element={
          state.isAuthenticated ? (
            <AuthenticatedLayout>
              <Faculty />
            </AuthenticatedLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/department"
        element={
          state.isAuthenticated ? (
            <AuthenticatedLayout>
              <Department />
            </AuthenticatedLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </Routes>
  );
};

const App = () => {
  return (
    <SnackbarProvider maxSnack={3}>
      <AuthProvider>
        <ThemeProvider theme={PureLightTheme}>
          <Router>
            <AppContent />
          </Router>
        </ThemeProvider>
      </AuthProvider>
    </SnackbarProvider>
  );
};

export default App;

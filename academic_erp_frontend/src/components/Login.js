import React, { useState } from "react";
import {
  Button,
  Container,
  Grid,
  FormHelperText,
  InputAdornment,
  TextField,
  FormControl,
  IconButton,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import PasswordIcon from "@mui/icons-material/Password";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CircularProgress from "@mui/material/CircularProgress";
import { useAuth } from "../Redux/AuthContext";
import { useSnackbar } from "notistack";

const Login = () => {
  const { dispatch } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsSubmitting] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const loginUser = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("http://localhost:9191/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const userData = await response.json();
      if (!response.ok) {
        setIsSubmitting(false);
        enqueueSnackbar(userData.error, {
          autoHideDuration: 3000,
          variant: "error",
          preventDuplicate: true,
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
        return;
      }
      dispatch({ type: "LOGIN", payload: { user: userData } });
      enqueueSnackbar("Logged in successfully", {
        autoHideDuration: 3000,
        variant: "success",
        preventDuplicate: true,
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
      });
      navigate("/courses");
    } catch (error) {
      setIsSubmitting(false);
      enqueueSnackbar("Unexpected error occurred", {
        autoHideDuration: 3000,
        variant: "error",
        preventDuplicate: true,
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
      });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          textAlign: "center",
          boxShadow: "0px 0px 2px #6a7199",
          borderRadius: 2,
          width: "100%",
        }}
      >
        <Grid
          spacing={{ xs: 6, md: 4 }}
          justifyContent="center"
          alignItems="center"
          container
        >
          <Grid item md={10} lg={8} mx="auto">
            <Typography variant="h3" fontWeight={800} color={"#1da1f2"} mb={2}>
              Academic ERP
            </Typography>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string()
                  .email("must be a valid email")
                  .max(255)
                  .required("email is required"),
                password: Yup.string()
                  .max(255)
                  .required("Password is required"),
              })}
              onSubmit={(values) => {
                loginUser(values);
              }}
            >
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                touched,
                values,
              }) => (
                <form onSubmit={handleSubmit}>
                  <FormControl fullWidth sx={{ mb: 3 }}>
                    <TextField
                      label="Email"
                      id="name"
                      name="email"
                      type="email"
                      sx={{
                        mb: 1,
                      }}
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            Email
                          </InputAdornment>
                        ),
                      }}
                    />
                    {touched.email && errors.email ? (
                      <FormHelperText error id="helpertext-email">
                        {errors.email}
                      </FormHelperText>
                    ) : null}
                  </FormControl>
                  <FormControl fullWidth sx={{ mb: 3 }}>
                    <TextField
                      label="Password"
                      id="password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      sx={{ mb: 1 }}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.password}
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PasswordIcon />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                              size="large"
                            >
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    {touched.password && errors.password ? (
                      <FormHelperText error id="helpertext-password">
                        {errors.password}
                      </FormHelperText>
                    ) : null}
                  </FormControl>
                  {isLoading ? (
                    <center>
                      <CircularProgress sx={{ mb: 2 }} />
                    </center>
                  ) : (
                    <Button
                      type="submit"
                      size="large"
                      variant="contained"
                      sx={{
                        mb: 2,
                        background:
                          "linear-gradient(180deg, #00bcd4 0%, #1da1f2 100%) !important",
                        color: "white",
                      }}
                    >
                      Sign In
                    </Button>
                  )}
                </form>
              )}
            </Formik>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Login;

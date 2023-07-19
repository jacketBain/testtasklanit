import React from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import AuthApi from "../../api/auth/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../store/reducers/AuthSlice";
import GitHubIcon from "@mui/icons-material/GitHub";

import "./styles.scss";
import { useNavigate } from "react-router";
import AuthService from "../../service/AuthService";

const LoginLayout = () => {
  const [login, setLogin] = React.useState("");

  const [errorLogin, setErrorLogin] = React.useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    setErrorLogin(false);
    e.preventDefault();
    AuthApi.getAuth(login)
      .then((user) => {
        AuthService.saveToken(login);
        dispatch(setCredentials(user));
        navigate("/");
      })
      .catch(() => setErrorLogin(true));
  };

  return (
    <div className="loginLayout">
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <GitHubIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              fullWidth
              id="token"
              label="Access Token"
              name="token"
              autoComplete="token"
              autoFocus
              error={errorLogin}
              helperText={errorLogin && "Incorrect token"}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default LoginLayout;

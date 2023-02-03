import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useTheme } from "@mui/material";
import { formBody, post, RequestService } from "../../lib/api/request";
import * as Eff from "@effect/io/Effect";
import { pipe } from "@fp-ts/core/Function";
import { useNavigate } from "react-router-dom";
import { useQuery } from "../../lib/react-router/useQuery";

export default function SignIn() {
  const theme = useTheme();
  const navigate = useNavigate();
  let query = useQuery();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log("sending: to", import.meta.env.VITE_API_URL, {
      username: data.get("username"),
      password: data.get("password"),
    });
    Eff.runCallback(
      pipe(
        post("/api/login/password", formBody(data)),
        Eff.flatMap(() =>
          Eff.async<never, never, {}>((resume) => {
            console.log("huhhhhh");
            const redirectUrl = query.get("redirectUrl") || "/";
            console.log("REDIRECTING TO:", redirectUrl);
            navigate(redirectUrl, {
              replace: true,
            });
            resume(Eff.succeed({}));
          })
        ),
        Eff.provideService(RequestService, {
          config: { baseUrl: import.meta.env.VITE_API_URL },
        })
      ),
      (exit) => {
        console.log("finished?", exit);
      }
    );
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          component="h1"
          variant="h1"
          color={theme.palette.primary.main}
        >
          yaltt
        </Typography>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          action="http://localhost:3000/api/login/password"
          method="post"
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              {/* <Link href="#" variant="body2">
                  Forgot password?
                </Link> */}
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

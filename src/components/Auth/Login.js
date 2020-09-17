import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { loginUser } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = () => {
  const classes = useStyles();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const logging = useSelector((state) => state.auth.loginData);
  const loginFailure = useSelector((state) => state.auth.loginFailure);
  const loginSuccess = useSelector((state) => state.auth.loginSuccess);
  const userType = useSelector((state) => state.auth.user.userType);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((user) => ({ ...user, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitted(true);
    if (user.email && user.password) {
      dispatch(loginUser(user));
    }
  };

  if (loginSuccess) {
    if(userType === 'client') return <Redirect to="/" />
    return <Redirect to="/account/supplier/dashboard" />
  }

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>

      <form className={classes.form} noValidate onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          value={user.email}
          helperText={submitted && !user.email ? "is invalid" : null}
          error={submitted && !user.email ? "is-invalid" : null}
          onChange={handleChange}
          autoComplete="email"
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          helperText={submitted && !user.password ? "is invalid" : null}
          value={user.password}
          error={submitted && !user.password ? "is-invalid" : null}
          onChange={handleChange}
          label="Password"
          type="password"
          id="password"
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        {loginFailure && <Alert severity="error">{loginFailure}</Alert>}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          {logging && (
            <CircularProgress size={30} className={classes.progress} />
          )}
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href="/signup" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import { login } from "app/client/modules/auth";

/* material-ui */
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Container from "@material-ui/core/Container";
import {
  InputLabel,
  Input,
  Typography,
  FormControlLabel,
  Checkbox
} from "@material-ui/core";

/* styles */
import useStyles from "./styles";

type Props = {
  onHandleFunc: Function;
};

function LoginForm(props: Props): JSX.Element {
  /* state */
  const [input, setInput] = useState<string>("");
  /* mapDispatchToProps */
  const dispatch: Dispatch = useDispatch();
  /* style */
  const styles: any = useStyles({});

  const handleChange = (value: string): void => {
    setInput(value);
  };

  const handleSubmit = (): void => {
    setInput("");
    dispatch(login(input));
    props.onHandleFunc();
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={styles.form} noValidate>
          <FormControl fullWidth>
            <InputLabel htmlFor="name-input">Name</InputLabel>
            <Input
              id="name-input"
              fullWidth
              onChange={(e): void => handleChange(e.target.value)}
            />
          </FormControl>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={handleSubmit}
            className={styles.submit}
          >
            Login
          </Button>
        </form>
      </Container>
    </>
  );
}

export default LoginForm;

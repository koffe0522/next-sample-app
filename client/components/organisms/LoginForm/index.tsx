import React, { useState } from "react";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import { login } from "../../../modules/auth";

function LoginForm(): JSX.Element {
  /* state */
  const [input, setInput] = useState<string>("");
  /* mapDispatchToProps */
  const dispatch: Dispatch = useDispatch();

  const handleChange = (value: string): void => {
    setInput(value);
  };

  const handleSubmit = (): void => {
    setInput("");
    dispatch(login(input));
  };

  return (
    <>
      <h1>Login</h1>
      <label>
        Name:
        <input
          type="text"
          value={input}
          onChange={(e): void => handleChange(e.target.value)}
        />
      </label>
      <button type="button" onClick={handleSubmit}>
        Login
      </button>
    </>
  );
}

export default LoginForm;

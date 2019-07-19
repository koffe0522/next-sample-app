import React from "react";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import { loginOut } from "../../../modules/Auth";

function LogoutButton(): JSX.Element {
  const dispatch: Dispatch = useDispatch();

  const handleSubmit = (): void => {
    dispatch(loginOut());
  };

  return (
    <button type="button" onClick={(): void => handleSubmit()}>
      Logout
    </button>
  );
}

export default LogoutButton;

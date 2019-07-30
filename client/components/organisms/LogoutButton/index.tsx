import React from "react";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import { logOut } from "app/client/modules/auth";

/* style */
import styles from "./styles.scss";

type Props = {
  onHandleFunc: Function;
};

function LogoutButton(props: Props): JSX.Element {
  const dispatch: Dispatch = useDispatch();

  const handleSubmit = (): void => {
    props.onHandleFunc();
    dispatch(logOut());
  };

  return (
    <button
      className={styles.button}
      type="button"
      onClick={(): void => handleSubmit()}
    >
      Logout
    </button>
  );
}

export default LogoutButton;

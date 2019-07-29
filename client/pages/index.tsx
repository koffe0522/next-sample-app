import React from "react";
import { useSelector } from "react-redux";

/* layouts */
import Main from "app/client/layouts";

/* modules */
import LoginForm from "app/client/components/organisms/LoginForm";
import Todolist from "app/client/components/organisms/TodoList";
import LogoutButton from "app/client/components/organisms/LogoutButton";

/**
 * Storeから受けとったStateを定義するI/F
 * @interface State
 */
interface State {
  auth: {
    userName: string;
  };
}

/**
 * Propsの値を定義するI/F
 * @interface Props
 */
interface Props {
  userName: string;
}

function Index(): JSX.Element {
  /* maoStateToProps */
  const useName: string = useSelector(
    (state: State): string => state.auth.userName
  );

  return (
    <Main>
      <div>
        <h1>Sample App</h1>

        {useName !== "" ? (
          <>
            <h2>Hello {useName}</h2>
            <LogoutButton />
            <Todolist />
          </>
        ) : (
          <LoginForm />
        )}
      </div>
    </Main>
  );
}

Index.getInitialProps = (props: Props): object => {
  return { userName: props.userName };
};

export default Index;

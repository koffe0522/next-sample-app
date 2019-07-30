import React, { useEffect, ReactElement } from "react";
import { useSelector } from "react-redux";

/* firebase */
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "isomorphic-unfetch";

/* layouts */
import Main from "app/client/layouts";

/* modules */
import LoginForm from "app/client/components/organisms/LoginForm";
import Todolist from "app/client/components/organisms/TodoList";
import LogoutButton from "app/client/components/organisms/LogoutButton";
import clientCredentials from "../../credentials/client";

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
 * @type Props
 */
type Props = {
  userName: string;
  user: object;
};

function Index(): ReactElement {
  /* maoStateToProps */
  const useName: string = useSelector(
    (state: State): string => state.auth.userName
  );

  /**
   * ログインのハンドラー
   */
  const handleLogin = (): void => {
    // 匿名ログイン
    firebase
      .auth()
      .signInAnonymously()
      .then((userCredential): void => {
        console.log("----- Response for firebase auth -----");
        console.log(userCredential);
        const token = userCredential.user.getIdToken;
        console.log(token);
      });
  };

  /**
   * ログアウト用のハンドラー
   */
  const handleLogout = (): void => {
    firebase.auth().signOut();
    fetch("/api/logout", {
      method: "POST",
      credentials: "same-origin"
    }).then((res: Response): void => {
      console.log("----- Response for /api/logout -----");
      console.log(res);
    });
  };

  useEffect((): void => {
    // firebaseの初期化
    firebase.initializeApp(clientCredentials);

    firebase.auth().onAuthStateChanged(
      async (userData: firebase.User): Promise<void> => {
        if (userData) {
          // User is signed in.
          userData
            .getIdTokenResult()
            .then((idTokenResult): void => {
              fetch("/api/login", {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json"
                },
                credentials: "same-origin",
                body: JSON.stringify(idTokenResult)
              }).then((res: Response): void => {
                console.log("----- Response for /api/login -----");
                console.log(res);
              });
            })
            .catch((error): void => {
              console.log(error);
            });
        } else {
          // User is signed out.
          fetch("/api/logout", {
            method: "POST",
            credentials: "same-origin"
          });
        }
      }
    );
  }, []);

  return (
    <Main>
      <div>
        <h1>Sample App</h1>

        {useName !== "" ? (
          <>
            <h2>Hello {useName}</h2>
            <LogoutButton onHandleFunc={handleLogout} />
            <Todolist />
          </>
        ) : (
          <LoginForm onHandleFunc={handleLogin} />
        )}
      </div>
    </Main>
  );
}

Index.getInitialProps = async ({ req, userName }): Promise<object> => {
  const user = req && req.session ? req.session.decodedToken : null;
  console.log(`------ req.session ------`);
  console.log(user);
  return { user, userName };
};

export default Index;

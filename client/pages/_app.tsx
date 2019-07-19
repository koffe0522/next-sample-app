import React from "react";
import { Provider } from "react-redux";
import App, { Container, AppContext, AppInitialProps } from "next/app";
import withRedux from "next-redux-wrapper";

/* store */
import { Store } from "redux";
import initStore from "../store";

/* type */
interface Iprops extends React.Props<{}> {
  store: Store;
}

/**
 * Next.jsの標準Appコンポーネントをオーバーライド
 *
 * @class MyApp
 * @extends {IProps}
 */
class MyApp extends App<Iprops> {
  public render(): JSX.Element {
    const { Component, pageProps, store } = this.props;
    return (
      <Container>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}

MyApp.getInitialProps = async ({
  Component,
  ctx
}: AppContext): Promise<AppInitialProps> => {
  let pageProps: object = {};
  // 理由：any型だとeslintで警告が出るため
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let context: any = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  /* redux init */
  context = ctx;
  const { dispatch } = context.store;

  dispatch({ type: "FEATURE_SET", payload: { data: "test" } });

  return { pageProps };
};

export default withRedux(initStore)(MyApp);

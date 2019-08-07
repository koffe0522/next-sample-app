import React from "react";
import { Provider } from "react-redux";
import App, { Container, AppContext, AppInitialProps } from "next/app";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/styles";
import withRedux from "next-redux-wrapper";

/* type */
import { Store } from "redux";

/* style */
import theme from "../src/theme";

/* store */
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
        <Head>
          <link rel="manifest" href="../public/manifest.json" />
          <link rel="icon" type="image/x-icon" href="../public/icon.ico" />
        </Head>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </ThemeProvider>
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
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  return { pageProps };
};

export default withRedux(initStore)(MyApp);

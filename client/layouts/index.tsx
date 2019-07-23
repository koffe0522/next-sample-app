import React from "react";

/* organisms */
import Header from "app/client/components/organisms/Header";

type Layout = {
  children: JSX.Element;
};

function MainLayout(props: Layout): JSX.Element {
  return (
    <>
      <Header />
      {props.children}
    </>
  );
}

MainLayout.defaultProps = {
  children: null
};

export default MainLayout;

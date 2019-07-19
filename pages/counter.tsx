import React from "react";

/* components */
import Header from "../components/organisms/Header";
import CalculationBody from "../components/organisms/CalculationBody";

function Counter(): JSX.Element {
  return (
    <>
      <Header />
      <CalculationBody />
    </>
  );
}

export default Counter;

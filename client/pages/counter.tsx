import React from "react";

/* layouts */
import Main from "../layouts";

/* components */
import CalculationBody from "../components/organisms/CalculationBody";

function Counter(): JSX.Element {
  return (
    <>
      <Main>
        <CalculationBody />
      </Main>
    </>
  );
}

export default Counter;

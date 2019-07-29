import React from "react";

/* layouts */
import Main from "app/client/layouts";

/* components */
import CalculationBody from "app/client/components/organisms/CalculationBody";

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

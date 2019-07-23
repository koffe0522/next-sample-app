import React from "react";

/* component */
import Button from "app/client/components/atoms/button";
import { CounterActionTypes } from "app/client/modules/counter";

/**
 * ボタンに実装する関数を定義するI/F
 * @interface Props
 */
interface Props {
  incriment: () => CounterActionTypes;
  decrement: () => CounterActionTypes;
}

function calculationButton(props: Props): JSX.Element {
  return (
    <div>
      <Button
        text="+ 1"
        handleClick={(): CounterActionTypes => props.incriment()}
      />
      <Button
        text="- 1"
        handleClick={(): CounterActionTypes => props.decrement()}
      />
    </div>
  );
}

export default calculationButton;

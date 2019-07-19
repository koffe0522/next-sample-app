import React from "react";
import { Dispatch } from "redux";
import { useSelector, useDispatch } from "react-redux";

/* actions */
import {
  increment,
  decrement,
  CounterActionTypes
} from "../../../modules/Counter";

/* components */
import CalculationButton from "../../molecules/calculationButton";

/**
 * Storeから受けとったカウンターのStateを定義するI/F
 * @interface Istate
 */
interface Istate {
  counter: {
    count: number;
  };
}

/**
 * Propsの値を定義するI/F
 * @interface Iprops
 */
interface Iprops {
  count: number;
}

function CalculationBody(): JSX.Element {
  /* mapStateToProps */
  const counter: number = useSelector(
    (state: Istate): number => state.counter.count
  );
  /* mapDispatchToProps */
  const dispatch: Dispatch = useDispatch();
  const handleIncriment = (): CounterActionTypes => dispatch(increment());
  const handleDecrement = (): CounterActionTypes => dispatch(decrement());

  return (
    <div>
      <h1>Counter Page</h1>
      <div>{counter}</div>
      <CalculationButton
        incriment={(): CounterActionTypes => handleIncriment()}
        decrement={(): CounterActionTypes => handleDecrement()}
      />
    </div>
  );
}

CalculationBody.getInitialProps = (props: Iprops): object => {
  return { count: props.count };
};

export default CalculationBody;

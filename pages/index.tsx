/* redux */
import { useSelector } from "react-redux";
import React from "react";

/**
 * Storeから受けっとったカウンターのStateを定義するI/F
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

function Index(): JSX.Element {
  /* state */
  const counter: number = useSelector(
    (state: Istate): number => state.counter.count
  );

  return <div>{counter}</div>;
}

Index.getInitialProps = (props: Iprops): object => {
  return { count: props.count };
};

export default Index;

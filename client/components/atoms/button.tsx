import React from "react";

/**
 * ボタンのStateを定義するI/F
 * @interface Istate
 */
interface Props {
  text: string;
  handleClick: () => void;
}

function button(props: Props): JSX.Element {
  return (
    <>
      <button type="button" onClick={props.handleClick}>
        {props.text}
      </button>
    </>
  );
}

export default button;

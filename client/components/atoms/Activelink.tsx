/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from "react";
import { withRouter } from "next/router";

type Props = {
  children: string | JSX.Element;
  router: any;
  href: string;
  target?: string;
  onClick: (e?: React.MouseEvent) => {};
  className?: string;
  rel?: string;
};

function ActiveLink(props: Props): JSX.Element {
  const handleClick = (e: React.MouseEvent): void => {
    if (!props.target) {
      e.preventDefault();
      props.onClick(e);
      props.router.push(props.href, props.href, { shallow: true });
    } else {
      props.onClick(e);
    }
  };

  return (
    <a {...props} onClick={(e): void => handleClick(e)}>
      {props.children}
    </a>
  );
}

export default withRouter(ActiveLink);

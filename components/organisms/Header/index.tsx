import React from "react";
import Link from "next/link";

function Header(): JSX.Element {
  return (
    <header>
      <ul>
        <li>
          <Link href="/">
            <button type="button">Index</button>
          </Link>
        </li>
        <li>
          <Link href="/counter">
            <button type="button">Counter</button>
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;

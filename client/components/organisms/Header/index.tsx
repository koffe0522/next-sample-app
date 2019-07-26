import React from "react";
import Link from "next/link";

/* style */
import { AppBar, Toolbar } from "@material-ui/core";
import styles from "./styles.scss";

function Header(): JSX.Element {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <h3>Sample App</h3>
        <ul className={styles.row}>
          <li>
            <Link href="/">
              <a className={styles.text} href="javascript:void(0)">
                Index
              </a>
            </Link>
          </li>
          <li>
            <Link href="/counter">
              <a className={styles.text} href="javascript:void(0)">
                Counter
              </a>
            </Link>
          </li>
        </ul>
      </Toolbar>
    </AppBar>
  );
}

export default Header;

import React, { useContext } from 'react';
import AuthContext from '../../store/auth-context';
import classes from './Navigation.module.css';

const Navigation = (props) => {

  const ctx = useContext(AuthContext);

  return (
    // <AuthContext.Consumer>
    //   {/* above consumer takes a child, which should be fnctn
    //   and as argument we get context data which we defined in auth-context.js 
    //   and we will return jsx code which have access to data*/}
    //   {(ctx) => {
        // return (
          <nav className={classes.nav}>
            <ul>
              {ctx.isLoggedIn && (
                <li>
                  <a href="/">Users</a>
                </li>
              )}
              {ctx.isLoggedIn && (
                <li>
                  <a href="/">Admin</a>
                </li>
              )}
              {ctx.isLoggedIn && (
                <li>
                  <button onClick={ctx.onLogout}>Logout</button>
                </li>
              )}
            </ul>
          </nav>
        );
    //   }};
    // </AuthContext.Consumer>
  // );
};

export default Navigation;

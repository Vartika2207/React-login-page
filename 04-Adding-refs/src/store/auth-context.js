import React, { useState, useEffect } from "react";

//creates context object at the end, take default context and it returns object
const AuthContext = React.createContext({
    //its dummy not used below props, but for auto-completion purpose as we have defined them in app.js
    isLoggedIn: false,
    onLogout: () => {},
    onLogin: (email, password) => {}
});

//below is named export
export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');
        if(storedUserLoggedInInformation === '1'){
          setIsLoggedIn(true);
        }
      }, []);

    const logoutHandler = () => {
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
    };
    const LoginHandler = () => {
        localStorage.setItem('isLoggedIn', '1');
        setIsLoggedIn(true);
    };

    return (
        <AuthContext.Provider 
          value = {{
            isLoggedIn: isLoggedIn, 
            onLogout: logoutHandler, 
            onLogin: LoginHandler
            }}>
            {props.childern}
        </AuthContext.Provider>
    );
};

export default AuthContext;
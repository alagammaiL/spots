import { createContext, useState, useCallback, useEffect } from "react";
export const Authcontext = createContext({
  isLogin: false,
  token: null,
  userId: null,
  login: () => {},
  logout: () => {},
});

export default function AuthComponentProvider({ children }) {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(null);
  const loginHandler = useCallback(function loginHandler(
    userIdValue,
    tokenValue
  ) {
    setToken(tokenValue);
    localStorage.setItem(
      "loginData",
      JSON.stringify({
        token: tokenValue,
        id: userIdValue,
      })
    );
    setUserId(userIdValue);
  },
  []);
  const logoutHandler = useCallback(function logoutHandler() {
    setToken(null);
    localStorage.setItem("loginData", null);
    setUserId(null);
  }, []);
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("loginData"));
    console.log(userData);
    if (userData && userData.token) {
      console.log("entering inner", userData);
      loginHandler(userData.id, userData.token);
    }
  }, [loginHandler]);
  let ctxValue = {
    isLogin: token ? true : false,
    token: token,
    userId,
    login: loginHandler,
    logout: logoutHandler,
  };
  return (
    <Authcontext.Provider value={ctxValue}>{children}</Authcontext.Provider>
  );
}

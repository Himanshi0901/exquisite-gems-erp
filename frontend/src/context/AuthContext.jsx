import {
  createContext,
  useEffect,
  useState,
} from "react";

export const AuthContext =
  createContext();

export function AuthProvider({
  children,
}) {
  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  /* RESTORE LOGIN */

  useEffect(() => {
    const token =
      localStorage.getItem(
        "token"
      );

    const savedUser =
      localStorage.getItem(
        "user"
      );

    if (
      token &&
      savedUser
    ) {
      setUser(
        JSON.parse(
          savedUser
        )
      );
    }

    setLoading(false);
  }, []);

  /* AUTO LOGOUT */

  useEffect(() => {
    let timeout;

    const logoutUser =
      () => {
        localStorage.removeItem(
          "token"
        );

        localStorage.removeItem(
          "user"
        );

        setUser(null);

        window.location.href =
          "/login";
      };

    const resetTimer =
      () => {
        clearTimeout(
          timeout
        );

        timeout =
          setTimeout(
            logoutUser,
            15 *
              60 *
              1000
          );
      };

    const events = [
      "mousemove",
      "keydown",
      "click",
      "scroll",
    ];

    events.forEach(
      (event) => {
        window.addEventListener(
          event,
          resetTimer
        );
      }
    );

    resetTimer();

    return () => {
      clearTimeout(
        timeout
      );

      events.forEach(
        (event) => {
          window.removeEventListener(
            event,
            resetTimer
          );
        }
      );
    };
  }, []);

  const login = (
    token,
    userData
  ) => {
    localStorage.setItem(
      "token",
      token
    );

    localStorage.setItem(
      "user",
      JSON.stringify(
        userData
      )
    );

    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    setUser(null);

    window.location.href =
      "/login";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import Header from "@/components/header";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { useEffect } from "react";
import { useState } from "react";
import { CurrentUserContext } from "@/context/index";

export const Route = createRootRoute({
  component: () => {
    const { user, isAuthenticated, login, logout } = useKindeAuth();
    const [currentUser, setCurrentUser] = useState({} as any);

    const loginRegisterUser = async () => {
      if (user?.id && user.given_name) {
        const userId = user.id;
        const userName = user.given_name;
        const response = await fetch(`/api/Users/${userId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, userName }),
        }).then((response) => response.json());
        return response;
      }
    }

    useEffect(() => {
      loginRegisterUser();
    }, [isAuthenticated]);

    useEffect(() => {
      if (isAuthenticated) {
        (async () => {
          const userId = user?.id;
          const result = await fetch(`/api/users/${userId}`);
          const data = await result.json();
          setCurrentUser(data);
        })();
      }
    }, [isAuthenticated])

    return (
      <>
        {isAuthenticated ? (
          <CurrentUserContext.Provider value={[currentUser, setCurrentUser]}>
            <div className="p-2 bg-[#ff6600] flex gap-2 container items-center justify-between w-100 px-3">
              <div className="flex gap-2 items-center ">
                <Link to="/" className="[&.active]:font-bold">
                  <Header />
                </Link>
                <Link to="/new" className="[&.active]:font-bold">
                  new
                </Link>
                <Link to="/threads" className="[&.active]:font-bold">
                  threads
                </Link>
                <Link to="/comments" className="[&.active]:font-bold">
                  comments
                </Link>
                <Link to="/submit" className="[&.active]:font-bold">
                  submit
                </Link>
              </div>
              <div className="flex gap-2">
                <p>{user?.given_name}</p>
                <p>{user?.family_name}</p>
                <button onClick={() => logout()} type="button">
                  Sign Out
                </button>
              </div>
            </div>
            <hr />
            <Outlet />
          </CurrentUserContext.Provider>
        ) : (
          <button onClick={() => {
            login();
          }} type="button">
            Sign In
          </button>
        )}
      </>
    );
  },
});

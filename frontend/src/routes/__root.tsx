import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import Header from "@/components/header";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { useState, useEffect } from "react";
export const Route = createRootRoute({
  component: () => {
    const { user, isAuthenticated, login } = useKindeAuth();
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
      setLoggedIn(localStorage.getItem("isAuthenticated") === "true");
      console.log("isAuthenticated", localStorage.getItem("isAuthenticated"));
    }, []);

    useEffect(() => {
      if (isAuthenticated) {
        // set cookies for the user so on refresh they are still authenticated
        localStorage.setItem("isAuthenticated", "true");
      }
    }, [isAuthenticated]);
    return (
      <>
        {loggedIn ? (
          <>
            <div className="p-2 flex gap-2 items-center justify-center w-100">
              <Link to="/" className="[&.active]:font-bold">
                <Header />
              </Link>{" "}
              <Link to="/new" className="[&.active]:font-bold">
                new {" | "}
              </Link>
              <Link to="/threads" className="[&.active]:font-bold">
                threads {" | "}
              </Link>
              <Link to="/comments" className="[&.active]:font-bold">
                comments {" | "}
              </Link>
              <Link to="/submit" className="[&.active]:font-bold">
                submit
              </Link>
              <h2>{user?.given_name}</h2>
              <p>{user?.family_name}</p>
            </div>
            <hr />
            <Outlet />
          </>
        ) : (
          <button onClick={() => login()} type="button">
            Sign In
          </button>
        )}
      </>
    );
  },
});

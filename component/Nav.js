import { UserContext } from "../context";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { Router, useRouter } from "next/router";
import { Avatar } from "antd";
const Nav = () => {
  const [current, setcurrent] = useState("");
  const router = useRouter();
  const [state, setState] = useContext(UserContext);
  useEffect(() => {
    process.browser && setcurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);
  const logout = () => {
    window.localStorage.removeItem("ath");
    setState(null);
    router.push("/login");
  };
  return (
    <nav className="nav bg-dark d-flex justify-content-between an ">
      <Link href="/">
        <a className={`nav-link text-light ${current === "/" && "active"}`}>
         <Avatar src="/images/img2.png"/> MERN_CAMP
        </a>
      </Link>

     

      {state !== null ? (
        <>
        <div className="dropdown">
        <button
          className="btn  dropdown-toggle text-light"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
           {state && state.user && state.user.name}
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li>
          <Link href="/user/dashbord">
            <a
              className={`nav-link dropdown-item bg-dark text-light ${
                current === "/user/dashbord" && "active"
              }`}
            >
             Dashbord
            </a>
          </Link>
          </li>
          <li>
          <Link href="/user/profile/update">
            <a
              className={`nav-link dropdown-item   bg-white text-dark ${
                current === "/user/dashbord" && "active"
              }`}
            >
            Profile
            </a>
          </Link>
          </li>
          {state.user.role=== "Admin"&&(
            <li>
          <Link href="/admin">
            <a
              className={`nav-link dropdown-item   bg-white text-dark ${
                current === "/admin" && "active"
              }`}
            >
            admin
            </a>
          </Link>
          </li>
          )}
          <li>
          <a onClick={logout} className={`nav-link  text-dark ` }>
            logout
          </a>
          </li>
         
        </ul>
      </div>
      </>
      ) : (
        <>
          <Link href="/login">
            <a
              className={`nav-link text-light  ${
                current === "/login" && "active"
              }`}
            >
              login
            </a>
          </Link>

          <Link href="/ragister">
            <a
              className={`nav-link  text-light ${
                current === "/ragister" && "active"
              }`}
            >
              ragister
            </a>
          </Link>
        </>
      )}

   </nav> 
  );
};
export default Nav;

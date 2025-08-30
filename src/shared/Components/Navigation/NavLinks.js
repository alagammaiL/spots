import "./NavLinks.css";
import { NavLink } from "react-router-dom";
import { Authcontext } from "../Context/Auth-Context";
import { useContext } from "react";
import Button from "../FormElements/Button";
import { useNavigate } from "react-router-dom";
export default function NavLinks() {
  const { isLogin, logout, userId } = useContext(Authcontext);
  const navigate = useNavigate();
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/">All Users</NavLink>
      </li>
      {isLogin && (
        <li>
          <NavLink to={`/${userId}/places`}>My Places</NavLink>
        </li>
      )}
      {isLogin && (
        <li>
          <NavLink to="/places/new">Add Places</NavLink>
        </li>
      )}
      {!isLogin && (
        <li>
          <NavLink to="authentication">Authenticate</NavLink>
        </li>
      )}
      {isLogin && (
        <li>
          <button
            onClick={() => {
              logout();
              navigate("/authentication");
            }}
          >
            Logout
          </button>
        </li>
      )}
    </ul>
  );
}

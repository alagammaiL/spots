import "./MainNavigation.css";
import MainHeader from "./MainHeader";
import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import { useState } from "react";
import Backdrop from "../UIElements/Backdrop";
export default function MainNavigation() {
  const [drawerIsOpen, setDrawer] = useState(false);
  function closeDrawer() {
    setDrawer(false);
  }
  return (
    <>
      {drawerIsOpen && (
        <>
          <Backdrop onClick={closeDrawer} />
          <SideDrawer>
            <nav className="main-navigation__drawer-nav">
              <NavLinks />
            </nav>
          </SideDrawer>
        </>
      )}

      <MainHeader>
        <button
          className="main-navigation__menu-btn"
          onClick={() => setDrawer(true)}
        >
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">
          <Link>Your places</Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </>
  );
}

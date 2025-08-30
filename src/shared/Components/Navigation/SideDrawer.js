import "./SideDrawer.css";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
export default function SideDrawer(props) {
  return createPortal(
    <>
      <motion.aside
        className="side-drawer"
        initial={{ opacity: 0, x: -250 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, type: "tween" }}
      >
        {props.children}
      </motion.aside>
    </>,
    document.getElementById("drawer-hook")
  );
}

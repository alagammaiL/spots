import "../UIElements/Modal.css";
import { createPortal } from "react-dom";
import Backdrop from "./Backdrop";
import { motion } from "framer-motion";
function ModalOverlay(props) {
  return createPortal(
    <div className={`modal ${props.className}`} style={props.style}>
      <header className={`modal__header ${props.headerClass}`}>
        <h2>{props.header}</h2>
      </header>
      <form
        onSubmit={
          props.onSubmit ? props.onSubmit : (event) => event.preventDefault()
        }
      >
        <div className={`modal__content ${props.contentClass}`}>
          {props.children}
        </div>
      </form>
      <footer className={`modal__footer ${props.footerClass}`}>
        {props.footer}
      </footer>
    </div>,
    document.getElementById("modal-map")
  );
}
export default function Modal(props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -120 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, type: "tween" }}
      exit={{ opacity: 0, y: -20 }}
    >
      {props.show && <Backdrop onClick={props.onCancel} />}
      <ModalOverlay {...props} />
    </motion.div>
  );
}

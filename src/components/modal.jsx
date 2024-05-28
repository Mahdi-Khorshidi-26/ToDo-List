/* eslint-disable react/prop-types */
import Classes from "./modal.module.css";
export default function Modal({ children }) {
  return (
    <div className={Classes.modal}>
      <div className={Classes.child}>{children}</div>
    </div>
  );
}

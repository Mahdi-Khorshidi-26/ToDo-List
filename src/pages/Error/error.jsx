/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import Classes from "./error.module.css";
export default function Error({
  message = "Oops SomeThing Went Wrong !!!! 😥",
}) {
  return (
    <div className={Classes.message}>
      <div>
        <h1>{message}</h1>
        <p>try again later</p>
        <Link to={"/"} className={Classes.homeBtn}>
          ⬅️Home
        </Link>
      </div>
    </div>
  );
}

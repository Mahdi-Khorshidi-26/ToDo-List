/* eslint-disable react/prop-types */
import { useContext } from "react";
import ToDoList from "../../components/toDoList";
import { ToDoContext } from "../store/toDoContext";
import Classes from "./done.module.css";
export default function Done() {
  const { state } = useContext(ToDoContext);
  let doneList = state.filter((item) => {
    return item.status === "done";
  });
  return (
    <>
      {doneList.length <= 0 ? (
        <div className={Classes.emptyList}>there is noting to show 📋</div>
      ) : (
        <ToDoList toDoTasks={doneList} />
      )}
    </>
  );
}

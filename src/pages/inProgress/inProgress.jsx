/* eslint-disable react/prop-types */
import Classes from "./inProgress.module.css";
import ToDoList from "../../components/toDoList";
import { useContext } from "react";
import { ToDoContext } from "../store/toDoContext";
export default function InProgress() {
  const { state } = useContext(ToDoContext);
  let inProgressList = state.filter((item) => {
    return item.status === "inProgress";
  });
  return (
    <>
      {inProgressList.length <= 0 ? (
        <div className={Classes.emptyList}>there is noting to show 📋</div>
      ) : (
        <ToDoList toDoTasks={inProgressList} />
      )}
    </>
  );
}

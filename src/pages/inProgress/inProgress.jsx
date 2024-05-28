/* eslint-disable react/prop-types */
import { ToDoList } from "../../components/toDoList";
export default function InProgress({ toDos }) {
  let inProgressList = toDos.filter((item) => {
    return item.status === "inProgress";
  });
  return (
    <div>
      <ToDoList toDos={inProgressList} />
    </div>
  );
}

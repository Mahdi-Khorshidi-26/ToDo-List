/* eslint-disable react/prop-types */
import { ToDoList } from "../../components/toDoList";
export default function Done({ toDos }) {
  let doneList = toDos.filter((item) => {
    return item.status === "done";
  });
  return (
    <div>
      <ToDoList toDos={doneList} />
    </div>
  );
}

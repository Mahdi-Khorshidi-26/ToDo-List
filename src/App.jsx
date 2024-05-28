/* eslint-disable react/prop-types */
import ToDoInput from "./pages/todoInput/todoInput";
import ToDoList from "./components/toDoList";

export default function App() {
  return (
    <div>
      <ToDoInput />
      <ToDoList />
    </div>
  );
}

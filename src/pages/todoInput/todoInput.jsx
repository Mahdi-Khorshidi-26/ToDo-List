/* eslint-disable react/prop-types */
import Classes from "./todoInput.module.css";
import { useContext } from "react";
import { ToDoContext } from "../store/toDoContext";
export default function ToDoInput() {
  const {
    todo,
    handleSubmitForm,
    setTodo,
    select,
    setSelect,
    refInput,
    showInput,
    setShowInput,
    buttonFlag,
    handleEditTodo,
  } = useContext(ToDoContext);

  function handleShow() {
    setShowInput((pervShow) => !pervShow);
  }
  return (
    <div className={Classes.inputWrapper}>
      <form
        className={Classes.form}
        onSubmit={buttonFlag ? handleEditTodo : handleSubmitForm}
      >
        {!buttonFlag && (
          <button className={Classes.addBtn} onClick={handleShow}>
            Add
          </button>
        )}
        <input
          ref={refInput}
          type="text"
          placeholder="ADD TODOs..."
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          required={todo}
          className={Classes.todoInput}
          style={
            showInput
              ? { opacity: "1", transition: "all 0.2s" }
              : { opacity: "0", transition: "all 0.2s" }
          }
        />
        <select
          name="actions"
          className={Classes.actionSelect}
          value={select}
          onChange={(e) => setSelect(e.target.value)}
        >
          <option value="all">All</option>
          <option value="inProgress">InProgress</option>
          <option value="done">Done</option>
        </select>
      </form>
    </div>
  );
}

/* eslint-disable react/prop-types */
import { IoMdDoneAll } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { GrInProgress } from "react-icons/gr";
import { FaRegEdit } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";
import { useContext } from "react";
import { ToDoContext } from "../pages/store/toDoContext";
import Classes from "./toDoList.module.css";
export default function ToDoList({ toDoTasks = [] }) {
  const {
    state,
    handleEditTodo,
    handleDeleteTodo,
    handleDoneTodo,
    handleInProgressTodo,
    handleNoneTodo,
    buttonFlag,
    setButtonFlag,
  } = useContext(ToDoContext);
  let toDos = toDoTasks.length > 0 ? toDoTasks : state;
  let url = window.location.href;
  let separatedUrl = url.split("/").at(-1);
  return (
    <ul className={Classes.todoList}>
      {toDos.length <= 0 && (
        <div className={Classes.emptyList}>there is noting to show 📋</div>
      )}
      {toDos.map((todoItem) => {
        return (
          <Item
            key={todoItem.id}
            todoItem={todoItem}
            onActionDeleteClick={handleDeleteTodo}
            onActionDoneClick={handleDoneTodo}
            onActionInProgressClick={handleInProgressTodo}
            onActionEditClick={handleEditTodo}
            onActionNoneClick={handleNoneTodo}
            buttonFlag={buttonFlag}
            setButtonFlag={setButtonFlag}
            separatedUrl={separatedUrl}
          />
        );
      })}
    </ul>
  );
}

function Item({
  todoItem,
  onActionDeleteClick,
  onActionDoneClick,
  onActionInProgressClick,
  onActionEditClick,
  onActionNoneClick,
  separatedUrl,
}) {
  return (
    <li className={Classes.todoItem}>
      <div className={Classes.itemInfoWrapper}>
        <div className={Classes.task}>
          <span>
            <span className={Classes.mainTitle}>task : </span>
            {todoItem.todo}
          </span>
        </div>
        <div className={Classes.description}>
          <span>
            <span className={Classes.title}>Created At : </span>
            {todoItem.date}
          </span>
          {todoItem.editDate && (
            <span>
              <span className={Classes.title}>Edited At : </span>
              {todoItem.editDate}
            </span>
          )}
        </div>
      </div>
      <section className={Classes.todoMenuList}>
        <ul className={Classes.actionsMenu}>
          {separatedUrl === "" && (
            <li className={Classes.actionItemEdit}>
              {todoItem.isGettingEdited ? (
                <GiConfirmed
                  onClick={() => {
                    onActionEditClick(todoItem.id);
                    todoItem.isGettingEdited = false;
                  }}
                />
              ) : (
                <FaRegEdit onClick={() => onActionEditClick(todoItem.id)} />
              )}
            </li>
          )}

          <li className={Classes.actionItemDone}>
            <IoMdDoneAll
              onClick={() => onActionDoneClick(todoItem.id)}
              style={todoItem.status === "done" ? { color: "green" } : ""}
            />
          </li>
          <li className={Classes.actionItemDelete}>
            <MdDeleteForever onClick={() => onActionDeleteClick(todoItem.id)} />
          </li>
          <li className={Classes.actionItemInProgress}>
            <GrInProgress
              onClick={() => onActionInProgressClick(todoItem.id)}
              style={
                todoItem.status === "inProgress"
                  ? { color: "darkolivegreen" }
                  : ""
              }
            />
          </li>
        </ul>
        <div
          className={Classes.statusWrapper}
          onClick={() => onActionNoneClick(todoItem.id)}
        >
          <span className={Classes.status}>
            {todoItem.status === "done" && "status : 🥳"}
            {todoItem.status === "none" && "status : 😕"}
            {todoItem.status === "inProgress" && "status : ⏳"}
          </span>
        </div>
      </section>
    </li>
  );
}

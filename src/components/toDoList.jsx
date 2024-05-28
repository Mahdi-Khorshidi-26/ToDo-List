/* eslint-disable react/prop-types */
import { IoMdDoneAll } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { GrInProgress } from "react-icons/gr";
import { FaRegEdit } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";

import Classes from "./toDoList.module.css";
export function ToDoList({
  toDos,
  onActionDeleteClick,
  onActionDoneClick,
  onActionInProgressClick,
  onActionEditClick,
  onActionNoneClick,
  buttonFlag,
  setButtonFlag,
}) {
  return (
    <ul className={Classes.todoList}>
      {toDos.map((todoItem) => {
        return (
          <Item
            key={todoItem.id}
            todoItem={todoItem}
            onActionDeleteClick={onActionDeleteClick}
            onActionDoneClick={onActionDoneClick}
            onActionInProgressClick={onActionInProgressClick}
            onActionEditClick={onActionEditClick}
            onActionNoneClick={onActionNoneClick}
            buttonFlag={buttonFlag}
            setButtonFlag={setButtonFlag}
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

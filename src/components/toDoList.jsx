/* eslint-disable react/prop-types */
import { IoMdDoneAll } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { GrInProgress } from "react-icons/gr";
import { FaRegEdit } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";
import { useContext } from "react";
import { ToDoContext } from "../pages/store/toDoContext";
import Classes from "./toDoList.module.css";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
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
    select,
    changeTheOrderOfElements,
  } = useContext(ToDoContext);
  let toDos = toDoTasks.length > 0 ? toDoTasks : state;
  let url = window.location.href;
  let separatedUrl = url.split("/").at(-1);
  function dropDragHandler(result) {
    const { source, destination, type } = result;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }
    if (type === "group" && select === "all") {
      const reOrdered = [...toDos];
      const sourceIndex = source.index;
      const [removeState] = reOrdered.splice(sourceIndex, 1);
      const destinationIndex = destination.index;
      reOrdered.splice(destinationIndex, 0, removeState);
      changeTheOrderOfElements(reOrdered);
    }
  }
  return (
    <DragDropContext onDragEnd={dropDragHandler}>
      <ul className={Classes.todoList}>
        {toDos.length <= 0 && (
          <div className={Classes.emptyList}>there is noting to show 📋</div>
        )}
        <Droppable droppableId="ROOT" type="group">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {toDos.map((todoItem, index) => {
                return (
                  <Draggable
                    key={todoItem.id}
                    draggableId={String(todoItem.id)}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                      >
                        <Item
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
                      </div>
                    )}
                  </Draggable>
                );
              })}
            </div>
          )}
        </Droppable>
      </ul>
    </DragDropContext>
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
    <li className={Classes.todoItem} style={{ width: "100%", margin: "1rem" }}>
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
        {separatedUrl === "" && (
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
              <MdDeleteForever
                onClick={() => onActionDeleteClick(todoItem.id)}
              />
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
        )}

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

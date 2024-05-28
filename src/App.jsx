/* eslint-disable react/prop-types */
import ToDoInput from "./pages/todoInput/todoInput";
// import Classes from "./app.module.css";
import { useReducer, useRef, useState } from "react";
import { ToDoList } from "./components/toDoList";
import { todoListDummyData } from "./components/initialData";

function reducer(state, action) {
  switch (action.type) {
    case "addToList":
      return [
        {
          todo: action.payLoad,
          status: "none",
          id: Date.now(),
          date: new Date().toLocaleString(Date.now()),
        },
        ...state,
      ];

    case "removeFromList":
      return [...action.payLoad];
    case "changeStatus":
      return [...action.payLoad];
    default:
      return "NO ACTION GOT EXECUTED";
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, todoListDummyData);
  const [todo, setTodo] = useState("");
  const [select, setSelect] = useState("all");
  const [showInput, setShowInput] = useState(false);
  const [buttonFlag, setButtonFlag] = useState(false);
  const refInput = useRef();

  function handleSubmitForm(e) {
    e.preventDefault();
    refInput.current.focus();
    if (!todo) {
      return;
    }
    setTodo(e.target.value);
    dispatch({ type: "addToList", payLoad: todo });
    setTodo("");
  }
  function handleEditTodo(id) {
    setShowInput((show) => !show);
    setButtonFlag((flag) => !flag);
    let newList = [...state];
    for (let item of newList) {
      if (item.id === id) {
        setTodo(item.todo);
        if (item.todo !== todo) {
          item.isGettingEdited = true;
          item.todo = todo;
          item.editDate = new Date().toLocaleString(Date.now());
        }
      }
    }
    dispatch({ type: "changeStatus", payLoad: newList });
  }
  function handleDeleteTodo(id) {
    let newList = state.filter((item) => {
      return item.id !== id;
    });
    dispatch({ type: "removeFromList", payLoad: newList });
  }
  function handleDoneTodo(id) {
    let newList = [...state];
    for (let item of newList) {
      if (item.id === id) {
        item.status = "done";
      }
    }
    dispatch({ type: "changeStatus", payLoad: newList });
  }
  function handleInProgressTodo(id) {
    let newList = [...state];
    for (let item of newList) {
      if (item.id === id) {
        item.status = "inProgress";
      }
    }
    dispatch({ type: "changeStatus", payLoad: newList });
  }

  function handleNoneTodo(id) {
    let newList = [...state];
    for (let item of newList) {
      if (item.id === id) {
        item.status = "none";
      }
    }
    dispatch({ type: "changeStatus", payLoad: newList });
  }
  let inProgressList = state.filter((item) => {
    return item.status === "inProgress";
  });
  let doneList = state.filter((item) => {
    return item.status === "done";
  });
  return (
    <div>
      <ToDoInput
        todo={todo}
        handleSubmitForm={handleSubmitForm}
        setTodo={setTodo}
        select={select}
        setSelect={setSelect}
        refInput={refInput}
        showInput={showInput}
        setShowInput={setShowInput}
        buttonFlag={buttonFlag}
        handleEditTodo={handleEditTodo}
      />
      {select === "all" && (
        <ToDoList
          toDos={state}
          onActionDeleteClick={handleDeleteTodo}
          onActionDoneClick={handleDoneTodo}
          onActionEditClick={handleEditTodo}
          onActionInProgressClick={handleInProgressTodo}
          onActionNoneClick={handleNoneTodo}
          buttonFlag={buttonFlag}
          setButtonFlag={setButtonFlag}
        />
      )}
      {select === "inProgress" && (
        <ToDoList
          toDos={inProgressList}
          onActionDeleteClick={handleDeleteTodo}
          onActionDoneClick={handleDoneTodo}
          onActionEditClick={handleEditTodo}
          onActionInProgressClick={handleInProgressTodo}
          onActionNoneClick={handleNoneTodo}
          buttonFlag={buttonFlag}
          setButtonFlag={setButtonFlag}
        />
      )}
      {select === "done" && (
        <ToDoList
          toDos={doneList}
          onActionDeleteClick={handleDeleteTodo}
          onActionDoneClick={handleDoneTodo}
          onActionEditClick={handleEditTodo}
          onActionInProgressClick={handleInProgressTodo}
          onActionNoneClick={handleNoneTodo}
          buttonFlag={buttonFlag}
          setButtonFlag={setButtonFlag}
        />
      )}
    </div>
  );
}

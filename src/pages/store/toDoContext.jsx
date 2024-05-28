/* eslint-disable react/prop-types */
import { createContext, useState, useReducer, useRef } from "react";
import { todoListDummyData } from "../../components/initialData";
export const ToDoContext = createContext({
  state: [],
  handleSubmitForm: () => {},
  handleEditTodo: () => {},
  handleDeleteTodo: () => {},
  handleDoneTodo: () => {},
  handleInProgressTodo: () => {},
  handleNoneTodo: () => {},
  buttonFlag: false,
  setButtonFlag: () => {},
});

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

export default function ToDoContextStateManger({ children }) {
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

  const ctx = {
    state:
      select === "all"
        ? state
        : select === "inProgress"
        ? inProgressList
        : select === "done"
        ? doneList
        : [],
    handleSubmitForm,
    handleEditTodo,
    handleDeleteTodo,
    handleDoneTodo,
    handleInProgressTodo,
    handleNoneTodo,
    buttonFlag,
    setButtonFlag,
    todo,
    setTodo,
    select,
    setSelect,
    refInput,
    showInput,
    setShowInput,
  };

  return <ToDoContext.Provider value={ctx}>{children}</ToDoContext.Provider>;
}

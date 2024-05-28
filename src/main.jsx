import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routes.jsx";
import ToDoContextStateManger from "./pages/store/toDoContext.jsx";

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ToDoContextStateManger>
      <RouterProvider router={router} />
    </ToDoContextStateManger>
  </React.StrictMode>
);

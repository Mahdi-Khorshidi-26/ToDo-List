import App from "./App";
import Done from "./pages/done/done";
import InProgress from "./pages/inProgress/inProgress";
import RootLayout from "./pages/rootLayout/rootLayout";
import { todoListDummyData } from "./components/initialData";
import Error from "./pages/Error/error";
export const routes = [
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "inProgress",
        element: <InProgress toDos={todoListDummyData} />,
      },
      { path: "done", element: <Done toDos={todoListDummyData} /> },
    ],
  },
];

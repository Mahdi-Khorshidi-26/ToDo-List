import App from "./App";
import Done from "./pages/done/done";
import InProgress from "./pages/inProgress/inProgress";
import RootLayout from "./pages/rootLayout/rootLayout";
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
        element: <InProgress />,
      },
      { path: "done", element: <Done /> },
    ],
  },
];

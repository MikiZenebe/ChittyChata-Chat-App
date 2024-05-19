import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Email, Home, Password, Register } from "../pages";
import { Message } from "../components";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "email",
        element: <Email />,
      },
      {
        path: "password",
        element: <Password />,
      },
      {
        path: "",
        element: <Home />,
        children: [
          {
            path: ":userId",
            element: <Message />,
          },
        ],
      },
    ],
  },
]);

export default router;

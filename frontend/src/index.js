import React from "react";
import ReactDOM from "react-dom/client";
import Main from "./pages/Main/Main";
import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";
import "./assets/style.css";
import { RouterProvider, createHashRouter } from "react-router-dom";
import NewReport from "./pages/Main/NewReport/Newreport";
import Contact from "./components/Contact/Contact";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import { LanguageProvider } from "./hooks/LanguageProvider";
const router = createHashRouter([
  {
    path: "/",
    element: (
      <>
        <Main />
      </>
    ),
    children: [
      {
        path: "/newReport",
        element: <NewReport />,
      },
      {
        path: "/Contact",
        element: <Contact />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/registration",
    element: <Registration />,
  },
  {
    path: "/ForgotPassword",
    element: <ForgotPassword />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <LanguageProvider>
    <RouterProvider router={router} />
  </LanguageProvider>
);

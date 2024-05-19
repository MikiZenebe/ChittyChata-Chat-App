import { Email, Home, Password, Register } from "./pages";
import { Message } from "./components";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "./layout/index";

export default function App() {
  return (
    <>
      <Routes>
        <Route
          path="/register"
          element={
            <AuthLayout>
              <Register />
            </AuthLayout>
          }
        />
        <Route
          path="/email"
          element={
            <AuthLayout>
              <Email />
            </AuthLayout>
          }
        />{" "}
        <Route
          path="/password"
          element={
            <AuthLayout>
              <Password />
            </AuthLayout>
          }
        />
        <Route path="/" element={<Home />} />
        <Route path="/:userId" element={<Message />} />
      </Routes>
    </>
  );
}

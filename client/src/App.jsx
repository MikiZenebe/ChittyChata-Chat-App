import { Email, Home, Password, Register } from "./pages";
import { Message } from "./components";
import { Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/email" element={<Email />} />{" "}
        <Route path="/password" element={<Password />} />
        <Route path="/" element={<Home />} />
        <Route path="/:userId" element={<Message />} />
      </Routes>
    </>
  );
}

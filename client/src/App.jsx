import { Route, Routes } from "react-router-dom";
import { Chat, Login, Register } from "./pages";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/register" element={<Register />} />{" "}
        <Route path="/login" element={<Login />} />{" "}
        <Route path="/" element={<Chat />} />
      </Routes>
    </div>
  );
}

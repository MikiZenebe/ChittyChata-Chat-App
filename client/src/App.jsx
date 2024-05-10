import { Route, Routes } from "react-router-dom";
import { Chat, Login, Register, SetAvatar } from "./pages";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/register" element={<Register />} />{" "}
        <Route path="/login" element={<Login />} />{" "}
        <Route path="/setAvatar" element={<SetAvatar />} />
        <Route path="/" element={<Chat />} />
      </Routes>
    </div>
  );
}

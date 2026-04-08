import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./components/Login";
import { Postos } from "./components/Postos";
import { PostoUsuario } from "./components/Dashboard";
import { PostoAdmin } from "./components/Admin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/posto/:id" element={<PostoUsuario />} />
        <Route path="/admin/posto/:id" element={<PostoAdmin />} />
        <Route path="/postos" element={<Postos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
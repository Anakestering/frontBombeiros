import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Logo1.png";
import fundo from "../assets/fundo.jpg"; 

export function Login() {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();

    if (usuario === "admin" && senha === "123") {
      localStorage.setItem("tipo", "admin");
      navigate("/postos");
    } else if (usuario === "usuario" && senha === "123") {
      localStorage.setItem("tipo", "usuario");
      navigate("/postos");
    } else {
      setErro("Usuário ou senha inválidos");
    }
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden">

      {/* 🖼️ IMAGEM DE FUNDO */}
      <img
        src={fundo}
        alt="Fundo"
        className="absolute w-full h-full object-cover"
      />

      {/* 🌫️ CAMADA DE BLUR */}
      <div className="absolute w-full h-full backdrop-blur-sm bg-black/30"></div>

      {/* 🧊 CARD FLUTUANTE */}
      <div className="relative z-10 flex items-center justify-center h-full px-4">

        <div className="w-full max-w-sm bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-2xl">

          {/* LOGO */}
          <div className="flex flex-col items-center mb-6">
            <img 
              src={logo} 
              alt="Logo"
              className="w-24 h-24 object-contain mb-2 drop-shadow-lg"
            />

            <p className="text-gray-600 text-sm">
              Acesso restrito
            </p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">

            <input
              type="text"
              placeholder="Usuário"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <button className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-lg font-semibold transition">
              Entrar
            </button>

            {erro && (
              <p className="text-red-500 text-sm text-center">{erro}</p>
            )}
          </form>

        </div>

      </div>
    </div>
  );
}
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Login() {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();

    if (usuario === "admin" && senha === "123") {
      localStorage.setItem("tipo", "admin");
      navigate("/admin");
    } else if (usuario === "usuario" && senha === "123") {
      localStorage.setItem("tipo", "usuario");
      navigate("/dashboard");
    } else {
      setErro("Usuário ou senha inválidos");
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-blue-500 to-blue-700">

      <div className="bg-white p-8 rounded-2xl shadow-2xl w-80">

        {/* Ícone + título */}
        <div className="flex flex-col items-center mb-6">
          <div className="text-5xl">🛟</div>
          <h2 className="text-2xl font-bold text-gray-800 mt-2">
            Sistema Salva-Vidas
          </h2>
          <p className="text-gray-500 text-sm">
            Acesso restrito
          </p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">

          <input
            type="text"
            placeholder="Usuário"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-lg font-semibold transition">
            Entrar
          </button>

          {erro && (
            <p className="text-red-500 text-sm text-center">{erro}</p>
          )}
        </form>

      </div>
    </div>
  );
}
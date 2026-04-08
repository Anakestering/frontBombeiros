import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../assets/Logo1.png";
import fundo from "../assets/fundo.jpg";

export function Postos() {
  const navigate = useNavigate();
  const tipo = localStorage.getItem("tipo");

  const [statusPostos, setStatusPostos] = useState({});

  const postos = Array.from({ length: 21 }, (_, i) => ({
    id: i + 1,
    nome: `Posto ${i + 1}`
  }));

  function acessarPosto(id) {
    if (tipo === "admin") {
      navigate(`/admin/posto/${id}`);
    } else {
      navigate(`/posto/${id}`);
    }
  }

  // 🔄 carregar status dos postos
  useEffect(() => {
    function carregarStatus() {
      const novosStatus = {};

      postos.forEach((posto) => {
        const dados = JSON.parse(localStorage.getItem(`posto_${posto.id}`));

        novosStatus[posto.id] = {
          checkin: dados?.checkinFotos?.length > 0,
          checkout: dados?.checkoutFinalizado === true
        };
      });

      setStatusPostos(novosStatus);
    }

    carregarStatus();

    const intervalo = setInterval(carregarStatus, 1500);

    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className="relative h-screen w-screen overflow-hidden">

      {/* FUNDO */}
      <img
        src={fundo}
        alt="Fundo"
        className="absolute w-full h-full object-cover"
      />

      <div className="absolute w-full h-full backdrop-blur-sm bg-black/30"></div>

      {/* CONTEÚDO */}
      <div className="relative z-10 flex flex-col h-full">

        {/* HEADER */}
        <div className="flex justify-center items-center p-4">
          <img src={logo} alt="Logo" className="w-20 h-20" />
        </div>

        {/* LISTA */}
        <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-3">

          {postos.map((posto) => {
            const status = statusPostos[posto.id] || {};

            return (
              <div
                key={posto.id}
                onClick={() => acessarPosto(posto.id)}
                className="bg-white/90 p-4 rounded-xl shadow flex justify-between items-center cursor-pointer active:scale-95 transition"
              >
                {/* Nome */}
                <h2 className="text-lg font-medium text-gray-800">
                  {posto.nome}
                </h2>

                {/* STATUS */}
                <div className="flex gap-3">

                  {/* CHECK-IN */}
                  <div
                    className={`w-4 h-4 rounded-full ${
                      status.checkin ? "bg-green-500" : "bg-red-500"
                    }`}
                  ></div>

                  {/* CHECKOUT */}
                  <div
                    className={`w-4 h-4 rounded-full ${
                      status.checkout ? "bg-green-500" : "bg-red-500"
                    }`}
                  ></div>

                </div>
              </div>
            );
          })}

        </div>
      </div>
    </div>
  );
}
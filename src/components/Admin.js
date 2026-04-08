import { useParams, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

export function PostoAdmin() {
  const { id } = useParams();
  const tipo = localStorage.getItem("tipo");

  const [dados, setDados] = useState(null);

  useEffect(() => {
    function carregarDados() {
      const dadosSalvos = JSON.parse(localStorage.getItem(`posto_${id}`));
      setDados(dadosSalvos);
    }

    carregarDados(); // primeira carga

    const intervalo = setInterval(carregarDados, 1500); // atualiza rápido

    return () => clearInterval(intervalo);
  }, [id]);

  if (tipo !== "admin") {
    return <Navigate to="/postos" />;
  }

  if (!dados) {
    return <p className="p-4">Nenhum dado ainda</p>;
  }

  const r = dados.relatorio || {};

  return (
    <div className="p-4 space-y-4">

      <h1 className="text-xl font-bold">Admin - Posto {id}</h1>

      {/* STATUS */}
      <div className={`p-2 rounded text-white text-center ${
        dados.checkoutFinalizado ? "bg-green-500" : "bg-yellow-500"
      }`}>
        {dados.checkoutFinalizado ? "Finalizado" : "Em andamento"}
      </div>

      {/* CHECK-IN */}
      <div>
        <p className="font-semibold">Check-in</p>
        <div className="flex gap-2 flex-wrap">
          {dados.checkinFotos?.map((f, i) => (
            <img key={i} src={f} className="w-20 h-20 rounded object-cover" />
          ))}
        </div>
      </div>

      {/* RELATÓRIO */}
      <div>
        <p className="font-semibold">Relatório</p>
        <p>🌅 Manhã - Prev: {r.manhaPrevencoes || 0}</p>
        <p>🌅 Manhã - Ataques: {r.manhaAtaques || 0}</p>
        <p>🌇 Tarde - Prev: {r.tardePrevencoes || 0}</p>
        <p>🌇 Tarde - Ataques: {r.tardeAtaques || 0}</p>
      </div>

      {/* CHECKOUT */}
      <div>
        <p className="font-semibold">Checkout</p>
        <div className="flex gap-2 flex-wrap">
          {dados.checkoutFotos?.map((f, i) => (
            <img key={i} src={f} className="w-20 h-20 rounded object-cover" />
          ))}
        </div>
      </div>

    </div>
  );
}
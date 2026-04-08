import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export function PostoUsuario() {
  const { id } = useParams();

  const [checkinFotos, setCheckinFotos] = useState([]);
  const [checkoutFotos, setCheckoutFotos] = useState([]);
  const [checkinFinalizado, setCheckinFinalizado] = useState(false);
  const [checkoutFinalizado, setCheckoutFinalizado] = useState(false);

  const [relatorio, setRelatorio] = useState({
    manhaPrevencoes: "",
    manhaAtaques: "",
    tardePrevencoes: "",
    tardeAtaques: ""
  });

  useEffect(() => {
    const dados = JSON.parse(localStorage.getItem(`posto_${id}`));

    if (dados) {
      setCheckinFotos(dados.checkinFotos || []);
      setCheckoutFotos(dados.checkoutFotos || []);
      setRelatorio(dados.relatorio || relatorio);
      setCheckoutFinalizado(dados.checkoutFinalizado || false);
      setCheckinFinalizado(dados.checkinFinalizado || false);
    }
  }, [id]);

  function salvar(dadosAtualizados) {
    localStorage.setItem(`posto_${id}`, JSON.stringify(dadosAtualizados));
  }

  // 📸 ADICIONAR FOTO
  function adicionarFoto(e, tipo) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      if (tipo === "checkin") {
        if (checkinFotos.length >= 3) {
          alert("Máximo 3 fotos no check-in");
          return;
        }

        const novas = [...checkinFotos, reader.result];
        setCheckinFotos(novas);

        salvar({
          checkinFotos: novas,
          checkoutFotos,
          relatorio,
          checkoutFinalizado,
          checkinFinalizado
        });
      }

      if (tipo === "checkout") {
        if (checkoutFotos.length >= 3) {
          alert("Máximo 3 fotos no checkout");
          return;
        }

        const novas = [...checkoutFotos, reader.result];
        setCheckoutFotos(novas);

        salvar({
          checkinFotos,
          checkoutFotos: novas,
          relatorio,
          checkoutFinalizado,
          checkinFinalizado
        });
      }
    };

    reader.readAsDataURL(file);
  }

  // ✅ FINALIZAR CHECK-IN
  function realizarCheckin() {
    if (checkinFotos.length === 0) {
      alert("Adicione pelo menos 1 foto!");
      return;
    }

    setCheckinFinalizado(true);

    salvar({
      checkinFotos,
      checkoutFotos,
      relatorio,
      checkoutFinalizado,
      checkinFinalizado: true
    });

    alert("Check-in realizado com sucesso!");
  }

  // 📝 RELATÓRIO
  function handleChange(e) {
    const { name, value } = e.target;

    setRelatorio((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  function salvarRelatorio() {
    salvar({
      checkinFotos,
      checkoutFotos,
      relatorio,
      checkoutFinalizado,
      checkinFinalizado
    });

    alert("Relatório salvo!");
  }

  // 🚪 CHECKOUT
  function finalizarCheckout() {
    if (!checkinFinalizado) {
      alert("Faça o check-in primeiro!");
      return;
    }

    const r = relatorio;

    if (!r.manhaPrevencoes && !r.manhaAtaques && !r.tardePrevencoes && !r.tardeAtaques) {
      alert("Preencha o relatório!");
      return;
    }

    if (checkoutFotos.length === 0) {
      alert("Adicione pelo menos 1 foto no checkout!");
      return;
    }

    setCheckoutFinalizado(true);

    salvar({
      checkinFotos,
      checkoutFotos,
      relatorio,
      checkoutFinalizado: true,
      checkinFinalizado
    });

    alert("Checkout finalizado!");
  }

  return (
    <div className="p-4 space-y-6">

      <h1 className="text-xl font-bold">Posto {id}</h1>

      {/* 📸 CHECK-IN */}
      <div>
        <p className="font-semibold">Check-in</p>

        {!checkinFinalizado ? (
          <>
            <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={(e) => adicionarFoto(e, "checkin")}
            />

            <div className="flex gap-2 mt-2">
              {checkinFotos.map((f, i) => (
                <img key={i} src={f} className="w-20 h-20 rounded object-cover" />
              ))}
            </div>

            <button
              onClick={realizarCheckin}
              className="bg-blue-600 text-white p-3 rounded w-full mt-2"
            >
              Finalizar Check-in
            </button>
          </>
        ) : (
          <p className="text-green-600 font-semibold">
            Check-in realizado ✅
          </p>
        )}
      </div>

      {/* 📝 RELATÓRIO */}
      <div>
        <p className="font-semibold">Relatório</p>

        <input
          type="number"
          name="manhaPrevencoes"
          placeholder="Manhã - Prevenções"
          value={relatorio.manhaPrevencoes}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-1"
        />

        <input
          type="number"
          name="manhaAtaques"
          placeholder="Manhã - Ataques"
          value={relatorio.manhaAtaques}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-1"
        />

        <input
          type="number"
          name="tardePrevencoes"
          placeholder="Tarde - Prevenções"
          value={relatorio.tardePrevencoes}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-1"
        />

        <input
          type="number"
          name="tardeAtaques"
          placeholder="Tarde - Ataques"
          value={relatorio.tardeAtaques}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-2"
        />

        <button
          onClick={salvarRelatorio}
          className="bg-blue-500 text-white p-2 rounded w-full"
        >
          Salvar Relatório
        </button>
      </div>

      {/* 🚪 CHECKOUT */}
      <div>
        <p className="font-semibold">Checkout</p>

        <input
          type="file"
          accept="image/*"
          capture="environment"
          onChange={(e) => adicionarFoto(e, "checkout")}
        />

        <div className="flex gap-2 mt-2">
          {checkoutFotos.map((f, i) => (
            <img key={i} src={f} className="w-20 h-20 rounded object-cover" />
          ))}
        </div>

        <button
          onClick={finalizarCheckout}
          className="bg-green-600 text-white p-3 rounded w-full mt-2"
        >
          Finalizar Checkout
        </button>

        {checkoutFinalizado && (
          <p className="text-green-600 mt-2">Finalizado ✅</p>
        )}
      </div>

    </div>
  );
}
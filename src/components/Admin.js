export function Admin() {
  const tipo = localStorage.getItem("tipo");

  if (tipo !== "admin") {
    return <h1>Acesso negado</h1>;
  }

  return <h1>Área do Administrador</h1>;
}
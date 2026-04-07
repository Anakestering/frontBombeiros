export function Dashboard() {
  const tipo = localStorage.getItem("tipo");

  if (!tipo) {
    return <h1>Faça login primeiro</h1>;
  }

  return <h1>Área do Funcionário</h1>;
}
const API_URL = "http://127.0.0.1:8000";
 
// Função para carregar a lista de funcionários
async function loadFuncionarios() {
    const response = await fetch(`${API_URL}/funcionarios`);
    const funcionarios = await response.json();
    const funcionariosList = document.getElementById("funcionarios-list");
    funcionariosList.innerHTML = "";
 
    funcionarios.forEach(funcionario => {
        const li = document.createElement("li");
        li.innerHTML = `
<span>${funcionario.nome} (${funcionario.cargo})</span>
<button onclick="deactivateFuncionario(${funcionario.id})">Desativar</button>
        `;
        funcionariosList.appendChild(li);
    });
}
 
// Função para criar um novo funcionário
async function createFuncionario(event) {
    event.preventDefault();
 
    const nome = document.getElementById("nome").value;
    const cargo = document.getElementById("cargo").value;
 
    await fetch(`${API_URL}/funcionarios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, cargo })
    });
 
    document.getElementById("create-funcionario-form").reset();
    loadFuncionarios();
}
 
// Função para desativar um funcionário
async function deactivateFuncionario(id) {
    await fetch(`${API_URL}/funcionarios/${id}`, {
        method: "DELETE"
    });
    loadFuncionarios();
}
 
// Inicialização
document.getElementById("create-funcionario-form").addEventListener("submit", createFuncionario);
loadFuncionarios();
//Selecione os inputs e o formulario, e previne o submit do botão
document.querySelector('.form-cliente').addEventListener('submit', (evento) => {
    evento.preventDefault();

    //Cria objeto clientes e pega o valor
    const clientes = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value
    };
    
    //Validaçao e tirar os espaços
    if (!clientes.nome.trim() || !clientes.email.trim() || !clientes.telefone.trim()) {
        alert('Preencha todos os campos!');
        return;
    };

    //Envia a nova tarefa para a API (requisição POST)
    fetch('https://crudcrud.com/api/98669ddb6dc842a6907884cfff6e7ce8/clientes', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'             
        },
        body: JSON.stringify(clientes) 
    })
        .then(resposta => resposta.json())
        .then(() => {            
            document.getElementById('nome').value = "";
            document.getElementById('email').value = "";
            document.getElementById('telefone').value = "";

            carregarClientes();
        })
});

//Função para listar clientes no HTML
function listarClientes(clientes) {
    const divClientes = document.getElementById('lista-clientes');
    divClientes.innerHTML = '';

    clientes.forEach(cliente => {

        const novoCliente = document.createElement('div');
        novoCliente.textContent = `Nome: ${cliente.nome} | Email: ${cliente.email} | Telefone: ${cliente.telefone}`;

        const botao = document.createElement('button');
        botao.textContent = 'Excluir';
        botao.addEventListener('click', () => remove(cliente._id));

        const novaDiv = document.createElement('div');
        novaDiv.appendChild(novoCliente);
        novaDiv.appendChild(botao);
        divClientes.appendChild(novaDiv);
    });

};

//Função carregar clientes
function carregarClientes() {
    fetch('https://crudcrud.com/api/98669ddb6dc842a6907884cfff6e7ce8/clientes')
        .then(resposta => resposta.json())
        .then(clientes => listarClientes(clientes));
}

//Função que remove um cliente da API e do HTML
function remove(clienteID) {
    fetch(`https://crudcrud.com/api/98669ddb6dc842a6907884cfff6e7ce8/clientes/${clienteID}`, {
        method: 'DELETE'
    })
        .then(resposta => {
            if (resposta.ok) {
                carregarClientes();
            }
        });    
}

//Para que os clientes sejam carregados ao iniciar
carregarClientes();
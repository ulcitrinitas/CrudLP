let bebidas = JSON.parse(localStorage.getItem('bebidas')) || [];
let fornecedores = JSON.parse(localStorage.getItem('fornecedores')) || [];

document.getElementById('btnAddFornecedor').onclick = () => abrirModal('modalFornecedor');
document.getElementById('btnAddBebida').onclick = () => abrirModal('modalBebida');
document.getElementById('filter').onchange = exibirTabela;

function abrirModal(id) {
  document.getElementById(id).style.display = 'block';
}

function fecharModal(id) {
  document.getElementById(id).style.display = 'none';
}

function salvarFornecedor() {
  const nome = document.getElementById('fornecedorNome').value;
  const cnpj = document.getElementById('fornecedorCNPJ').value;
  const telefone = document.getElementById('fornecedorTelefone').value;
  const endereco = document.getElementById('fornecedorEndereco').value;

  if (!nome) return alert('Preencha o nome!');

  const novo = { id: Date.now(), nome, cnpj, telefone, endereco };
  fornecedores.push(novo);
  localStorage.setItem('fornecedores', JSON.stringify(fornecedores));

  fecharModal('modalFornecedor');
  exibirTabela();
}

function salvarBebida() {
  const nome = document.getElementById('bebidaNome').value;
  const qtde = document.getElementById('bebidaQtde').value;
  const preco = document.getElementById('bebidaPreco').value;
  const volume = document.getElementById('bebidaVolume').value;
  const marca = document.getElementById('bebidaMarca').value;
  const id_fornecedor = document.getElementById('bebidaFornecedor').value;

  if (!nome) return alert('Preencha o nome!');

  const nova = { id: Date.now(), nome, qtde, preco, volume, marca, id_fornecedor };
  bebidas.push(nova);
  localStorage.setItem('bebidas', JSON.stringify(bebidas));

  fecharModal('modalBebida');
  exibirTabela();
}

function excluir(id, tipo) {
  if (tipo === 'bebida') {
    bebidas = bebidas.filter(b => b.id !== id);
    localStorage.setItem('bebidas', JSON.stringify(bebidas));
  } else {
    fornecedores = fornecedores.filter(f => f.id !== id);
    localStorage.setItem('fornecedores', JSON.stringify(fornecedores));
  }
  exibirTabela();
}

function exibirTabela() {
  const filtro = document.getElementById('filter').value;
  let html = "<table><thead><tr>";

  if (filtro === 'bebidas') {
    html += "<th>ID</th><th>Nome</th><th>Qtde</th><th>Preço</th><th>Volume</th><th>Marca</th><th>ID Fornecedor</th><th>Ações</th></tr></thead><tbody>";
    bebidas.forEach(b => {
      html += `<tr>
        <td>${b.id}</td><td>${b.nome}</td><td>${b.qtde}</td>
        <td>${b.preco}</td><td>${b.volume}</td><td>${b.marca}</td><td>${b.id_fornecedor}</td>
        <td><button onclick="excluir(${b.id}, 'bebida')">Excluir</button></td>
      </tr>`;
    });
  } else if (filtro === 'fornecedores') {
    html += "<th>ID</th><th>Nome</th><th>CNPJ</th><th>Telefone</th><th>Endereço</th><th>Ações</th></tr></thead><tbody>";
    fornecedores.forEach(f => {
      html += `<tr>
        <td>${f.id}</td><td>${f.nome}</td><td>${f.cnpj}</td><td>${f.telefone}</td><td>${f.endereco}</td>
        <td><button onclick="excluir(${f.id}, 'fornecedor')">Excluir</button></td>
      </tr>`;
    });
  } else {
    html += "<th>ID Bebida</th><th>Nome Bebida</th><th>Marca</th><th>Fornecedor</th><th>CNPJ</th></tr></thead><tbody>";
    bebidas.forEach(b => {
      const forn = fornecedores.find(f => f.id == b.id_fornecedor);
      html += `<tr>
        <td>${b.id}</td><td>${b.nome}</td><td>${b.marca}</td>
        <td>${forn ? forn.nome : 'N/A'}</td><td>${forn ? forn.cnpj : '-'}</td>
      </tr>`;
    });
  }

  html += "</tbody></table>";
  document.getElementById('tabelaContainer').innerHTML = html;
}

// Carregar tabela inicial
exibirTabela();

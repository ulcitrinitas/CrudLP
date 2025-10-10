let bebidas = JSON.parse(localStorage.getItem('bebidas')) || [];
let fornecedores = JSON.parse(localStorage.getItem('fornecedores')) || [];

document.getElementById('btnAddFornecedor').onclick = () => abrirModalFornecedor();
document.getElementById('btnAddBebida').onclick = () => abrirModalBebida();
document.getElementById('filter').onchange = exibirTabela;

// ==== MODAIS ====
function abrirModalFornecedor(f = null) {
  document.getElementById('modalFornecedor').style.display = 'block';
  if (f) {
    document.getElementById('tituloFornecedor').innerText = 'Editar Fornecedor';
    document.getElementById('fornecedorId').value = f.id;
    document.getElementById('fornecedorNome').value = f.nome;
    document.getElementById('fornecedorCNPJ').value = f.cnpj;
    document.getElementById('fornecedorTelefone').value = f.telefone;
    document.getElementById('fornecedorEndereco').value = f.endereco;
  } else {
    document.getElementById('tituloFornecedor').innerText = 'Novo Fornecedor';
    document.querySelectorAll('#modalFornecedor input').forEach(i => i.value = '');
  }
}

function abrirModalBebida(b = null) {
  document.getElementById('modalBebida').style.display = 'block';

  // Preenche o select de fornecedores
  const select = document.getElementById('bebidaFornecedor');
  select.innerHTML = '<option value="">Selecione um fornecedor</option>';
  fornecedores.forEach(f => {
    const opt = document.createElement('option');
    opt.value = f.id;
    opt.textContent = f.nome;
    select.appendChild(opt);
  });

  if (b) {
    document.getElementById('tituloBebida').innerText = 'Editar Bebida';
    document.getElementById('bebidaId').value = b.id;
    document.getElementById('bebidaNome').value = b.nome;
    document.getElementById('bebidaQtde').value = b.qtde;
    document.getElementById('bebidaPreco').value = b.preco;
    document.getElementById('bebidaVolume').value = b.volume;
    document.getElementById('bebidaMarca').value = b.marca;
    document.getElementById('bebidaFornecedor').value = b.id_fornecedor;
  } else {
    document.getElementById('tituloBebida').innerText = 'Nova Bebida';
    document.querySelectorAll('#modalBebida input').forEach(i => i.value = '');
    select.value = '';
  }
}


function fecharModal(id) {
  document.getElementById(id).style.display = 'none';
}

// ==== SALVAR FORNECEDOR ====
function salvarFornecedor() {
  const id = document.getElementById('fornecedorId').value;
  const nome = document.getElementById('fornecedorNome').value;
  const cnpj = document.getElementById('fornecedorCNPJ').value;
  const telefone = document.getElementById('fornecedorTelefone').value;
  const endereco = document.getElementById('fornecedorEndereco').value;

  if (!nome) return alert('Preencha o nome!');

  if (id) {
    // Editar
    const index = fornecedores.findIndex(f => f.id == id);
    fornecedores[index] = { id: Number(id), nome, cnpj, telefone, endereco };
  } else {
    // Novo
    fornecedores.push({ id: Date.now(), nome, cnpj, telefone, endereco });
  }

  localStorage.setItem('fornecedores', JSON.stringify(fornecedores));
  fecharModal('modalFornecedor');
  exibirTabela();
}

// ==== SALVAR BEBIDA ====
function salvarBebida() {
  const id = document.getElementById('bebidaId').value;
  const nome = document.getElementById('bebidaNome').value;
  const qtde = document.getElementById('bebidaQtde').value;
  const preco = document.getElementById('bebidaPreco').value;
  const volume = document.getElementById('bebidaVolume').value;
  const marca = document.getElementById('bebidaMarca').value;
  const id_fornecedor = document.getElementById('bebidaFornecedor').value;

  if (!nome) return alert('Preencha o nome!');

  if (id) {
    const index = bebidas.findIndex(b => b.id == id);
    bebidas[index] = { id: Number(id), nome, qtde, preco, volume, marca, id_fornecedor };
  } else {
    bebidas.push({ id: Date.now(), nome, qtde, preco, volume, marca, id_fornecedor });
  }

  localStorage.setItem('bebidas', JSON.stringify(bebidas));
  fecharModal('modalBebida');
  exibirTabela();
}

// ==== EXCLUIR ====
function excluir(id, tipo) {
  if (confirm('Deseja realmente excluir?')) {
    if (tipo === 'bebida') {
      bebidas = bebidas.filter(b => b.id !== id);
      localStorage.setItem('bebidas', JSON.stringify(bebidas));
    } else {
      fornecedores = fornecedores.filter(f => f.id !== id);
      localStorage.setItem('fornecedores', JSON.stringify(fornecedores));
    }
    exibirTabela();
  }
}

// ==== EXIBIR TABELAS ====
function exibirTabela() {
  const filtro = document.getElementById('filter').value;
  let html = "<table><thead><tr>";

  if (filtro === 'bebidas') {
    html += "<th>ID</th><th>Nome</th><th>Qtde</th><th>Preço</th><th>Volume</th><th>Marca</th><th>ID Fornecedor</th><th>Ações</th></tr></thead><tbody>";
    bebidas.forEach(b => {
      html += `<tr>
        <td>${b.id}</td><td>${b.nome}</td><td>${b.qtde}</td>
        <td>${b.preco}</td><td>${b.volume}</td><td>${b.marca}</td><td>${b.id_fornecedor}</td>
        <td>
          <button onclick='abrirModalBebida(${JSON.stringify(b)})'>Editar</button>
          <button onclick='excluir(${b.id}, "bebida")'>Excluir</button>
        </td>
      </tr>`;
    });
  } else if (filtro === 'fornecedores') {
    html += "<th>ID</th><th>Nome</th><th>CNPJ</th><th>Telefone</th><th>Endereço</th><th>Ações</th></tr></thead><tbody>";
    fornecedores.forEach(f => {
      html += `<tr>
        <td>${f.id}</td><td>${f.nome}</td><td>${f.cnpj}</td><td>${f.telefone}</td><td>${f.endereco}</td>
        <td>
          <button onclick='abrirModalFornecedor(${JSON.stringify(f)})'>Editar</button>
          <button onclick='excluir(${f.id}, "fornecedor")'>Excluir</button>
        </td>
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

// ==== INICIALIZAÇÃO ====
exibirTabela();

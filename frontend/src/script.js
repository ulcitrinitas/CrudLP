let bebidas = JSON.parse(localStorage.getItem('bebidas')) || [];
let fornecedores = JSON.parse(localStorage.getItem('fornecedores')) || [];

document.getElementById('btnAddFornecedor').onclick = () => abrirModalFornecedor();
document.getElementById('btnAddBebida').onclick = () => abrirModalBebida();
document.getElementById('filter').onchange = exibirTabela;

// ==== MODAIS ====
function abrirModalFornecedor(f = null) {
  document.getElementById('modalFornecedor').style.display = 'block';

  // O ID é guardado no objeto, mas não é mais exibido
  document.getElementById('fornecedorId').value = f ? f.id : ''; // Mantemos o campo hidden para a lógica de salvamento

  if (f) {
    document.getElementById('tituloFornecedor').innerText = 'Editar Fornecedor';
    document.getElementById('fornecedorNome').value = f.nome;
    document.getElementById('fornecedorCNPJ').value = f.cnpj;
    document.getElementById('fornecedorTelefone').value = f.telefone;
    document.getElementById('fornecedorCEP').value = f.cep || '';
    document.getElementById('fornecedorLogradouro').value = f.logradouro || '';
    document.getElementById('fornecedorNumero').value = f.numero || '';
    document.getElementById('fornecedorCidade').value = f.cidade || '';
    document.getElementById('fornecedorUF').value = f.uf || '';
    document.getElementById('fornecedorPais').value = f.pais || '';
  } else {
    document.getElementById('tituloFornecedor').innerText = 'Novo Fornecedor';
    document.querySelectorAll('#modalFornecedor input').forEach(i => i.value = '');
  }
}

function abrirModalBebida(b = null) {
  document.getElementById('modalBebida').style.display = 'block';

  // O ID é guardado no objeto, mas não é mais exibido
  document.getElementById('bebidaId').value = b ? b.id : ''; // Mantemos o campo hidden para a lógica de salvamento

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
  const cep = document.getElementById('fornecedorCEP').value;
  const logradouro = document.getElementById('fornecedorLogradouro').value;
  const numero = document.getElementById('fornecedorNumero').value;
  const cidade = document.getElementById('fornecedorCidade').value;
  const uf = document.getElementById('fornecedorUF').value;
  const pais = document.getElementById('fornecedorPais').value;

  if (!nome) return alert('Preencha o nome!');

  const novoFornecedor = {
    id: id ? Number(id) : Date.now(), // Mantém o ID no objeto interno
    nome,
    cnpj,
    telefone,
    cep,
    logradouro,
    numero,
    cidade,
    uf,
    pais
  };

  if (id) {
    // Editar
    const index = fornecedores.findIndex(f => f.id == id);
    fornecedores[index] = novoFornecedor;
  } else {
    // Novo
    fornecedores.push(novoFornecedor);
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

  const novaBebida = {
    id: id ? Number(id) : Date.now(), // Mantém o ID no objeto interno
    nome,
    qtde,
    preco,
    volume,
    marca,
    id_fornecedor
  };

  if (id) {
    const index = bebidas.findIndex(b => b.id == id);
    bebidas[index] = novaBebida;
  } else {
    bebidas.push(novaBebida);
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
    // ID removido
    html += "<th>Nome</th><th>Qtde</th><th>Preço</th><th>Volume</th><th>Marca</th><th>Fornecedor</th><th>Ações</th></tr></thead><tbody>";
    bebidas.forEach((b, i) => {
      html += `<tr>
        <td>${b.nome}</td><td>${b.qtde}</td>
        <td>${b.preco}</td><td>${b.volume}</td><td>${b.marca}</td><td>${fornecedores[i].nome}</td>
        <td>
          <button onclick='abrirModalBebida(${JSON.stringify(b)})'>Editar</button>
          <button onclick='excluir(${b.id}, "bebida")'>Excluir</button>
        </td>
      </tr>`;
    });
  } else if (filtro === 'fornecedores') {
    // ID removido
    html += "<th>Nome</th><th>CNPJ</th><th>Telefone</th><th>CEP</th><th>Logradouro</th><th>Número</th><th>Cidade</th><th>UF</th><th>País</th><th>Ações</th></tr></thead><tbody>";
    fornecedores.forEach(f => {
      html += `<tr>
        <td>${f.nome}</td><td>${f.cnpj}</td><td>${f.telefone}</td>
        <td>${f.cep || '-'}</td><td>${f.logradouro || '-'}</td><td>${f.numero || '-'}</td>
        <td>${f.cidade || '-'}</td><td>${f.uf || '-'}</td><td>${f.pais || '-'}</td>
        <td>
          <button onclick='abrirModalFornecedor(${JSON.stringify(f)})'>Editar</button>
          <button onclick='excluir(${f.id}, "fornecedor")'>Excluir</button>
        </td>
      </tr>`;
    });
  } else {
    // ID Bebida removido
    html += "<th>Nome Bebida</th><th>Marca</th><th>Fornecedor</th><th>CNPJ</th></tr></thead><tbody>";
    bebidas.forEach(b => {
      const forn = fornecedores.find(f => f.id == b.id_fornecedor);
      html += `<tr>
        <td>${b.nome}</td><td>${b.marca}</td>
        <td>${forn ? forn.nome : 'N/A'}</td><td>${forn ? forn.cnpj : '-'}</td>
      </tr>`;
    });
  }

  html += "</tbody></table>";
  document.getElementById('tabelaContainer').innerHTML = html;
}

// ==== INICIALIZAÇÃO ====
exibirTabela();
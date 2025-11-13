// A base da URL para a API. Ajuste conforme o seu servidor.
const API_BASE_URL = 'http://localhost:3000';

// Variáveis globais para armazenar os dados carregados da API
let bebidas = [];
let fornecedores = [];

// Funções para adicionar e filtrar
document.getElementById('btnAddFornecedor').onclick = () => abrirModalFornecedor();
document.getElementById('btnAddBebida').onclick = () => abrirModalBebida();
// Ao mudar o filtro, a tabela é exibida (e os dados são carregados, se necessário)
document.getElementById('filter').onchange = exibirTabela;

// Inicialização: Carrega os dados e exibe a tabela inicial
carregarDadosEExibirTabela();

// ==== CARREGAR DADOS GLOBAIS DA API ====
async function carregarDados() {
  try {
    const [resBebidas, resFornecedores] = await Promise.all([
      fetch(`${API_BASE_URL}/bebidas`),
      fetch(`${API_BASE_URL}/fornecedores`)
    ]);

    bebidas = await resBebidas.json();
    fornecedores = await resFornecedores.json();

    // Mapeamento dos nomes do banco de dados para os nomes usados no frontend
    // Fornecedor: id, nome, cnpj, telefone, pais, endereco, uf
    // Bebida: beb_cod (para id), beb_nome (para nome), qtde, preco_uni (para preco), volume, forn_cod (para id_fornecedor), marca

    // Ajusta a estrutura da bebida para o frontend (usa 'id' e 'id_fornecedor')
    bebidas = bebidas.map(b => ({
      id: b.beb_cod,
      nome: b.beb_nome,
      qtde: b.qtde,
      preco: b.preco_uni, // 'preco_uni' é o nome no BD
      volume: b.volume,
      marca: b.marca,
      id_fornecedor: b.forn_cod // 'forn_cod' é o nome no BD
    }));

    // Ajusta a estrutura do fornecedor para o frontend
    fornecedores = fornecedores.map(f => ({
      id: f.id,
      nome: f.nome,
      cnpj: f.cnpj,
      telefone: f.telefone,
      cep: '', // O campo CEP não existe, mas mantemos para a lógica de exibição. Se o BD armazena o endereço completo em 'endereco', ele precisará ser parseado no backend/frontend.
      logradouro: f.endereco, // Usando 'endereco' do BD como 'logradouro' no frontend
      numero: '',
      cidade: '',
      uf: f.uf,
      pais: f.pais
    }));

  } catch (error) {
    console.error('Erro ao carregar dados da API:', error);
    alert('Erro ao carregar dados. Verifique a conexão com a API.');
  }
}

async function carregarDadosEExibirTabela() {
  await carregarDados();
  exibirTabela();
}


// ==== MODAIS ====
// As funções abrirModalFornecedor e fecharModal não mudam (apenas manipulam o DOM)

function abrirModalFornecedor(f = null) {
  document.getElementById('modalFornecedor').style.display = 'block';

  // Mantemos o campo hidden para a lógica de salvamento
  document.getElementById('fornecedorId').value = f ? f.id : '';

  if (f) {
    document.getElementById('tituloFornecedor').innerText = 'Editar Fornecedor';
    document.getElementById('fornecedorNome').value = f.nome;
    document.getElementById('fornecedorCNPJ').value = f.cnpj;
    document.getElementById('fornecedorTelefone').value = f.telefone;

    // Adaptação dos campos para a estrutura do BD
    document.getElementById('fornecedorCEP').value = f.cep || ''; // Não existe no BD
    document.getElementById('fornecedorLogradouro').value = f.logradouro || ''; // Mapeado para 'endereco'
    document.getElementById('fornecedorNumero').value = f.numero || ''; // Não existe no BD
    document.getElementById('fornecedorCidade').value = f.cidade || ''; // Não existe no BD
    document.getElementById('fornecedorUF').value = f.uf || '';
    document.getElementById('fornecedorPais').value = f.pais || '';
  } else {
    document.getElementById('tituloFornecedor').innerText = 'Novo Fornecedor';
    document.querySelectorAll('#modalFornecedor input').forEach(i => i.value = '');
  }
}

async function abrirModalBebida(b = null) {
  document.getElementById('modalBebida').style.display = 'block';

  // Preenche o select de fornecedores (Sempre recarrega em caso de atualização)
  await carregarDados(); // Recarrega fornecedores para garantir a lista mais atualizada
  const select = document.getElementById('bebidaFornecedor');
  select.innerHTML = '<option value="">Selecione um fornecedor</option>';
  fornecedores.forEach(f => {
    const opt = document.createElement('option');
    opt.value = f.id;
    opt.textContent = f.nome;
    select.appendChild(opt);
  });

  // Mantemos o campo hidden para a lógica de salvamento
  document.getElementById('bebidaId').value = b ? b.id : '';

  if (b) {
    document.getElementById('tituloBebida').innerText = 'Editar Bebida';
    document.getElementById('bebidaNome').value = b.nome;
    document.getElementById('bebidaQtde').value = b.qtde;
    document.getElementById('bebidaPreco').value = b.preco; // Usa 'preco'
    document.getElementById('bebidaVolume').value = b.volume;
    document.getElementById('bebidaMarca').value = b.marca;
    document.getElementById('bebidaFornecedor').value = b.id_fornecedor; // Usa 'id_fornecedor'
  } else {
    document.getElementById('tituloBebida').innerText = 'Nova Bebida';
    document.querySelectorAll('#modalBebida input').forEach(i => i.value = '');
    select.value = '';
  }
}


function fecharModal(id) {
  document.getElementById(id).style.display = 'none';
}

// ==== SALVAR FORNECEDOR (POST/PUT) ====
async function salvarFornecedor() {
  const id = document.getElementById('fornecedorId').value;
  const nome = document.getElementById('fornecedorNome').value;
  const cnpj = document.getElementById('fornecedorCNPJ').value;
  const telefone = document.getElementById('fornecedorTelefone').value;

  // Mapeamento dos campos do frontend para a estrutura do banco de dados
  const logradouro = document.getElementById('fornecedorLogradouro').value; // Mapeado para 'endereco'
  const uf = document.getElementById('fornecedorUF').value;
  const pais = document.getElementById('fornecedorPais').value;

  if (!nome || !cnpj || !telefone || !uf) return alert('Preencha os campos obrigatórios: Nome, CNPJ, Telefone e UF!');

  const dadosFornecedor = {
    nome,
    cnpj,
    telefone,
    endereco: logradouro, // Usando 'endereco' conforme a tabela MySQL
    uf,
    pais
    // Ignorando CEP, Número e Cidade, pois não estão na tabela MySQL fornecida
  };

  let method = id ? 'PUT' : 'POST';
  let url = id ? `${API_BASE_URL}/fornecedores/${id}` : `${API_BASE_URL}/fornecedores`;

  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dadosFornecedor)
    });

    if (!response.ok) {
      throw new Error(`Erro ao salvar fornecedor: ${response.statusText}`);
    }

    fecharModal('modalFornecedor');
    await carregarDadosEExibirTabela(); // Recarrega os dados e atualiza a tabela
  } catch (error) {
    console.error('Erro:', error);
    alert('Houve um erro ao salvar o fornecedor.');
  }
}

// ==== SALVAR BEBIDA (POST/PUT) ====
async function salvarBebida() {
  const id = document.getElementById('bebidaId').value;
  const nome = document.getElementById('bebidaNome').value;
  const qtde = document.getElementById('bebidaQtde').value;
  const preco = document.getElementById('bebidaPreco').value;
  const volume = document.getElementById('bebidaVolume').value;
  const marca = document.getElementById('bebidaMarca').value;
  const id_fornecedor = document.getElementById('bebidaFornecedor').value;

  if (!nome || !id_fornecedor) return alert('Preencha o nome e selecione o fornecedor!');

  // Mapeamento dos campos do frontend para a estrutura do banco de dados
  const dadosBebida = {
    beb_nome: nome, // 'beb_nome' é o nome no BD
    qtde: Number(qtde),
    preco_uni: Number(preco), // 'preco_uni' é o nome no BD
    volume: Number(volume),
    marca: marca,
    forn_cod: Number(id_fornecedor) // 'forn_cod' é o nome no BD
    // O tipo VARCHAR não está sendo usado no frontend
  };

  let method = id ? 'PUT' : 'POST';
  // O endpoint PUT precisa do 'beb_cod' (que é o 'id' no frontend)
  let url = id ? `${API_BASE_URL}/bebidas/${id}` : `${API_BASE_URL}/bebidas`;

  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dadosBebida)
    });

    if (!response.ok) {
      throw new Error(`Erro ao salvar bebida: ${response.statusText}`);
    }

    fecharModal('modalBebida');
    await carregarDadosEExibirTabela(); // Recarrega os dados e atualiza a tabela
  } catch (error) {
    console.error('Erro:', error);
    alert('Houve um erro ao salvar a bebida.');
  }
}

// ==== EXCLUIR (DELETE) ====
async function excluir(id, tipo) {
  if (!confirm('Deseja realmente excluir?')) return;

  let url;
  if (tipo === 'bebida') {
    url = `${API_BASE_URL}/bebidas/${id}`;
  } else if (tipo === 'fornecedor') {
    url = `${API_BASE_URL}/fornecedores/${id}`;
  } else {
    return;
  }

  try {
    const response = await fetch(url, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error(`Erro ao excluir: ${response.statusText}`);
    }

    await carregarDadosEExibirTabela(); // Recarrega os dados e atualiza a tabela
  } catch (error) {
    console.error('Erro:', error);
    alert('Houve um erro ao excluir o item.');
  }
}

// ==== EXIBIR TABELAS ====
function exibirTabela() {
  // Esta função agora usa as variáveis globais 'bebidas' e 'fornecedores' (já carregadas da API)
  const filtro = document.getElementById('filter').value;
  let html = "<table><thead><tr>";

  if (filtro === 'bebidas') {
    html += "<th>Nome</th><th>Qtde</th><th>Preço</th><th>Volume</th><th>Marca</th><th>Fornecedor</th><th>Ações</th></tr></thead><tbody>";
    bebidas.forEach(b => {
      // É necessário encontrar o fornecedor pelo ID (id_fornecedor)
      const forn = fornecedores.find(f => f.id == b.id_fornecedor);
      html += `<tr>
        <td>${b.nome}</td><td>${b.qtde}</td>
        <td>${b.preco}</td><td>${b.volume}</td><td>${b.marca}</td><td>${forn ? forn.nome : 'N/A'}</td>
        <td>
          <button onclick='abrirModalBebida(${JSON.stringify(b)})'>Editar</button>
          <button onclick='excluir(${b.id}, "bebida")'>Excluir</button>
        </td>
      </tr>`;
    });
  } else if (filtro === 'fornecedores') {
    // Campos CEP, Número, Cidade não existem na tabela MySQL. Usaremos o 'endereco' para Logradouro.
    html += "<th>Nome</th><th>CNPJ</th><th>Telefone</th><th>Logradouro</th><th>UF</th><th>País</th><th>Ações</th></tr></thead><tbody>";
    fornecedores.forEach(f => {
      html += `<tr>
        <td>${f.nome}</td><td>${f.cnpj}</td><td>${f.telefone}</td>
        <td>${f.logradouro || '-'}</td>
        <td>${f.uf || '-'}</td><td>${f.pais || '-'}</td>
        <td>
          <button onclick='abrirModalFornecedor(${JSON.stringify(f)})'>Editar</button>
          <button onclick='excluir(${f.id}, "fornecedor")'>Excluir</button>
        </td>
      </tr>`;
    });
  } else {
    // Tabela de resumo
    html += "<th>Nome Bebida</th><th>Marca</th><th>Fornecedor</th><th>Telefone</th></tr></thead><tbody>";
    bebidas.forEach(b => {
      const forn = fornecedores.find(f => f.id == b.id_fornecedor);
      html += `<tr>
        <td>${b.nome}</td><td>${b.marca}</td>
        <td>${forn ? forn.nome : 'N/A'}</td><td>${forn ? forn.telefone : '-'}</td>
      </tr>`;
    });
  }

  html += "</tbody></table>";
  document.getElementById('tabelaContainer').innerHTML = html;
}

// O código de inicialização agora é 'carregarDadosEExibirTabela()' (acima)
// exibirTabela(); // Removido, chamado dentro de carregarDadosEExibirTabela()
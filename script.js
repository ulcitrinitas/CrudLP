// ==============================================
// SIMULAÇÃO DO BANCO DE DADOS (Arrays Globais)
// ==============================================

let fornecedores = [
  { id: 1, nome: "Distribuidora Principal", cnpj: "00.000.000/0001-00" },
  { id: 2, nome: "Cervejaria Artesanal Alpha", cnpj: "11.111.111/0001-11" }
];
let nextFornecedorId = 3;

let bebidas = [
  {
      codigo: 101, nome: "Cerveja Pilsen", volume: 350, precoUnitario: 4.50,
      tipoFk: 1, codigoFornecedorFk: 2, marcaFk: 1 
  }
];
let nextBebidaId = 102;


// ==============================================
// LÓGICA DE NAVEGAÇÃO POR ABAS
// ==============================================

function openTab(tabName) {
  let tabcontent, tablinks;

  tabcontent = document.getElementsByClassName("tab-content");
  for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].classList.remove("active");
  }

  tablinks = document.getElementsByClassName("tab-button");
  for (i = 0; i < tablinks.length; i++) {
      tablinks[i].classList.remove("active");
  }

  document.getElementById(tabName).classList.add("active");
  document.querySelector(`.tab-button[data-tab="${tabName}"]`).classList.add("active");
  
  // Recarrega os dados da aba ativa
  if (tabName === 'fornecedor') {
      loadFornecedores();
  } else if (tabName === 'bebida') {
      loadBebidas();
  }
}


// ==============================================
// LÓGICA DO CRUD PARA FORNECEDOR
// ==============================================

const fornecedorForm = document.getElementById('fornecedorForm');
const fornecedoresList = document.getElementById('fornecedoresList');
const fornecedorIdInput = document.getElementById('fornecedorId');
const submitFornecedorBtn = document.getElementById('submitFornecedorBtn');
const cancelFornecedorBtn = document.getElementById('cancelFornecedorBtn');

// READ: Carrega e exibe a lista de fornecedores
function loadFornecedores() {
  fornecedoresList.innerHTML = '';
  
  if (fornecedores.length === 0) {
      fornecedoresList.innerHTML = '<tr><td colspan="4" style="text-align: center;">Nenhum fornecedor cadastrado.</td></tr>';
  }

  fornecedores.forEach(fornecedor => {
      const row = fornecedoresList.insertRow();
      
      row.insertCell().textContent = fornecedor.id;
      row.insertCell().textContent = fornecedor.nome;
      row.insertCell().textContent = fornecedor.cnpj;

      const actionsCell = row.insertCell();
      
      const editBtn = document.createElement('button');
      editBtn.textContent = 'Editar';
      editBtn.className = 'edit-btn';
      editBtn.onclick = () => editFornecedor(fornecedor.id);
      actionsCell.appendChild(editBtn);

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Excluir';
      deleteBtn.className = 'delete-btn';
      deleteBtn.onclick = () => deleteFornecedor(fornecedor.id);
      actionsCell.appendChild(deleteBtn);
  });

  // Atualiza o SELECT de Bebida após a lista ser carregada
  updateBebidaFornecedorSelect(); 
}

// CREATE/UPDATE: Salva o fornecedor
fornecedorForm.addEventListener('submit', function(event) {
  event.preventDefault();
  
  const id = fornecedorIdInput.value;
  const nome = document.getElementById('fornecedorNome').value;
  const cnpj = document.getElementById('fornecedorCnpj').value;

  const novoFornecedor = {
      id: id ? parseInt(id) : nextFornecedorId,
      nome: nome,
      cnpj: cnpj
  };

  if (id) {
      const index = fornecedores.findIndex(f => f.id === parseInt(id));
      if (index > -1) {
          fornecedores[index] = novoFornecedor;
      }
  } else {
      fornecedores.push(novoFornecedor);
      nextFornecedorId++;
  }

  resetFornecedorForm();
  loadFornecedores();
});

// UPDATE (Parte 2): Preenche o formulário para edição
function editFornecedor(id) {
  const fornecedor = fornecedores.find(f => f.id === id);
  if (!fornecedor) return;

  fornecedorIdInput.value = fornecedor.id;
  document.getElementById('fornecedorNome').value = fornecedor.nome;
  document.getElementById('fornecedorCnpj').value = fornecedor.cnpj;
  
  submitFornecedorBtn.textContent = 'Atualizar Fornecedor';
  submitFornecedorBtn.style.backgroundColor = '#ffc107'; 
  cancelFornecedorBtn.style.display = 'inline-block';
}

// DELETE: Exclui o fornecedor
function deleteFornecedor(id) {
  const hasBebidas = bebidas.some(b => b.codigoFornecedorFk === id);
  if (hasBebidas) {
      alert("Não é possível excluir este fornecedor. Há bebidas cadastradas que dependem dele!");
      return;
  }

  if (confirm(`Tem certeza que deseja excluir o fornecedor com ID ${id}?`)) {
      fornecedores = fornecedores.filter(f => f.id !== id);
      loadFornecedores();
  }
}

// Reset o formulário de Fornecedor
function resetFornecedorForm() {
  fornecedorForm.reset();
  fornecedorIdInput.value = '';
  submitFornecedorBtn.textContent = 'Salvar Fornecedor';
  submitFornecedorBtn.style.backgroundColor = '#28a745';
  cancelFornecedorBtn.style.display = 'none';
}

cancelFornecedorBtn.addEventListener('click', resetFornecedorForm);


// ==============================================
// LÓGICA DO CRUD PARA BEBIDA
// ==============================================

const bebidaForm = document.getElementById('bebidaForm');
const bebidasList = document.getElementById('bebidasList');
const submitBtn = document.getElementById('submitBtn');
const cancelBtn = document.getElementById('cancelBtn');
const bebidaIdInput = document.getElementById('bebidaId');

// Preenche o <select> de Fornecedores (Chave Estrangeira)
function updateBebidaFornecedorSelect() {
  const fornecedorSelect = document.getElementById('fornecedorFk');
  fornecedorSelect.innerHTML = '<option value="">Selecione um Fornecedor</option>';

  fornecedores.forEach(fornecedor => {
      const option = document.createElement('option');
      option.value = fornecedor.id; 
      option.textContent = `${fornecedor.nome} (ID: ${fornecedor.id})`; 
      fornecedorSelect.appendChild(option);
  });
}

// READ: Carrega e exibe a lista de bebidas
function loadBebidas() {
  bebidasList.innerHTML = ''; 
  
  if (bebidas.length === 0) {
      bebidasList.innerHTML = '<tr><td colspan="6" style="text-align: center;">Nenhuma bebida cadastrada.</td></tr>';
      return;
  }

  bebidas.forEach(bebida => {
      const row = bebidasList.insertRow();
      
      const fornecedor = fornecedores.find(f => f.id === bebida.codigoFornecedorFk);
      const nomeFornecedor = fornecedor ? fornecedor.nome : 'FORNECEDOR EXCLUÍDO';
      
      row.insertCell().textContent = bebida.codigo;
      row.insertCell().textContent = bebida.nome;
      row.insertCell().textContent = `${bebida.volume} ml`;
      row.insertCell().textContent = `R$ ${parseFloat(bebida.precoUnitario).toFixed(2)}`;
      row.insertCell().textContent = nomeFornecedor;

      const actionsCell = row.insertCell();
      
      const editBtn = document.createElement('button');
      editBtn.textContent = 'Editar';
      editBtn.className = 'edit-btn';
      editBtn.onclick = () => editBebida(bebida.codigo);
      actionsCell.appendChild(editBtn);

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Excluir';
      deleteBtn.className = 'delete-btn';
      deleteBtn.onclick = () => deleteBebida(bebida.codigo);
      actionsCell.appendChild(deleteBtn);
  });
}

// CREATE/UPDATE: Salva a bebida
bebidaForm.addEventListener('submit', function(event) {
  event.preventDefault();
  
  const codigo = bebidaIdInput.value;
  const nome = document.getElementById('nome').value;
  const volume = document.getElementById('volume').value;
  const precoUnitario = document.getElementById('precoUnitario').value;
  const marcaId = document.getElementById('marcaId').value;
  const tipoId = document.getElementById('tipoId').value;
  const fornecedorFk = document.getElementById('fornecedorFk').value; 

  const novaBebida = {
      codigo: codigo ? parseInt(codigo) : nextBebidaId,
      nome: nome,
      nacionalidade: 'Brasileira',
      precoUnitario: parseFloat(precoUnitario),
      volume: parseInt(volume),
      volumeMed: 'ml', 
      
      tipoFk: parseInt(tipoId), 
      codigoFornecedorFk: parseInt(fornecedorFk), 
      marcaFk: parseInt(marcaId)
  };

  if (codigo) {
      const index = bebidas.findIndex(b => b.codigo === parseInt(codigo));
      if (index > -1) {
          bebidas[index] = novaBebida;
      }
  } else {
      bebidas.push(novaBebida);
      nextBebidaId++;
  }

  resetBebidaForm();
  loadBebidas();
});

// UPDATE (Parte 2): Preenche o formulário para edição
function editBebida(codigo) {
  const bebida = bebidas.find(b => b.codigo === codigo);
  if (!bebida) return;

  bebidaIdInput.value = bebida.codigo;
  document.getElementById('nome').value = bebida.nome;
  document.getElementById('volume').value = bebida.volume;
  document.getElementById('precoUnitario').value = bebida.precoUnitario;
  document.getElementById('marcaId').value = bebida.marcaFk;
  document.getElementById('tipoId').value = bebida.tipoFk;
  
  // Seleciona a opção correta no <select>
  document.getElementById('fornecedorFk').value = bebida.codigoFornecedorFk;
  
  submitBtn.textContent = 'Atualizar Bebida';
  submitBtn.style.backgroundColor = '#ffc107'; 
  cancelBtn.style.display = 'inline-block';
}

// DELETE: Exclui a bebida
function deleteBebida(codigo) {
  if (confirm(`Tem certeza que deseja excluir a bebida com Código ${codigo}?`)) {
      bebidas = bebidas.filter(b => b.codigo !== codigo);
      loadBebidas();
  }
}

// Reset o formulário de Bebida
function resetBebidaForm() {
  bebidaForm.reset();
  bebidaIdInput.value = '';
  submitBtn.textContent = 'Salvar Bebida';
  submitBtn.style.backgroundColor = '#28a745';
  cancelBtn.style.display = 'none';
}

cancelBtn.addEventListener('click', resetBebidaForm);

// ==============================================
// Inicialização
// ==============================================

// Inicializa o sistema abrindo a aba 'bebida'
window.onload = function() {
  openTab('bebida'); 
  loadFornecedores(); // Garante que o array de fornecedores e o select estejam prontos
  loadBebidas();
}
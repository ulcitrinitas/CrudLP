-- Arquivo com alguns inserts para popular o banco de dados

-- Tabela de Fornecedores
INSERT INTO Fornecedor (nome, cnpj, email, pais_cod, endereco, uf) VALUES
('Cervejaria Lupulada Ltda', '12.345.678/0001-90', 'contato@lupulada.com.br', 'BRA', 'Rua das Cervejas, 100, Bairro Boemia', 'SP'),
('Bebidas do Mundo S.A.', '98.765.432/0001-12', 'vendas@bebidasdomundo.com.br', 'BRA', 'Av. Central, 500, Bloco B, Centro', 'RJ'),
('Vinhos & Cia Importação', '24.680.135/0001-47', 'sac@vinhoscia.com', 'BRA', 'Alameda dos Importadores, 321, Galpão C', 'PR'),
('Global Drinks Corp.', '00.111.222/0001-00', 'info@globaldrinks.com', 'USA', '1000 Main Street, Suite 500, Miami', NULL), -- UF Nulo (fora do Brasil)
('Sucos da Natureza Ltda', '11.222.333/0001-44', NULL, 'BRA', 'Rodovia do Agricultor, Km 10, Zona Rural', 'MG');


-- Tabela de bebidas
INSERT INTO Bebida (beb_nome, qtde, preco_uni, volume, tipo, volume_med, forn_cod, marca) VALUES
('IPA Lupulada Extra', 150, 18.50, 0.500, 'Cerveja Artesanal', 500, 1, 'Lupulada'),
('Refrigerante Cola Zero', 1200, 3.99, 2.000, 'Refrigerante', 2000, 4, 'GlobalFizz'),
('Vinho Tinto Cabernet Sauvignon', 50, 89.90, 0.750, 'Vinho', 750, 3, 'Vinhas Nobres'),
('Água Mineral Sem Gás', 2000, 1.50, 0.330, 'Água', 330, 2, 'PuraFonte'),
('Suco de Laranja Integral', 300, 7.25, 1.000, 'Suco Natural', 1000, 5, 'Sabor Fresh');


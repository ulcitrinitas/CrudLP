INSERT INTO
    Medida (sigla, nome_med)
VALUES
    ('ml', 'Mililitro'),
    ('l', 'Litro');

INSERT INTO Endereco (cep, logradouro, numero, cidade, UF, pais) VALUES
('01001-000', 'Rua da Sé', 123, 'São Paulo', 'SP', 'Brasil'),      
('20040-009', 'Avenida Rio Branco', 456, 'Rio de Janeiro', 'RJ', 'Brasil'),
('70070-100', 'Praça dos Três Poderes', 789, 'Brasília', 'DF', 'Brasil'),
('90010-000', 'Rua dos Andradas', 101, 'Porto Alegre', 'RS', 'Brasil'),
('80020-320', 'Rua XV de Novembro', 202, 'Curitiba', 'PR', 'Brasil');

INSERT INTO Fornecedor (nome, cnpj, email, pais_cod, endereco_cod) VALUES
('Distribuídora Alpha Bebidas', '12.345.678/0001-00', 'contato@alpha.com.br', '+55', 1),
('Importadora Beta Vinhos', '98.765.432/0001-11', 'comercial@beta.com.br', '+55', 2),
('Comércio Gama Refrigerantes', '11.222.333/0001-22', 'vendas@gama.com.br', '+55', 3),
('Cervejaria Delta', '44.555.666/0001-33', 'marketing@delta.com.br', '+55', 4),      
('Sucos Epsilon', '77.888.999/0001-44', 'adm@epsilon.com.br', '+55', 5);              

INSERT INTO Marca (nome, forn_cod) VALUES
('Cerveja Solare', 4),          
('Vinho Tinto Noble', 2),      
('Refrigerante Refresc', 3),   
('Água Mineral Cristalina', 1), 
('Suco Natural Vita', 5),       
('Cerveja Noturna', 4),         
('Refrigerante Max Sabor', 3); 

INSERT INTO Bebida (beb_nome, qtde, preco_uni, volume, tipo, volume_med, forn_cod, marca_cod) VALUES
('Cerveja Pilsen Solare 350ml', 500, 3.500, 350.000, 'Cerveja', 1, 4, 1),
('Vinho Tinto Noble Safra 2022', 150, 45.990, 750.000, 'Vinho', 1, 2, 2),
('Refrigerante Refresc Cola 2L', 300, 5.800, 2.000, 'Refrigerante', 2, 3, 3),
('Água Cristalina Sem Gás 500ml', 1000, 1.990, 500.000, 'Água', 1, 1, 4),
('Suco Vita Laranja Integral 1L', 200, 7.500, 1.000, 'Suco', 2, 5, 5),
('Cerveja Noturna IPA Lata 473ml', 120, 5.900, 473.000, 'Cerveja Artesanal', 1, 4, 6),
('Refrigerante Max Sabor Guaraná 350ml', 400, 2.990, 350.000, 'Refrigerante', 1, 3, 7);
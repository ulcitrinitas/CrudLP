SELECT * FROM Endereco;

SELECT * FROM Fornecedor;

SELECT * FROM Marca;

SELECT * FROM Medida;

SELECT * FROM Bebida;

SELECT nome, cnpj, email, logradouro, numero, cidade, UF, pais
FROM Fornecedor as f
JOIN Endereco as e on f.endereco_cod = e.codigo_end;

SELECT beb_nome, qtde, preco_uni, tipo, volume, me.sigla as medida, f.nome as fornecedor, m.nome as marca
FROM Bebida as b
JOIN Fornecedor f ON b.beb_cod = f.id
JOIN Marca m ON b.marca_cod = m.marca_cod
JOIN Medida me ON b.volume_med = me.med_cod;

CREATE VIEW beb_info as 
SELECT beb_nome, qtde, preco_uni, tipo, volume, me.sigla as medida, f.nome as fornecedor, m.nome as marca
FROM Bebida as b
JOIN Fornecedor f ON b.beb_cod = f.id
JOIN Marca m ON b.marca_cod = m.marca_cod
JOIN Medida me ON b.volume_med = me.med_cod;

SELECT * FROM beb_info;

INSERT INTO Bebida (beb_nome, qtde, preco_uni, volume, tipo, volume_med, forn_cod, marca_cod) VALUES
('Tequila Silver Mexicana 750ml', 50, 89.900, 750.000, 'Destilado', 1, 2, 2),
('Refrigerante Zero Refresc Limão 350ml', 600, 3.200, 350.000, 'Refrigerante', 1, 3, 3);

SELECT * FROM beb_info;

DROP VIEW beb_info;

SELECT beb_nome, qtde, preco_uni, tipo, volume, me.sigla as medida, f.nome as fornecedor, m.nome as marca
FROM Bebida as b
LEFT JOIN Fornecedor f ON b.beb_cod = f.id
LEFT JOIN Marca m ON b.marca_cod = m.marca_cod
LEFT JOIN Medida me ON b.volume_med = me.med_cod;

DELETE FROM Bebida;
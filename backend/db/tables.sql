CREATE DATABASE lp_crud;

USE lp_crud;

-- drop database lp_crud;

CREATE TABLE
    Fornecedor (
        id INT AUTO_INCREMENT UNIQUE PRIMARY KEY,
        nome VARCHAR(128) NOT NULL,
        cnpj CHAR(18) NOT NULL,
        email VARCHAR(128),
        telefone varchar(9), 
        pais varchar(128),
        endereco VARCHAR(512),
        uf CHAR(2)
    );

CREATE TABLE
    Bebida (
        beb_cod BIGINT AUTO_INCREMENT UNIQUE PRIMARY KEY,
        beb_nome VARCHAR(256) NOT NULL,
        qtde INT,
        preco_uni DECIMAL(7, 3),
        volume DECIMAL(7, 3),
        tipo VARCHAR(128),
        forn_cod INT,
        marca VARCHAR(128),
        FOREIGN KEY (forn_cod) REFERENCES Fornecedor (id)
    );

SHOW TABLES;

start transaction;

INSERT INTO Fornecedor (nome, cnpj, email, telefone, pais, endereco, uf) VALUES
('AmBev Plataforma BEES', '07.526.551/0001-90', 'contato@ambev.com.br',  '30030000', 'Brasil', 'Av. das Nações Unidas, 11857, Brooklin', 'SP'),
('Coca-Cola Femsa Brasil', '61.168.109/0001-09', 'femsa_vendas@cocacola.com.br', '40028922', 'Brasil', 'Rua Joaquim Floriano, 1000, Itaim Bibi', 'SP'),
('Heineken Distribuidora', '18.784.801/0001-00', 'vendas@heineken.com.br', '08007700', 'Brasil', 'Rua Ministro Nélson Hungria, 219, Chácara Santo Antônio', 'SP'),
('Ravin Importadora de Vinhos', '03.456.789/0001-12', 'comercial@ravin.com.br', '21578900', 'Brasil', 'Alameda Santos, 120, Jardins', 'SP'),
('Diageo Brasil (Destilados)', '04.567.890/0001-34', 'sales@diageo.com', '30784560', 'Brasil', 'Avenida Engenheiro Luís Carlos Berrini, 105', 'SP');

select * from Fornecedor;

-- ROLLBACK;

commit;

select * from Fornecedor;


start transaction;

INSERT INTO Bebida (beb_nome, qtde, preco_uni, volume, tipo, forn_cod, marca) VALUES
('Chá Verde Gelado', 80, 5.200, 450.000, 'Chá', 2, 'Lipton'),
('Café Expresso em Grãos', 30, 25.000, 500.000, 'Café', 1, 'Melitta'),
('Vodka Clássica', 15, 65.900, 1000.000, 'Destilado', 1, 'Absolut'),
('Refrigerante de Limão Zero', 110, 4.350, 600.000, 'Refrigerante', 2, 'Sprite'),
('Cerveja Artesanal IPA', 55, 12.500, 500.000, 'Cerveja', 2, 'Colorado'),
('Água Tônica', 75, 3.990, 350.000, 'Refrigerante', 1, 'Schweppes'),
('Whisky Single Malt 12 Anos', 10, 150.000, 700.000, 'Destilado', 2, 'Glenfiddich');

select * from Bebida;

-- ROLLBACK;

commit;

select * from Bebida;
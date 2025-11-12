CREATE DATABASE lp_crud;

USE lp_crud;

CREATE TABLE
    Fornecedor (
        id INT AUTO_INCREMENT UNIQUE PRIMARY KEY,
        nome VARCHAR(128) NOT NULL,
        cnpj CHAR(18) NOT NULL,
        email VARCHAR(128),
        pais_cod VARCHAR(5),
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
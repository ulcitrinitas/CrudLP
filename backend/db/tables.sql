USE lp_crud;

/* DROP TABLE Bebida;
DROP TABLE Medida;
DROP TABLE Marca;
DROP TABLE Fornecedor;
DROP TABLE Endereco;
 */
CREATE TABLE
    Endereco (
        codigo_end INT AUTO_INCREMENT PRIMARY KEY,
        cep CHAR(9) NOT NULL,
        logradouro VARCHAR(256),
        numero INT,
        cidade VARCHAR(64),
        UF CHAR(2),
        pais VARCHAR(128)
    );

CREATE TABLE
    Fornecedor (
        id INT AUTO_INCREMENT UNIQUE PRIMARY KEY,
        nome VARCHAR(128) NOT NULL,
        cnpj CHAR(18) NOT NULL,
        email VARCHAR(128),
        pais_cod VARCHAR(5),
        endereco_cod INT,
        FOREIGN KEY (endereco_cod) REFERENCES Endereco (codigo_end)
    );

CREATE TABLE
    Marca (
        marca_cod INT UNIQUE AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(128),
        forn_cod INT,
        FOREIGN KEY (forn_cod) REFERENCES Fornecedor (id)
    );

CREATE TABLE
    Medida (
        med_cod INT AUTO_INCREMENT UNIQUE PRIMARY KEY,
        sigla CHAR(3),
        nome_med VARCHAR(64)
    );

CREATE TABLE
    Bebida (
        beb_cod BIGINT AUTO_INCREMENT UNIQUE PRIMARY KEY,
        beb_nome VARCHAR(256) NOT NULL,
        qtde INT,
        preco_uni DECIMAL(7, 3),
        volume DECIMAL(7, 3),
        tipo VARCHAR(128),
        volume_med INT,
        forn_cod INT,
        marca_cod INT,
        FOREIGN KEY (marca_cod) REFERENCES Marca (marca_cod),
        FOREIGN KEY (volume_med) REFERENCES Medida (med_cod),
        FOREIGN KEY (forn_cod) REFERENCES Fornecedor (id)
    );
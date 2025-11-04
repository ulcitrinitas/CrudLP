# CrudLP

### Diagrama entidade relacionamento

```mermaid
---
config:
  theme: neo-dark
---
erDiagram
	direction LR
	Fornecedor {
		int id PK ""  
		varchar nome  ""  
		char cnpj  ""  
		varchar email  ""  
		varchar pais_cod  ""  
		varchar endereco  ""  
		char uf  ""  
	}
	Bebida {
		bigint beb_cod PK ""  
		varchar beb_nome  ""  
		int qtde  ""  
		decimal preco_uni  ""  
		decimal volume  ""  
		varchar tipo  ""  
		int volume_med  ""  
		int forn_cod FK ""  
		varchar marca  ""  
	}

	Fornecedor||--o{Bebida:"fornece"

```

Para rodar instalar dependencias
```
cd backend; pnpm install
```
ou
```
cd backend; npm install
```

E para executar o servidor
```
cd backend; node src/app.js
```
para versões antigas do nodejs
```
cd backend; node dist/app.js
```




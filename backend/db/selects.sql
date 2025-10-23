-- seleciona todos os campos
select beb_nome, qtde, preco_uni, volume, tipo, volume_med, forn_cod, marca, nome, cnpj, email, pais_cod, endereco, uf
from bebida b
join fornecedor f on f.id = b.forn_cod;




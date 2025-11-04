"use strict";

var _express = _interopRequireWildcard(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _promise = _interopRequireDefault(require("mysql2/promise"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
// define qual porta o express vai usar
const port = 3000;

// cria a conexão com banco de dados
const connection = await _promise.default.createConnection({
  host: "localhost",
  user: "root",
  port: 3306,
  database: "lp_crud"
}).catch(err => {
  console.error(`Erro com a conexão`, err);
});

// cria o objeto do express
const app = (0, _express.default)();

// define as configurações do servidor
app.use(_express.default.json()); // retorna nas rotas o json
app.use((0, _cors.default)()); // ativa o cors

const info_bebidas = {
  nome: "Bebida",
  campos: "beb_nome, qtde, preco_uni, volume, tipo, volume_med, forn_cod, marca"
};

// rotas para as bebidas
app.get("/bebidas", async (req, res) => {
  // bloco para tratar erros
  try {
    let [results, fields] = await connection.execute(`select * from ${info_bebidas.nome}`);
    res.status(201).json(results);
  } catch (err) {
    console.error("Erro! Problemas com o banco de dados", err);
    connection.end();
    res.status(501).json({
      msg: `Erro com o banco de dados`,
      error: err
    });
  }
}).post("/bebidas", (req, res) => {
  try {
    let bebidas = req.body;
    let values = bebidas.map(b => {
      return [b.beb_nome, b.qtde, b.preco_uni, b.volume, b.tipo, b.volume_med, b.forn_cod, b.marca];
    });
    let [results] = connection.query(`insert into ${info_bebidas} ( ${info_bebidas.campos} ) values ?`, [values]);
    res.status(201).json(results);
  } catch (err) {
    console.error("Erro! Problemas com o banco de dados", err);
    connection.end();
    res.status(501).json({
      msg: `Erro com o banco de dados`,
      error: err
    });
  }
});

//inicia o servidor
app.listen(port, () => {
  console.log(`Running in localhost:${port}`);
});
/* SUJEITO: /recursos/:recurso
 * MÉTODOS: GET
 * DESCRIÇÃO: testar métodos http com implementação em controlador via rede
 * IMPLEMENTAÇÃO INICIAL: 06/05/2025 15:22
 */

const axios = require("axios");
const { writeFileSync } = require( "fs" );
const { validar } = require("./axios-validateStatusConf");

beforeAll(()=>
{
  writeFileSync("../public/arquivo1", "arquivo1", { encoding: "utf-8" } );
});

test( "Obter recurso unitário do servidor", async ()=>
{
  let resultado = await axios.get( "http://127.0.0.1:8080/recursos/arquivo1", {validateStatus: validar});

  expect( resultado.status ).toBe( 200 );
  expect( resultado.headers["Content-Length"] ).toBeGreaterThan( 0 );
});

test( "Tentativa de obter recurso inexistente", async ()=>
{
  let resultado = await axios.get( "http://127.0.0.1:8080/recursos/ogatomiaeamuricocapica", {validateStatus: validar});

  //Not found
  expect( resultado.status ).toBe( 404 );
});

test( "Tentativa de obter recurso sem nome em parametro de rota", async ()=>
{
  let resultado = await axios.get( "http://127.0.0.1:8080/recursos/", {validateStatus: validar});

  //Bad request
  expect( resultado.status ).toBe( 400 );
});

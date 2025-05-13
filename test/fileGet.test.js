/* SUJEITO: /recursos/:recurso
 * MÉTODOS: GET
 * DESCRIÇÃO: testar métodos http com implementação em controlador via rede
 * IMPLEMENTAÇÃO INICIAL: 06/05/2025 15:22 AM
 */

const axios = require("axios");
const { writeFileSync } = require( "fs" );
const { validar } = require("./axios-validateStatusConf");

beforeAll(()=>
{
  writeFileSync("../public/arquivo1", "arquivo1", { encoding: "utf-8" } );
});

test( "Obter recurso unitário do servidor resulta em OK", async ()=>
{
  let resultado = await axios.get( "http://127.0.0.1:8080/recursos/arquivo1", {validateStatus: validar});

  expect( resultado.status ).toBe( 200 );
  expect( resultado.data.length ).toBeGreaterThan( 0 );
});

test( "Tentativa de obter recurso inexistente resulta em NOT_FOUND", async ()=>
{
  let resultado = await axios.get( "http://127.0.0.1:8080/recursos/inexistente", {validateStatus: validar});

  //Not found
  expect( resultado.status ).toBe( 404 );
});

test( "Obter recurso sem especificar nome no parâmetro resulta em listagem de recursos no servidor OK", async ()=>
{
  let resultado = await axios.get( "http://127.0.0.1:8080/recursos/", {validateStatus: validar});

  expect( resultado.status ).toBe( 200 );
});

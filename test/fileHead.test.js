/* SUJEITO: /recursos/:recurso
 * MÉTODOS: HEAD
 * DESCRIÇÃO: testar métodos http com implementação em controlador via rede
 * IMPLEMENTAÇÃO INICIAL: 06/05/2025 20:39 PM
 */

const axios = require("axios");
const { writeFileSync } = require("node:fs");
const { validar } = require("./axios-validateStatusConf");

beforeAll(()=>
{
  const testContent = "tamanho";
  writeFileSync( "../public/tamanho", testContent, { encoding: "utf-8" } );
});

test( "Recurso tem seu tamanho retornado", async ()=>
{
  let resultado = await axios.head( "http://127.0.0.1:8080/recursos/tamanho", {validateStatus: validar});
  expect( resultado.status ).toBe( 200 );
  expect( +resultado.headers.getContentLength() ).toBe( 7 );
});

test( "Recurso inexistente", async ()=>
{
  let resultado = await axios.head( "http://127.0.0.1:8080/recursos/inexistente", {validateStatus: validar});
  expect( resultado.status ).toBe( 404 );
});


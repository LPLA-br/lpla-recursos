/* SUJEITO: /recursos/:recurso
 * MÉTODOS: DELETE
 * DESCRIÇÃO: testar métodos http com implementação em controlador via rede
 * IMPLEMENTAÇÃO INICIAL: 06/05/2025 20:00 PM
 */

const axios = require("axios");
const { readFile } = require("node:fs/promises");
const { writeFileSync } = require("node:fs");
const { validar } = require("./axios-validateStatusConf");

beforeAll(()=>
{
  writeFileSync( "../public/deletaturo", "deletaturo", { encoding: "utf-8" } );
});

test( "Recurso deletado é removido do servidor", async ()=>
{
  let resultado = await axios.delete( "http://127.0.0.1:8080/recursos/deletaturo", {validateStatus: validar});

  expect( resultado.status ).toBe( 200 );

  let arquivo_deletado;
  try
  {
    arquivo_deletado = await readFile("../public/deletaturo");
    fail("Recurso não foi deletado");
  }
  catch( err )
  {}
});


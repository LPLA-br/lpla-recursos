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
  writeFileSync( "../public/deletaturo2", "deletaturo2", { encoding: "utf-8" } );
});

test( "Recurso deletado é removido do servidor", async ()=>
{
  let resultado = await axios.delete( "http://127.0.0.1:8080/recursos/deletaturo", {validateStatus: validar});

  expect( resultado.status ).toBe( 200 );

  try
  {
    await readFile("../public/deletaturo")
    .then( ()=>{ fail("recurso não eliminado") } );
  }
  catch( err )
  {}
});

test( "Deleção de recurso inexistente resulta sempre em NO_CONTENT", async ()=>
{
  await axios.delete( "http://127.0.0.1:8080/recursos/deletaturo2", {validateStatus: validar});
  let resultado = await axios.delete( "http://127.0.0.1:8080/recursos/deletaturo2", {validateStatus: validar});

  expect( resultado.status ).toBe( 204 );
});


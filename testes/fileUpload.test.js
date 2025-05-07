/* SUJEITO: /recursos/:recurso
 * MÉTODOS: POST
 * DESCRIÇÃO: testar métodos http com implementação em controlador via rede
 * IMPLEMENTAÇÃO INICIAL: 06/05/2025 11:40 AM
 */

const axios = require("axios");
const { readFile } = require("node:fs/promises");
const { writeFileSync } = require("node:fs");
const { validar } = require("./axios-validateStatusConf");

beforeAll(()=>
{
  writeFileSync( "./ascendido", "ascendido", { encoding: "utf-8" } );
});

test( "Subir recurso unitário para servidor", async ()=>
{
  const form = new FormData();
  const arquivo = await readFile( "./ascendido" );
  form.append( "recurso", arquivo.buffer );

  let resultado = await axios.post( "http://127.0.0.1:8080/recursos/ascendido", form, {validateStatus: validar});

  // Created
  expect( resultado.status ).toBe( 201 );

  try
  {
    const arquivo_subido = await readFile("../public/ascendido");
  }
  catch( err )
  {
    fail( "Recurso não subiu para o servidor" );
  }
});

test( "Tentativa de subir recurso sem nome especificado no parametro de rota", async ()=>
{
  const form = new FormData();
  const arquivo = await readFile( "./ascendido" );
  form.append( "recurso", arquivo.buffer );

  let resultado = await axios.post( "http://127.0.0.1:8080/recursos/", form, {validateStatus: validar});

  //Bad request
  expect( resultado.status ).toBe( 400 );
});

test( "Subir N vezes o mesmo recurso", async ()=>
{
  const form = new FormData();
  const arquivo = await readFile( "./ascendido" );
  form.append( "recurso", arquivo.buffer );

  await axios.post( "http://127.0.0.1:8080/recursos/ascendido", form, {validateStatus: validar});
  await axios.post( "http://127.0.0.1:8080/recursos/ascendido", form, {validateStatus: validar});
  const resultado = await axios.post( "http://127.0.0.1:8080/recursos/ascendido", form, {validateStatus: validar});

  // Not modified
  expect( resultado.status ).toBe( 301 );
});

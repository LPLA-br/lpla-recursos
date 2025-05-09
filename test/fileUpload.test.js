/* SUJEITO: /recursos/:recurso
 * MÉTODOS: POST
 * DESCRIÇÃO: testar métodos http com implementação em controlador via rede
 * IMPLEMENTAÇÃO INICIAL: 06/05/2025 11:40 AM
 */

const axios = require("axios");
const { readFile, rm, readdir } = require("node:fs/promises");
const { join } = require("node:path");
const { validar } = require("./axios-validateStatusConf");

const filename = "upload";

beforeAll( async ()=>
{ 
  const diretorioPublico = "../public";
  const dircontent = await readdir( diretorioPublico );
  dircontent.forEach( async ( arquivo )=>
  {
    await rm( join( diretorioPublico, arquivo) );
  });
});

test( "Subir um recurso cria representação e retorna CREATED", async ()=>
{
  const form = new FormData();
  let resultado;
  let testBlob;

  testBlob = new Blob(["testBlob"]);
  testBlob.type = "text/plain";

  form.append( "nome", `${filename}` );
  form.append( "recurso", testBlob );

  resultado = await axios.post( "http://127.0.0.1:8080/recursos", form, {validateStatus: validar});

  expect( resultado.status ).toBe( 201 );

  try
  {
    await readFile(`../public/${filename}`);
  }
  catch( err )
  {
    fail( "Recurso não subiu para o servidor" );
  }
});

test( "Tentativa de subir recurso sem nome especificado no body resulta em BAD_REQUEST", async ()=>
{
  const form = new FormData();
  let resultado;
  let testBlob;

  testBlob = new Blob(["testBlob"]);
  testBlob.type = "text/plain";

  form.append( "recurso", testBlob );

  resultado = await axios.post( "http://127.0.0.1:8080/recursos", form, {validateStatus: validar});

  //Bad request
  expect( resultado.status ).toBe( 400 );
});

test( "Tentativa de subir recurso sem especificar recurso resulta em BAD_REQUEST", async ()=>
{
  const form = new FormData();
  let resultado;

  form.append( "nome", "receba" );

  resultado = await axios.post( "http://127.0.0.1:8080/recursos", form, {validateStatus: validar});

  //Bad request
  expect( resultado.status ).toBe( 400 );
});

test( "Subir N>1 vez o mesmo recurso resulta em SEE_OTHER", async ()=>
{
  const form = new FormData();
  let testBlob;

  testBlob = new Blob([filename]);
  testBlob.type = "text/plain";

  form.append( "nome", `${filename}` );
  form.append( "recurso", testBlob );

  await axios.post( `http://127.0.0.1:8080/recursos`, form, {validateStatus: validar})
  await axios.post( `http://127.0.0.1:8080/recursos`, form, {validateStatus: validar})
  let res = await axios.post( `http://127.0.0.1:8080/recursos`, form, {validateStatus: validar})

  expect( res.status ).toBe( 303 );
});

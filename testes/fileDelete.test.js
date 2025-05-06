/* SUJEITO: /recursos/:recurso
 * MÉTODOS: DELETE
 * DESCRIÇÃO: testar métodos http com implementação em controlador via rede
 * IMPLEMENTAÇÃO INICIAL: 06/05/2025 20:00 PM
 */

const axios = require("axios");
const { readFile } = require("node:fs/promises");

beforeAll(()=>
{
  writeFileSync( "../public/deletaturo", "deletaturo", { encoding: "utf-8" } );
});

test( "Recurso deletado é removido do servidor", ()=>
{
  ( async ()=>
  {
    let resultado = await axios.delete( "127.0.0.1:8080/recursos/deletaturo" );

    expect( resultado.status ).toBe( 200 );

    let arquivo_deletado;
    try
    {
      arquivo_deletado = await readFile("../public/deletaturo");
      fail("Recurso não foi deletado");
    }
    catch( err )
    {}
  })();
});


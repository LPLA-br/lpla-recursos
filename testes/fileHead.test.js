/* SUJEITO: /recursos/:recurso
 * MÉTODOS: HEAD
 * DESCRIÇÃO: testar métodos http com implementação em controlador via rede
 * IMPLEMENTAÇÃO INICIAL: 06/05/2025 20:39 PM
 */

const axios = require("axios");

beforeAll(()=>
{
  writeFileSync( "../public/tamanho", "tamanho", { encoding: "utf-8" } );
});

test( "Recurso tem seu tamanho retornado", ()=>
{
  ( async ()=>
  {
    let resultado = await axios.head( "127.0.0.1:8080/recursos/tamanho" );
    expect( resultado.status ).toBe( 200 );
    expect( +resultado.headers["Content-Length"] ).not.toBeNaN();
  })();
});

test( "Recurso inexistente", ()=>
{
  ( async ()=>
  {
    let resultado = await axios.head( "127.0.0.1:8080/recursos/inexistente" );
    expect( resultado.status ).toBe( 404 );
  })();
});


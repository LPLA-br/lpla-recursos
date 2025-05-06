const { app, PORTA } = require("./config");

process.on( 'SIGINT', () =>
{
  console.log("SIGINT - Interropendo servidor com CTRL+C ... OK!");
  process.exit(0);
});

process.on( 'exit', (code)=>
{
  console.log( `{"evento":"exit", "status_code":${code}}` );
});

try
{
  app.listen( PORTA, ()=>
  {
    console.log(`RECURSOS - OUVINDO PORTA: ${PORTA}`);
  });
}
catch( err )
{
  console.error( err );
  process.exit(128);
}



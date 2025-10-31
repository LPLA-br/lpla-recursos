const { app } = require("./config");
const args = require( "minimist" )(process.argv.slice(2));

if ( args?.host === undefined )
{
  throw new Error( "Opção --host é mandatória." );
  process.exit(1);
}

if ( args?.port === undefined )
{
  throw new Error( "Opção --port é mandatória" );
  process.exit(1);
}

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
  app.listen( args.port, args.host, ()=>
  {
    console.log(`RECURSOS - OUVINDO PORTA: ${args.port}`);
  });
}
catch( err )
{
  console.error( err );
  process.exit(128);
}



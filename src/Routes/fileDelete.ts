import { Request, Response } from "express";
import { Router } from "express";

import { log } from "../middleware/log.js";
import { StatusCodes } from "../status-codes.js";

import * as fs from "node:fs/promises";
import { readFileSync } from "node:fs";
import path from "node:path";

import { param, validationResult } from "express-validator";

import { CONFIG_DIR } from "../config_dir.js";

const CONFILE = readFileSync( path.join( CONFIG_DIR ) );

const CONFIG = JSON.parse( CONFILE.toString() );
const PUBLIC = CONFIG.diretorio_publico;
const FILE_DELETE_ROUTE = Router();

FILE_DELETE_ROUTE.delete('/:recurso', log, param("recurso").notEmpty().isString(), (req: Request, res: Response) =>
{
  const EXCECOES = validationResult(req);

  if ( EXCECOES.isEmpty() )
  {
    (async ()=>
    {
      try
      {
        await fs.rm( path.join( PUBLIC.concat( req.params.recurso ) ) )
        .then( ()=>
        {
          res
          .status( StatusCodes["OK"] )
          .json( {} );
        })
      }
      catch( err )
      {
        console.error( err );
        res
        .status( StatusCodes["INTERNAL_SERVER_ERROR"] )
        .type('application/json')
        .json( {"reason": err } );
      }
    })();
    return;
  }
  res
  .status(StatusCodes["BAD_REQUEST"])
  .json( { erros: EXCECOES.array() } );

});

export { FILE_DELETE_ROUTE };

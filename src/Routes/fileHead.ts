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
const FILE_HEAD_ROUTE = Router();

/** Retorna o tamanho do recurso no cabeçalho.
* Tamanho zero se recurso não existe */
FILE_HEAD_ROUTE.head('/:recurso', log, param("recurso").notEmpty().isString(), (req: Request, res: Response) =>
{
  const EXCECOES = validationResult(req);

  if ( EXCECOES.isEmpty() )
  {
    ( async ()=>
    {
      try
      {
        let diretorioPublico;
        let arquivoStats;

        diretorioPublico =  await fs.readdir( PUBLIC );
        if ( !diretorioPublico.find( recurso => { if( recurso == req.params.recurso ) return recurso } ) )
        {
          res
          .status( StatusCodes["NOT_FOUND"] )
          .json();
          return;
        }

        arquivoStats = await fs.stat( path.join(PUBLIC.concat(req.params.recurso)) );

        res
        .header( "Content-Length", arquivoStats.size.toString() )
        .send();
      }
      catch( err )
      {
        console.error( err );
        res
        .header( "Content-Length", (0).toString() )
        .status( StatusCodes["INTERNAL_SERVER_ERROR"] )
        .json( { erros: err } );
      }
    })();
    return;
  }
  res
  .status(StatusCodes["BAD_REQUEST"])
  .json( { erros: EXCECOES.array() } );
});

export { FILE_HEAD_ROUTE };

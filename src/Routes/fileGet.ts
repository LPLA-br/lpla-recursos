import { Request, Response } from "express";
import { Router } from "express";

import { log } from "../middleware/log.js";
import { StatusCodes } from "../status-codes.js";

import { readFileSync } from "node:fs";
import { stat } from "node:fs/promises";
import path from "node:path";

import { param, validationResult } from "express-validator";

import { CONFIG_DIR } from "../config_dir.js";

const CONFILE = readFileSync( path.join( CONFIG_DIR ) );

const CONFIG = JSON.parse( CONFILE.toString() );
const PUBLIC = CONFIG.diretorio_publico;
const FILE_GET_ROUTE = Router();

const paramErrMsg = 'parâmetro recursos/NOME_RECURSO não informado';

FILE_GET_ROUTE.get('/:recurso', log, param( "recurso", paramErrMsg ).notEmpty().isString(), (req: Request, res: Response) =>
{
  const EXCECOES = validationResult(req);

  if ( EXCECOES.isEmpty() )
  {
    ( async ()=>
    {
      try
      {
        await stat( PUBLIC.concat( req.params.recurso ) );

        if ( process.env.PWD !== undefined )
        {
          res
          .status(StatusCodes["OK"])
          .sendFile( req.params.recurso, { root: path.join( process.env.PWD, PUBLIC ) } );
          return;
        }
      }
      catch( err )
      {
        console.error( err );
        res
        .status( StatusCodes["NOT_FOUND"] )
        .json( {} )
      }
    })();
    return;
  }
  res
  .status(StatusCodes["BAD_REQUEST"])
  .json( { erros: EXCECOES.array() } );
});

export { FILE_GET_ROUTE };

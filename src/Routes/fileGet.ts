import { Request, Response } from "express";
import { Router } from "express";

import { log } from "../middleware/log.js";
import { StatusCodes } from "../status-codes.js";

import { readFileSync, stat } from "node:fs";
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
    try
    {
      stat( PUBLIC.concat(req.params.recurso), ( err )=>
      {
        if ( err )
        {
          console.error( err );
          throw new Error( "Arquivo stat: " + err );
        }
      });

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
      .status(StatusCodes["INTERNAL_SERVER_ERROR"])
      .json( { erro: err } );
    }
  }
  res
  .status(StatusCodes["BAD_REQUEST"])
  .json( { erros: EXCECOES.array() } );
});

export { FILE_GET_ROUTE };

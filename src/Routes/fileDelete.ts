import { Request, Response } from "express";
import { Router } from "express";

import { log } from "../middleware/log.js";
import { StatusCodes } from "../status-codes.js";

import * as fs from "node:fs/promises";
import { readFileSync } from "node:fs";
import path from "node:path";

import { param, validationResult } from "express-validator";

const CONFILE = readFileSync( path.join("../../config.json") );

const CONFIG = JSON.parse( CONFILE.toString() );
const PUBLIC = CONFIG.diretorio_publico || path.join("../../public");
const FILE_DELETE_ROUTE = Router();

FILE_DELETE_ROUTE.delete('/:recurso', log, param("recurso").notEmpty().isString(), (req: Request, res: Response) =>
{
  const EXCECOES = validationResult(req);

  if ( EXCECOES.isEmpty() )
  {
    fs.rm( path.join( PUBLIC.concat(  ) ) )
    .then( ()=>
    {
      res
      .status( StatusCodes["OK"] )
      .json( {} );
    })
    .catch( (reason)=>
    {
      console.error( reason );
      res
      .status( StatusCodes["INTERNAL_SERVER_ERROR"] )
      .type('application/json')
      .json( {"reason": reason } );
    });
    return;
  }
  res
  .status(StatusCodes["BAD_REQUEST"])
  .json( { erros: EXCECOES.array() } );

});

export { FILE_DELETE_ROUTE };

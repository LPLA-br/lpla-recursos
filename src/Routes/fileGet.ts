import { Request, Response } from "express";
import { Router } from "express";

import { log } from "../middleware/log.js";
import { StatusCodes } from "../status-codes.js";

import { readFileSync } from "node:fs";
import path from "node:path";

import { param, validationResult } from "express-validator";

const CONFILE = readFileSync( path.join("../../config.json") );

const CONFIG = JSON.parse( CONFILE.toString() );
const PUBLIC = CONFIG.diretorio_publico || path.join("../../public");
const FILE_GET_ROUTE = Router();

FILE_GET_ROUTE.get('/:recurso', log, param("recurso").notEmpty().isString(), (req: Request, res: Response) =>
{
  const EXCECOES = validationResult(req);

  if ( EXCECOES.isEmpty() )
  {
    res
      .status(StatusCodes["OK"])
      .sendFile( path.join( PUBLIC.concat( req.params.recurso ) ) );
    return;
  }
  res
  .status(StatusCodes["BAD_REQUEST"])
  .json( { erros: EXCECOES.array() } );
});

export { FILE_GET_ROUTE };

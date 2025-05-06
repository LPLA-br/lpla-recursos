import { Request, Response } from "express";
import { Router } from "express";

import { log } from "../middleware/log.js";
import { StatusCodes } from "../status-codes.js";

import * as fs from "node:fs/promises";
import { readFileSync } from "node:fs";
import path from "node:path";

import { param, validationResult } from "express-validator";

import multer from "multer";

const CONFILE = readFileSync( path.join("../../config.json") );

const CONFIG = JSON.parse( CONFILE.toString() );
const PUBLIC = CONFIG.diretorio_publico || path.join("../../public/");
const FILE_POST_ROUTE = Router();

const upload = multer({ dest: path.join( PUBLIC ) });

/**
 * Faz upload do arquivo criando o recurso
 * Request:
 *  Content-Type: multipart/form-data
 * */
FILE_POST_ROUTE.post('/:recurso'
          ,log
          ,param("recurso").notEmpty().isString()
          ,upload.single("recurso")
          ,(req: Request, res: Response) =>
{
  const EXCECOES = validationResult(req);
  
  if ( EXCECOES.isEmpty() )
  {
    try
    {
      ( async ()=>
      {
        const arquivo: any = req.file;
        await fs.writeFile( path.join(PUBLIC.concat( req.params.recurso )), arquivo );
      })();
    }
    catch( err )
    {
      console.error( err );
      res
      .status(StatusCodes["INTERNAL_SERVER_ERROR"])
      .json( err );
    }
  }
  res
  .status(StatusCodes["BAD_REQUEST"])
  .json({ erros: EXCECOES.array() });
});

export { FILE_POST_ROUTE };

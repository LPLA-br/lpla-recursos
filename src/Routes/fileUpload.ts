import { Request, Response } from "express";
import { Router } from "express";

import { log } from "../middleware/log.js";
import recursoJaExiste from "../middleware/recursoJaExiste.js";

import { StatusCodes } from "../status-codes.js";

import * as fs from "node:fs/promises";
import path from "node:path";

import { body, validationResult } from "express-validator";

import multer from "multer";

import { PUBLIC } from "../config.js";

const FILE_POST_ROUTE = Router();

const upload = multer();

const bodyFailMsg = "campo STRING chamado nome=X ausente na requisição";

/**
 * Faz upload do arquivo criando o recurso
 * Request:
 *  Content-Type: multipart/form-data
 * */
FILE_POST_ROUTE.post(
  '/'
  ,log
  ,upload.single("recurso")
  ,body( "nome", bodyFailMsg ).notEmpty().isString()
  ,recursoJaExiste
  ,(req: Request, res: Response) =>
{
  const EXCECOES = validationResult(req);
  
  if ( EXCECOES.isEmpty() )
  {
    ( async ()=>
    {
      try
      {
        const arquivoEnviado: Express.Multer.File | undefined = req.file;
        const diretorioPublico = path.join( PUBLIC.concat( req.body.nome ) );

        if ( arquivoEnviado === undefined )
        {
          res
          .status( StatusCodes["BAD_REQUEST"] )
          .json( {"reason": "recurso|arquivo não incluso na requisição"} );
          return;
        }

        await fs.writeFile( diretorioPublico, arquivoEnviado.buffer )
        .then( ()=>
        {
          res
          .status(StatusCodes["CREATED"])
          .json({});
        });
      }
      catch( err )
      {
        console.error( err );
        res
        .status(StatusCodes["INTERNAL_SERVER_ERROR"])
        .json( {"reason": err} );
      }
    })();
    return;
  }
  res
  .status(StatusCodes["BAD_REQUEST"])
  .json({ erros: EXCECOES.array() });
});

export { FILE_POST_ROUTE };

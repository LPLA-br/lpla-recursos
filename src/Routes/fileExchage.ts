import { Request, Response } from "express";
import { Router } from "express";

import { log } from "../middleware/log.js";
import { StatusCodes } from "../status-codes.js";

import * as fs from "node:fs/promises";
import { readFileSync } from "node:fs";
import path from "node:path";

import { param, validationResult } from "express-validator";

const multer = require("multer");

const CONFILE = readFileSync( "../../config.json" );

const CONFIG = JSON.parse( CONFILE.toString() );
const PUBLIC = CONFIG.diretorio_publico || "../../public";
const ROTAS = Router();

const upload = multer( {dest: path.join( PUBLIC ) } );

/** Retorna o tamanho do recurso no cabeçalho.
* Tamanho zero se recurso não existe */
ROTAS.head('/:recurso', log, param("recurso").notEmpty().isString(), (req: Request, res: Response) =>
{
  const EXCECOES = validationResult(req);

  if ( EXCECOES.isEmpty() )
  {
    ( async ()=>
    {
      try
      {
        const arquivo = await fs.readFile( req.params.recurso );

        res
        .header( "Content-Length", arquivo.length.toString() )
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

ROTAS.get('/:recurso', log, param("recurso").notEmpty().isString(), (req: Request, res: Response) =>
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

/**
 * Faz upload do arquivo criando o recurso
 * Request:
 *  Content-Type: multipart/form-data
 * */
ROTAS.post('/:recurso'
          ,log
          ,param("recurso").notEmpty().isString()
          ,multer.upload.single("recurso")
          ,(req: Request, res: Response) =>
{
  const EXCECOES = validationResult(req);
  
  if ( EXCECOES.isEmpty() )
  {
    try
    {
      ( async ()=>
      {
        const arquivo: Buffer = req.file;
        await fs.writeFile( PUBLIC.concat( req.params.recurso ), arquivo );
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

ROTAS.put('/:recurso', log, (req: Request, res: Response) =>
{
  res
  .status(StatusCodes["NOT_IMPLEMENTED"])
  .json({});
});

ROTAS.delete('/:recurso', log, param("recurso").notEmpty().isString(), (req: Request, res: Response) =>
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

export { ROTAS };

import { Request, Response, NextFunction } from "express";

import { readFileSync } from "node:fs";
import { readdir } from "node:fs/promises";
import * as path from "node:path";

import { StatusCodes } from "../status-codes";

import { CONFIG_DIR } from "../config_dir";

const CONFILE = readFileSync( path.join( CONFIG_DIR ) );

const CONFIG = JSON.parse( CONFILE.toString() );
const PUBLIC = CONFIG.diretorio_publico;

const recursoJaExiste = ( req: Request, res: Response, next: NextFunction ) =>
{
  ( async () =>
  {
    const conteudoDiretorio = await readdir( PUBLIC );

    if ( conteudoDiretorio.find( (nomeArquivo: string)=>{ if ( nomeArquivo === req.body.nome ) return nomeArquivo; }) )
    {
      const redirectURI = `/recursos/${req.body.nome}`;
      res
      .status( StatusCodes["SEE_OTHER"] )
      .setHeader( "Location", redirectURI )
      .json({"see other": redirectURI });
    }
    else
    {
      next();
    }
  })();
};

export default recursoJaExiste;

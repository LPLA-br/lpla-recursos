import { Request, Response, NextFunction } from "express";

import { readdir } from "node:fs/promises";

import { StatusCodes } from "../status-codes";

import { PUBLIC } from "../config.js";

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

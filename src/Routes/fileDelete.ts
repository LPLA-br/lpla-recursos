import { Request, Response } from "express";
import { Router } from "express";

import { log } from "../middleware/log.js";
import { StatusCodes } from "../status-codes.js";

import * as fs from "node:fs/promises";
import path from "node:path";

import { param, validationResult } from "express-validator";

import { PUBLIC } from "../config.js";

const FILE_DELETE_ROUTE = Router();

//não retorna representação do recurso
FILE_DELETE_ROUTE.delete('/:recurso', log, param("recurso").notEmpty().isString(), (req: Request, res: Response) =>
{
  const EXCECOES = validationResult(req);

  if ( EXCECOES.isEmpty() )
  {
    (async ()=>
    {
      try
      {
        const filepath = path.join( PUBLIC.concat( req.params.recurso ) ); 

        await fs.rm( filepath )
        .then( ()=>
        {
          res
          .status( StatusCodes["OK"] )
          .json( {} );
        })
      }
      catch( err )
      {
        console.error( err );
        res
        .status( StatusCodes["NO_CONTENT"] )
        .type('application/json')
        .json( {"reason": err } );
      }
    })();
    return;
  }
  res
  .status(StatusCodes["BAD_REQUEST"])
  .json( { erros: EXCECOES.array() } );

});

export { FILE_DELETE_ROUTE };

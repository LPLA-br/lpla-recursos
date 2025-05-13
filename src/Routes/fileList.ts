import { Request, Response } from "express";
import { Router } from "express";

import { log } from "../middleware/log.js";
import { StatusCodes } from "../status-codes.js";

import { readFileSync } from "node:fs";
import { readdir } from "node:fs/promises";
import path from "node:path";

import { CONFIG_DIR } from "../config_dir.js";

const CONFILE = readFileSync( path.join( CONFIG_DIR ) );

const CONFIG = JSON.parse( CONFILE.toString() );
const PUBLIC = CONFIG.diretorio_publico;
const FILE_GET_LIST_ROUTE = Router();

FILE_GET_LIST_ROUTE.get('/', log, (req: Request, res: Response) =>
{
  ( async ()=>
  {
    try
    {
      const dircontent = await readdir( PUBLIC );

      res
      .status( StatusCodes["OK"] )
      .json( dircontent );

      return;
    }
    catch( err )
    {
      console.error( err );
      res
      .status(StatusCodes["INTERNAL_SERVER_ERROR"])
      .json( { erro: err } );
    }
  })();
});                  

export { FILE_GET_LIST_ROUTE };

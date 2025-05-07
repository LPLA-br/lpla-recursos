import { Request, Response } from "express";
import { Router } from "express";

import { log } from "../middleware/log.js";
import { StatusCodes } from "../status-codes.js";

//import * as fs from "node:fs/promises";
import { readFileSync } from "node:fs";
import path from "node:path";

//import { param, validationResult } from "express-validator";

import { CONFIG_DIR } from "../config_dir.js";

const CONFILE = readFileSync( path.join( CONFIG_DIR ) );

const CONFIG = JSON.parse( CONFILE.toString() );
const PUBLIC = CONFIG.diretorio_publico;
const FILE_PUT_ROUTE = Router();

FILE_PUT_ROUTE.put('/:recurso', log, (req: Request, res: Response) =>
{
  res
  .status(StatusCodes["NOT_IMPLEMENTED"])
  .json({});
});

export { FILE_PUT_ROUTE };

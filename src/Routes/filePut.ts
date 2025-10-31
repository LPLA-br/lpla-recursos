import { Request, Response } from "express";
import { Router } from "express";

import { log } from "../middleware/log.js";
import { StatusCodes } from "../status-codes.js";

const FILE_PUT_ROUTE = Router();

FILE_PUT_ROUTE.put('/:recurso', log, (req: Request, res: Response) =>
{
  res
  .status(StatusCodes["NOT_IMPLEMENTED"])
  .json({});
});

export { FILE_PUT_ROUTE };

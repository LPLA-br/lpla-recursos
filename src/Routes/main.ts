import { Request, Response } from "express";
import { Router } from "express";

import { log } from "../middleware/log";

const MAIN = Router();

MAIN.get('/', log, (req: Request, res: Response) =>
{
  res
  .json(
  {
    versao:"0.4.0",
    nome:"api-recursos",
    objetivo:"Troca básica de arquivo com o computador via api REST",
    ajuda: `${req.ip}/ajuda`
  });
});

MAIN.get('/ajuda', log, (req: Request, res: Response) =>
{
  res.json(
  {
    "/:recurso":
    {
      GET: 1,
      POST: 0,
      PUT: 0,
      PATCH: 0,
      DELETE: 1
    }
  });
});

export { MAIN };

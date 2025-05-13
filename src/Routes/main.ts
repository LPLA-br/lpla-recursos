import { Request, Response } from "express";
import { Router } from "express";

import { log } from "../middleware/log";

const packageJson = require("../../package.json");

const MAIN = Router();

MAIN.get('/appinfo', log, (req: Request, res: Response) =>
{
  res
  .json(
  {
    versao: packageJson.version,
    nome: packageJson.name,
    descricao:"Aplicação para troca básica de arquivo com o computador via api REST em ambiente CLI",
    ajuda: `${req.ip}/api-docs`
  });
});

export { MAIN };

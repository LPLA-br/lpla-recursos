import { Request, Response, NextFunction } from "express";

const log = ( req: Request, res: Response, next: NextFunction ) =>
{
  console.log( `{"HOST":"${req.ip}", "METHOD":"${req.method}", "ROUTE":"${req.path}"}` );
  next();
}

export { log };

import express from "express";

import { ROTAS } from "./Routes/fileExchage";
import { MAIN } from "./Routes/main";

const app = express();
const PORTA = 8080;

app.use('/', MAIN);
app.use('/recurso/', ROTAS);

// tratamento de url do express
app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );

// páginas html estáticas. descomente para servir arquivos e páginas.
app.use(express.static('./public'));

export { app, PORTA };

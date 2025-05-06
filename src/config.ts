import express from "express";

import { FILE_HEAD_ROUTE } from "./Routes/fileHead";
import { FILE_GET_ROUTE } from "./Routes/fileGet";
import { FILE_POST_ROUTE } from "./Routes/fileUpload";
import { FILE_DELETE_ROUTE } from "./Routes/fileDelete";

import { MAIN } from "./Routes/main";

const app = express();
const PORTA = 8080;

app.use('/', MAIN);
app.use('/recurso/',
        FILE_HEAD_ROUTE ,
        FILE_GET_ROUTE , 
        FILE_POST_ROUTE ,
        FILE_DELETE_ROUTE );

// tratamento de url do express
app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );

// páginas html estáticas. descomente para servir arquivos e páginas.
app.use(express.static('./public'));

export { app, PORTA };

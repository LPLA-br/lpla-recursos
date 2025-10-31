import express from "express";
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

import { FILE_HEAD_ROUTE } from "./Routes/fileHead";
import { FILE_GET_ROUTE } from "./Routes/fileGet";
import { FILE_POST_ROUTE } from "./Routes/fileUpload";
import { FILE_DELETE_ROUTE } from "./Routes/fileDelete";
import { FILE_GET_LIST_ROUTE } from "./Routes/fileList";

import { MAIN } from "./Routes/main";

import { notFound } from "./notFound/notFound";

const app = express();
const PUBLIC = "../public/";

app.use('/', MAIN);
app.use('/recursos/',
        FILE_HEAD_ROUTE ,
        FILE_GET_ROUTE , 
        FILE_POST_ROUTE ,
        FILE_DELETE_ROUTE,
        FILE_GET_LIST_ROUTE);
app.use('/api-docs', swaggerUi.serve );
app.get('/api-docs', swaggerUi.setup( swaggerDocument ));

//tratamento de requisições para recursos inexistentes.
app.use( notFound );

// tratamento de url do express
app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );

export { app, PUBLIC };

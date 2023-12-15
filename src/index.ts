import express, { NextFunction, Response, Request } from "express";
import session from "express-session";

require('dotenv').config();

var routes = require('./software/software.routes');
var usersRouter = require('./users/users.routes');
const app = express()

// Session
app.use(session({
    secret: process.env.session_secret as string, // ajoutez la variable d'environnement correspondante au fichier .env
    saveUninitialized: false,
    resave: false
}));


app.use('/', routes);

app.use('/users', usersRouter);

const port = process.env.port;
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Gestion des erreurs
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(`ERREUR : ${err.message}`);
    res.render('error', { err });
});


app.listen(port, () => {
    console.log(`Server local démarré : http://localhost:${port}`);
});

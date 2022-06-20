const express       = require('express');
const morgan        = require('morgan');
const cors          = require('cors');
const compression   = require('compression')
const bodyParser    = require('body-parser');

const app       = express()
const jtwAuth   = require('./middleware/jwt-auth');
const basicAuth = require('./middleware/basic-auth');

const Grupo   = require('./routes/grupo');
const Usuario = require('./routes/usuario');
const Modelo  = require('./routes/modelo');

app.use(cors())
app.use(compression())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('dev'));
// use basic HTTP auth to secure the api
// app.use(basicAuth);

app.use((req, res, next)=>{
    res.header('Acces-Control-Allow-Origin', '*')
    res.header(
        'Acces-Control-Allow-Header', 
        'Origin, X-Requested-With, Content-Type, Accept, Authorization, Accept-Encoding'
    );
    if (req.method === 'OPTIONS'){
        req.header('Acces-Control-Allow-Methods', 'DELETE, GET, PATCH, POST, PUT')
        return res.status(200).send({});
    }
    next();
});

app.get('/',jtwAuth.optional, (req, res, next)=>{
    try {
        return res.status(200).send({status: 'API ONLINE'}) 
    } catch (error) {
        return res.status(500).send({error:error})    
    }
});

app.use('/grupo',  jtwAuth.required, Grupo);
app.use(jtwAuth.optional, Usuario);
app.use('/modelo', jtwAuth.required, Modelo);

app.use((req, res, next)=>{
    const erro = new Error('Não encontrado');
    erro.status = 404;
    next(erro);
});

app.use((error,req, res, next)=>{
    res.status(error.status || 500)
    return res.send({
        erro:{
            mensagem: error.message
        }
    });
});

module.exports = app;
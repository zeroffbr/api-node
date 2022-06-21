const conexao = require('../dao/conexaoDB');
const Boleto   = require('../class/boleto');
const Utils = require('../class/utils')

exports.getBoletoCNPJ = async(req, res, next)=>{
    try {
        const boleto = new  Boleto();
        const cnpj = Buffer.from(req.query.cnpj, 'base64').toString('ascii');

        const Resultado =
        `<!DOCTYPE html>
        <html lang="pt-BR">
            <head>
                <meta http-equiv="content-type" content="text/html; charset=UTF-8">
                <meta charset="UTF-8">
                <title> Boleto</title>
            </head>
            <body>                
                <h2>Pendências da Empresa:  ${await boleto.getRazaoSocial(conexao, cnpj)} </h2> 
                ${await boleto.getBoletos(conexao, cnpj) }
            </body>
        </html>`
        return res.status(200).send(Resultado);
    } catch (error) {
        return res.status(500).send({error:error})    
    }
}

exports.getBoletoNumero = async(req, res, next)=>{
    try {
        const boleto = new  Boleto();
        const [nosso_numero, data] = req.query.boleto.split('_');

        const arquivo = await boleto.gravarBoleto(conexao, nosso_numero);
        setTimeout(function() { res.download(arquivo) }, 1000);
    } catch (error) {
        return res.status(500).send({error:error})    
    }
}

exports.getHome = async(req, res, next)=>{
    try {
        return res.status(200).send({status: 'API ONLINE'}) 
    } catch (error) {
        return res.status(500).send({error:error})    
    }
}

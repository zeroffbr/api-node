const jwt     = require('jsonwebtoken');   
const conexao = require('../dao/conexaoDB');
 
exports.postLogin = async(req, res, next)=>{
    try {
        const result = await conexao.execute('select * from usuario where login = $1',[req.body.login])
        if (result.rowCount < 1){return res.status(401).send({mensagem:'Falha na autenticação'})}
        if (result.rows[0].senha != req.body.senha){return res.status(401).send({mensagem:'Falha na autenticação'})}
        else{
            let token = jwt.sign({
                usuario_id : result.rows[0].usuario_id,
                login: result.rows[0].login,
            },
            "testserver",{
                expiresIn:'1h'
            });
            return res.status(200).send({
                mensagem:'Autenticado com sucesso',
                token: 'Bearer '+token
            })
        }      
    } catch (error) {
        return res.status(500).send({error:error})    
    }
}
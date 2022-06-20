const conexao = require('../dao/conexaoDB');

exports.getGrupo = async(req, res, next)=>{
    try {
        const sql = 'select * from grupo where deletado = false order by grupo_id;';
        const result = await conexao.execute(sql)
        if (result.rowCount == 0){
            return res.status(404).send({mensagem:'Nenhum grupo encontrado'})
        }
        const response = {
            quantidade: result.rowCount,
            grupo:  result.rows.map(x => {
                return {
                    grupo_id:   x.grupo_id,
                    codigo:     x.codigo,
                    descricao:  x.descricao,
                    data_ultima_alteracao:  x.data_ultima_alteracao,
                    comissao:   x.comissao,
                    request:    {
                        tipo:'GET',
                        descricao:'Retorna o detalhe de um grupo especifico',
                        url:`http://localhost:${3000}/grupo/${x.grupo_id}`
                    }
                }
            })
        }                
        return res.status(200).send(response);
    } catch (error) {
        return res.status(500).send({error:error})    
    }
    
}

exports.getGrupoID = async(req, res, next)=>{
    try {
        const sql = 'select * from grupo where deletado = false and grupo_id = $1 order by grupo_id;';
        const result = await conexao.execute(sql,[req.params.grupo_id])
        if (result.rowCount == 0){
            return res.status(404).send({mensagem:'Não foi encontrado grupo com este ID'})
        }
        const response = {
            quantidade: result.rowCount,
            grupo:  {
                grupo_id:   result.rows[0].grupo_id,
                codigo:     result.rows[0].codigo,
                descricao:  result.rows[0].descricao,
                data_ultima_alteracao:  result.rows[0].data_ultima_alteracao,
                comissao:   result.rows[0].comissao,
                request:    {
                    tipo:'GET',
                    descricao:'Retorna todos os grupos',
                    url:`http://localhost:${3000}/grupo`
                }
            }
        }                
        return res.status(200).send(response);
    } catch (error) {
        return res.status(500).send({error:error})    
    }
}

exports.postGrupo = async(req, res, next)=>{
    try {
        if(req.body.descricao === undefined || req.body.comissao === undefined){return res.status(400).send({mensagem:'Parametros não informados'})}
        const sqlSelect = 'select * from grupo where descricao = $1';
        const select = await conexao.execute(sqlSelect,[req.body.descricao])
        if(select.rowCount > 0){
            return res.status(201).send({mensagem:'Grupo já cadastrado'});
        }
        else{
            const sqlInsert = `insert into grupo (codigo, descricao, comissao) values (currval('grupo_grupo_id_seq'), $1,$2)`;
            await conexao.execute(sqlInsert,[req.body.descricao, req.body.comissao])                    
            return res.status(201).send({mensagem:'Grupo Inserido com sucesso'});
        }

    } catch (error) {
        return res.status(500).send({error:error})   
    }
}

exports.patchGrupo = async(req, res, next)=>{
    try {            
        const sql = `   update  grupo
                            set descricao   = $1,
                                comissao    = $2
                        where   grupo_id    = $3
                    `;
        await conexao.execute(sql,[   
            req.body.descricao, 
            req.body.comissao, 
            req.body.grupo_id
        ])
        return res.status(202).send({mensagem:'Grupo alterado com sucesso'});
    } catch (error) {
        return res.status(500).send({error:error})
    }
}

exports.deleteGrupo = async(req, res, next)=>{
    try {            
        const sql = `delete from grupo where grupo_id = $1`;
        await conexao.execute(sql,[req.body.grupo_id])          
        return res.status(202).send({mensagem:'Grupo removido com sucesso'});
    } catch (error) {
        return res.status(500).send({error:error})
    }
}
const conexao = require('../dao/conexaoDB');
const ModeloModel = require('../class/model/modeloModel');

exports.getModelo = async(req, res, next)=>{
    try {
        const modelo = new  ModeloModel();
        const result = await modelo.selectFull(conexao);
        
        if (result.rowCount == 0){
            return res.status(404).send({mensagem:'Nenhum modelo encontrado'})
        }
        const response = {
            quantidade: result.rowCount,
            modelo:  result.rows.map(x => {
                return {
                    modelo_id:   x.modelo_id,
                    codigo:     x.codigo,
                    descricao:  x.descricao,
                    data_ultima_alteracao:  x.data_ultima_alteracao,
                    request:    {
                        tipo:'GET',
                        descricao:'Retorna o detalhe de um modelo especifico',
                        url:`http://localhost:${3000}/modelo/${x.modelo_id}`
                    }
                }
            })
        }                
        return res.status(200).send(response);
    } catch (error) {
        return res.status(500).send({error:error})    
    }
    
}

exports.getModeloID = async(req, res, next)=>{
    try {
        const modelo = new  ModeloModel();
        modelo.modelo_id = req.params.modelo_id;
        const result = await modelo.select(conexao, modelo.modelo_id);
        if (await modelo.select(conexao, modelo.modelo_id)){
            const response = {
                quantidade: result.rowCount,
                modelo:  {
                    modelo_id:  modelo.modelo_id,
                    codigo:     modelo.codigo,
                    descricao:  modelo.descricao,
                    data_ultima_alteracao:  modelo.data_ultima_alteracao,
                    request:    {
                        tipo:'GET',
                        descricao:'Retorna todos os modelos',
                        url:`http://localhost:${3000}/modelo`
                    }
                }
            }     
            return res.status(200).send(response);
        }else{
            return res.status(404).send({mensagem:'Não foi encontrado modelo com este ID'})    
        }      
    } catch (error) {
        return res.status(500).send({error:error})    
    }
}

exports.postModelo = async(req, res, next)=>{
    try {        
        if(!req.body.hasOwnProperty('cabecalho')){
            return res.status(400).send({mensagem:'Parametros não informados'})
        }
        const modelo = new  ModeloModel();
        modelo.descricao = req.body.cabecalho.descricao

        if(modelo.selectByDescricao(conexao, modelo.descricao)){
            modelo.modelo_id    = req.body.cabecalho.modelo_id;
            modelo.codigo       = req.body.cabecalho.codigo;
            modelo.descricao    = req.body.cabecalho.descricao;
            modelo.data_ultima_alteracao = req.body.cabecalho.data_ultima_alteracao;
            modelo.modelo_uuid  = req.body.cabecalho.modelo_uuid;
            modelo.deletado     = req.body.cabecalho.deletado;
            modelo.replicado    = req.body.cabecalho.replicado;
            await modelo.insert(conexao)                
            return res.status(201).send({mensagem:'modelo Inserido com sucesso'});
        } else{
            return res.status(201).send({mensagem:'modelo já cadastrado'});
        }

    } catch (error) {
        return res.status(500).send({error:error})   
    }
}

exports.patchModelo = async(req, res, next)=>{
    try {             
        if(!req.body.hasOwnProperty('cabecalho')){
            return res.status(400).send({mensagem:'Parametros não informados'})
        }
        const modelo        = new  ModeloModel();   
        modelo.modelo_id    = req.body.cabecalho.modelo_id;
        modelo.codigo       = req.body.cabecalho.codigo;
        modelo.descricao    = req.body.cabecalho.descricao;
        modelo.data_ultima_alteracao = req.body.cabecalho.data_ultima_alteracao;
        modelo.modelo_uuid  = req.body.cabecalho.modelo_uuid;
        modelo.deletado     = req.body.cabecalho.deletado;
        modelo.replicado    = req.body.cabecalho.replicado;
        await modelo.update(conexao)      
        return res.status(202).send({mensagem:'modelo alterado com sucesso'});
    } catch (error) {
        return res.status(500).send({error:error})
    }
}

exports.deleteModelo = async(req, res, next)=>{
    try {            
        const modelo = new  ModeloModel();   
        await modelo.delete(conexao, req.body.modelo_id)
        return res.status(202).send({mensagem:'Modelo removido com sucesso'});               
    } catch (error) {
        return res.status(500).send({error:error})
    }
}
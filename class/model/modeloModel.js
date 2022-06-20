const ModeloDao = require("../dao/modeloDao");

class ModeloModel extends ModeloDao{

    async selectFull(AConexao){
        try {
            const Aquery = `
            select
                modelo_id,
                codigo,
                descricao,
                data_ultima_alteracao,
                modelo_uuid,
                deletado,
                replicado
                from modelo
                where deletado = false order by modelo_id`
            const result = await AConexao.execute(Aquery)
            if(result.rowCount > 0){
                return result
            }    
        } catch (error) {
            throw error    
        }  
    }

    async selectByDescricao(AConexao, AKeyField){
        try {
            const Aquery = `
            select
                modelo_id,
                codigo,
                descricao,
                data_ultima_alteracao,
                modelo_uuid,
                deletado,
                replicado
                from modelo
                where descricao = $1 and deletado = false order by descricao`
            const result = await AConexao.execute(Aquery,[AKeyField])
            if(result.rowCount > 0){
                this.popularClasse(result.rows[0])
                return true
            }  
        } catch (error) {
            throw error
        }
    }
    
}

module.exports = ModeloModel
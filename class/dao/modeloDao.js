class ModeloDao{
    
    constructor(/*modelo_id, codigo, descricao, data_ultima_alteracao, modelo_uuid, replicado*/){
        // this.modelo_id   = modelo_id;
        // this.codigo     = codigo;
        // this.descricao  = descricao;
        // this.data_ultima_alteracao = data_ultima_alteracao;
        // this.modelo_uuid = modelo_uuid;
        // this.replicado  = replicado;
        
        this.modelo_id      = 0;
        this.codigo         = '';
        this.descricao      = '';
        this.data_ultima_alteracao = null;
        this.modelo_uuid    = null;
        this.deletado       = false;
        this.replicado      = false;
    }    

    popularClasse(resultado){        
        this.modelo_id              = resultado.modelo_id;
        this.codigo                 = resultado.codigo;
        this.descricao              = resultado.descricao;
        this.data_ultima_alteracao  = resultado.data_ultima_alteracao;
        this.modelo_uuid            = resultado.modelo_uuid;
        this.deletado               = resultado.deletado;
        this.replicado              = resultado.replicado;    
    }

    async select(AConexao, AKeyField){
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
                where modelo_id = $1`
            const result = await AConexao.execute(Aquery,[AKeyField])
            if(result.rowCount > 0){
                this.popularClasse(result.rows[0])
                return true
            }    
        } catch (error) {
            throw error
        }
    }

    async insert(AConexao){
        try {
            const Aquery = `insert into modelo ( modelo_id, codigo, descricao, data_ultima_alteracao, modelo_uuid, deletado, replicado ) values ( $1, $2, $3, $4, $5, $6, $7 )`

            await AConexao.execute(Aquery,[
                this.modelo_id, 
                this.codigo, 
                this.descricao, 
                this.data_ultima_alteracao, 
                this.modelo_uuid, 
                this.deletado,
                this.replicado
            ])
        } catch (error) {
            throw error
        }
    }

    async update(AConexao){
        try {
            const Aquery = 
            `update modelo set 
                    modelo_id   = $1,
                    codigo      = $2,
                    descricao   = $3,
                    data_ultima_alteracao = $4,
                    modelo_uuid = $5,
                    deletado    = $6,
                    replicado   = $7
            where modelo_id     = $1 `
    
            await AConexao.execute(Aquery,[
                this.modelo_id, 
                this.codigo, 
                this.descricao, 
                this.data_ultima_alteracao, 
                this.modelo_uuid, 
                this.deletado,
                this.replicado
            ])
        } catch (error) {
            throw error
        }
    }

    async delete(AConexao, AKeyField){
        try {
            const  Aquery = `delete from modelo where modelo_id = $1 `
            await AConexao.execute(Aquery,[AKeyField])
        } catch (error) {
            throw error
        }    
    }

}
module.exports = ModeloDao
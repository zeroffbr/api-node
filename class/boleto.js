const fs = require("fs")
const utils = require("./utils") 
const bytea = require('postgres-bytea')

class Boleto{
    
    constructor(){
        
    }    

    async getBoletos(AConexao, CNPJ){
        try {
            const host = `b9140a42ca77.sn.mynetname.net` || 'localhost'
            const Aquery = 
            `
                select boleto.arquivo_boleto, boleto.data_vencimento, boleto.data_cadastro,boleto.linha_digitavel,boleto.nosso_numero from boleto
                left join empresa on empresa.empresa_id = boleto.empresa_id 
                left join entidade on entidade.entidade_id = empresa.entidade_id 
                where cnpj = $1 and boleto.quitado = false and arquivo_boleto <> '' 
            `
            const result = await AConexao.execute(Aquery,[CNPJ])

            if(result.rowCount > 0){
                let html = `<h5> ________________________________________________________________________________________________</h5>`
                for (var i = 0; i < result.rowCount; i++) {
                    html = html + `
                        <b>Vencimento:</b> ${result.rows[i].data_vencimento.toLocaleDateString()} </br>
                        <b>Nosso número:</b> ${result.rows[i].nosso_numero} </br>
                        <b>Boleto:</b> <a href="../../boleto?boleto=${result.rows[i].nosso_numero}_${utils.formatDate(result.rows[i].data_vencimento.toLocaleDateString())}"><b>Baixar</b></a></br>
                        <b>Línha Digitável:</b>  ${result.rows[i].linha_digitavel} </p>
                        `

                 }
                html = html + `<h5> ________________________________________________________________________________________________</h5>`

                return html
            } else {
                return 'Boleto Quitado'
            }  
        } catch (error) {
            throw error
        }
    }

    async getRazaoSocial(AConexao, CNPJ){
        try {
            const Aquery = `select razao_social from entidade where cnpj = $1`
            const result = await AConexao.execute(Aquery,[CNPJ])
            if(result.rowCount > 0){
                return `${result.rows[0].razao_social} - (${CNPJ})`
            } else {
                return ''
            }
        } catch (error) {
            throw error
        }
    }

    async getBoleto(AConexao, NossoNumero){
        try {
            const Aquery = `select arquivo_boleto from boleto where nosso_numero = $1 and quitado = false`
            const result = await AConexao.execute(Aquery,[NossoNumero])
            if(result.rowCount > 0){
                return result.rows[0].arquivo_boleto
            } else {
                return 'Boleto Quitado'
            }   
        } catch (error) {
            throw error
        }
    }

    async gravarBoleto(AConexao, NossoNumero){
        try {
            const Aquery = `
            select distinct razao_social, cnpj,arquivo_boleto,data_vencimento from boleto
            left join empresa on empresa.empresa_id = boleto.empresa_id
            left join entidade on entidade.entidade_id = empresa.entidade_id 
            where nosso_numero =  $1`
            const result = await AConexao.execute(Aquery,[NossoNumero])
            if(result.rowCount > 0){
                const dir = `c:/boletos/${result.rows[0].razao_social} - ${result.rows[0].cnpj}`
                const local = `c:/boletos/${result.rows[0].razao_social} - ${result.rows[0].cnpj}/${result.rows[0].razao_social}-${result.rows[0].cnpj} -${utils.formatDate(result.rows[0].data_vencimento.toLocaleDateString())}.pdf`
               
                !fs.existsSync(dir) && fs.mkdirSync(dir)
                fs.createWriteStream(local).write(result.rows[0].arquivo_boleto);
                return  local
            } else {
                return ''
            }
        } catch (error) {
            throw error
        }
    }

}
module.exports = Boleto
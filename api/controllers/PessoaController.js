const database = require('../models');

class PessoaController{
    static async pegaTodasAsPessoa (req, res){
        try{
            const todasAsPessoas = await database.Pessoas.findAll();
            return res.status(200).json(todasAsPessoas);
        }catch(error){
            return res.status(500).json(error.message);
        }
    }
    static async pegaUmaPessoa (req, res){
        const { id } = req.params;
        try{
            const umaPessoa = await database.findOne( {
                where: {
                    id: Number(id)
                }
            } );
            return res.status(200).json(umaPessoa);
        }catch (error){
            return res.status(500).json(error.message);
        }
    }
}

module.exports = PessoaController
// const database = require('../models');
// const Sequelize = require ('sequelize');

const {PessoasServices} = require('../services');
const pessoasServices = new PessoasServices('Pessoas');

class PessoaController{
    static async pegaTodasAsPessoasAtivas (req, res){
        try{
            const todasAsPessoas = await pessoasServices.pegaRegistrosAtivos();
            return res.status(200).json(todasAsPessoas);
        }catch(error){
            return res.status(500).json(error.message);
        }
    }
    static async pegaTodasAsPessoas (req, res){
        try{
            const todasAsPessoas = await pessoasServices.pegaTodosOsRegistros();
            return res.status(200).json(todasAsPessoas);
        }catch(error){
            return res.status(500).json(error.message);
        }
    }
    
    static async pegaUmaPessoa (req, res){
        const { id } = req.params;
        try{
            const umaPessoa = await pessoasServices.pegaUmRegistro({id});
            return res.status(200).json(umaPessoa);
        }catch (error){
            return res.status(500).json(error.message);
        }
    }

    static async criaPessoa (req, res){
        const novaPessoa = req.body;
        try {
            const novaPessoaCriada = await pessoasServices.criaRegistro(novaPessoa);
            return res.status(200).json(novaPessoaCriada);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async atualizaPessoa (req, res){
        const { id } = req.params;
        const novaInfoPesso = req.body;
        try {
            await pessoasServices.atualizaRegistro(novaInfoPesso, {where: { id: Number(id)}});
            const pessoaAtualizada = await database.Pessoas.findOne( {where: { id: Number(id)}});
            return res.status(200).json(pessoaAtualizada);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async deletaPessoa (req, res){
        const { id } = req.params;
        try {
            await pessoasServices.apagaRegistro({where: { id: Number(id)}});
            return res.status(200).json({ mensagem: `Pessoa com ID: ${id} foi deletada.`})
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async restauraPessoa(req, res) {  
        const { id } = req.params
        try {
          const registroRestaurado = await pessoasServices
            .restauraRegistro(Number(id))
          return res.status(200).json(registroRestaurado)
        } catch (error) {
          return res.status(500).json(error.message)
        }
      }
    
      static async pegaMatriculas(req, res) {  
        const { estudanteId } = req.params
        try {
          const matriculas = await pessoasServices
            .pegaMatriculasPorEstudante({ id: Number(estudanteId) })
          return res.status(200).json(matriculas)
        } catch (error) {
          return res.status(500).json(error.message)
        }
      }
    
      static async cancelaPessoa(req, res) {  
        const { estudanteId } = req.params
        try {
          await pessoasServices.cancelaPessoaEMatriculas(Number(estudanteId))
          return res
            .status(200)
            .json({message: `matrículas ref. estudante ${estudanteId} canceladas`}) 
        } catch (error) {
          return res.status(500).json(error.message)
        }
      }
    

}

module.exports = PessoaController
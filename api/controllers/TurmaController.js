const { TurmasServices } = require('../services')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const turmasService = new TurmasServices()

class TurmaController {
  static async pegaTodasAsTurmas(req, res){
    const {data_inicial, data_final} = req.query;
    const where = {};
    data_inicial || data_final ? where.data_inicio = {} : null;
    data_inicial ? where.data_inicio[Op.gte] = data_inicial : null;
    data_final ? where.data_inicio[Op.lte] = data_final : null;
    try {
      const todasAsTurmas = turmasService.pegaTodosOsRegistros({ where });
      return res.status(200).json(todasAsTurmas)  
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  

  static async pegaUmaTurma(req, res) {
    const { id } = req.params
    try {
      const umaTurma = await turmasService.pegaUmRegistro( { 
        where: { 
          id: Number(id) 
        }
      })
      return res.status(200).json(umaTurma)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async criaTurma(req, res) {
    const novaTurma = req.body
    try {
      const novaTurmaCriada = await turmasService.criaRegistro(novaTurma)
      return res.status(200).json(novaTurmaCriada)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async atualizaTurma(req, res) {
    const { id } = req.params
    const novasInfos = req.body
    try {
      await turmasService.atualizaRegistro(novasInfos, { where: { id: Number(id) }})
      return res.status(200).json({mensagem: `id ${id} atualizado`})
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async apagaTurma(req, res) {
    const { id } = req.params
    try {
      await turmasService.apagaRegistro({ where: { id: Number(id) }})
      return res.status(200).json({ mensagem: `id ${id} deletado` })

    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async restauraTurma(req, res) {
    const { id } = req.params
    try {
      await turmasService.restauraRegistro( {where: { id: Number(id) } } )
      return res.status(200).json({ mensagem: `Turma com Id ${id} restaurada`})
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

}

module.exports = TurmaController
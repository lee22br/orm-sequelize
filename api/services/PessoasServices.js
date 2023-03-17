const Services = require ('./Services');
const database = require ('../models');

class PessoasServices extends Services{
    constructor(){
        super('Pessoas');
        this.matriculas = new Services('Matriculas');
    }

    async pegaRegistrosAtivos(where = {}){
        return database[this.nomeDoModelo].findAll({where: {...where}});
    }

    async pegaTodosOsRegistros(where = {}){
        return database[this.nomeDoModelo].scope('todos').findAll({where: {...where}});
    }

    async cancelaPessoaEMatriculas(estudanteId){
        return database.sequelize.transacation(async transacao => {
            await super.atualizaRegistro({ativo: false},estudanteId, { transacation: transacao})
            await this.matriculas.atualizaRegistros({status: 'cancelado'}, {estudante_id: estudanteId}, {transacation: transacao})
        });
    }

    async pegaMatriculasPorEstudante(where = {}) {
        const matriculas = await database[this.nomeDoModelo]
          .findOne({ where: { ...where } })
        return matriculas.getAulasMatriculadas()
      }

}

module.exports = PessoasServices;